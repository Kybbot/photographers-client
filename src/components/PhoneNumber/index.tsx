import React, { ChangeEvent, Dispatch, FC, useEffect, useRef, useState } from "react";

import { currentCountryType } from "../../@types/phoneForm";

type PhoneNumberProps = {
	currentCountry: currentCountryType;
	setPhone: Dispatch<React.SetStateAction<string>>;
	openModal: (openBtnRef: React.RefObject<HTMLButtonElement> | React.RefObject<HTMLInputElement>) => void;
};

export const PhoneNumber: FC<PhoneNumberProps> = ({ currentCountry, setPhone, openModal }) => {
	const [phoneInput, setPhoneInput] = useState(currentCountry.dial_code);

	const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value.replace(/\D/g, "").match(currentCountry.mask);

		if (newValue) {
			for (let i = 0; i < newValue?.length; i++) {
				if (!newValue[i].length) {
					newValue.splice(i);
				}
			}

			setPhoneInput("+" + newValue.slice(1).join(" "));
			setPhone(newValue[0]);
		}
	};

	const btnRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		setPhoneInput(currentCountry.dial_code);
	}, [currentCountry]);

	return (
		<div className="phone-number">
			<button ref={btnRef} className="phone-number__btn" type="button" onClick={() => openModal(btnRef)}>
				<img
					className="phone-number__img"
					src={`/flugs/${currentCountry.code.toLowerCase()}.svg`}
					alt={currentCountry.name}
					width={28}
					height={19}
				/>
				<svg className="phone-number__svg" focusable="false" aria-hidden="true" width="6.5" height="13.5">
					<use xlinkHref="#left-arrow" />
				</svg>
			</button>
			<input
				className="input"
				type="text"
				name="phone"
				autoComplete="tel-national"
				inputMode="numeric"
				value={phoneInput}
				onInput={handleChangeInput}
			/>
		</div>
	);
};