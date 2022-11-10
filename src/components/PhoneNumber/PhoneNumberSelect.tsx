import React, { ChangeEvent, Dispatch, FC, SetStateAction, useMemo, useRef, useState } from "react";

import { useLazyLoadImages } from "../../hooks/useLazyLoadImages";

import { countries } from "../../utils/countries";

import { currentCountryType } from "../../@types/phoneForm";

type PhoneNumberSelectProps = {
	closeModal: () => void;
	setCurrentCountry: Dispatch<SetStateAction<currentCountryType>>;
	setPhone: Dispatch<SetStateAction<string>>;
	setSelectState: Dispatch<SetStateAction<string>>;
};

export const PhoneNumberSelect: FC<PhoneNumberSelectProps> = ({
	closeModal,
	setCurrentCountry,
	setPhone,
	setSelectState,
}) => {
	const [search, setSearch] = useState("");

	const countrysListRef = useRef<HTMLDivElement>(null);

	const currentCountries = useMemo(() => {
		if (!search) {
			return countries;
		} else {
			return countries.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
		}
	}, [search]);

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value);
		setSelectState(event.target.value);
	};

	const handleButtonClick = (data: currentCountryType) => {
		setCurrentCountry(data);
		setPhone(data.dial_code);
		closeModal();
	};

	useLazyLoadImages(countrysListRef, [currentCountries]);

	return (
		<div className="phone-number__select phone-number__select--visible">
			<div className="phone-number__container">
				<h2 className="phone-number__title">Select Country</h2>
				<button className="phone-number__close" type="button" onClick={closeModal}>
					Close
				</button>
				<form>
					<input
						type="search"
						className="input phone-number__search"
						placeholder="Search country"
						value={search}
						onChange={handleInputChange}
					/>
				</form>
				<div ref={countrysListRef} className="phone-number__list">
					{currentCountries.map((item) => (
						<button
							className="phone-number__country"
							key={item.name}
							type="button"
							onClick={() => handleButtonClick(item)}
						>
							<img
								className="phone-number__img"
								data-src={`/flugs/${item.code.toLowerCase()}.svg`}
								src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII="
								alt={item.name}
								width={28}
								height={19}
								loading="lazy"
							/>
							{item.name}
						</button>
					))}
				</div>
			</div>
		</div>
	);
};
