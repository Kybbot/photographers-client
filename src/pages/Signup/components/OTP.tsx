import React, { ChangeEvent, KeyboardEvent, ClipboardEvent, Dispatch, FC, useState, SetStateAction } from "react";

import { OTPInput } from "./OTPInput";

export type OTPProps = {
	length: number;
	isNumberInput?: boolean;
	disabled?: boolean;
	otpValues: string[];
	setOTPValues: Dispatch<SetStateAction<string[]>>;
	onChangeOTP: (otp: string) => void;
};

export const OTP: FC<OTPProps> = ({ length, isNumberInput, disabled, otpValues, setOTPValues, onChangeOTP }) => {
	const [activeInput, setActiveInput] = useState(0);

	const handleOtpChange = (otp: string[]) => {
		const otpValue = otp.join("");
		onChangeOTP(otpValue);
	};

	const getRightValue = (str: string) => {
		const changedValue = str;

		if (!isNumberInput || !changedValue) {
			return changedValue;
		}

		return Number(changedValue) >= 0 ? changedValue : "";
	};

	const changeCodeAtFocus = (str: string) => {
		const updatedOTPValues = [...otpValues];
		updatedOTPValues[activeInput] = str[0] || "";
		setOTPValues(updatedOTPValues);
		handleOtpChange(updatedOTPValues);
	};

	const focusInput = (inputIndex: number) => {
		const selectedIndex = Math.max(Math.min(length - 1, inputIndex), 0);
		setActiveInput(selectedIndex);
	};

	const focusNextInput = () => {
		focusInput(activeInput + 1);
	};

	const focusPrevInput = () => {
		focusInput(activeInput - 1);
	};

	const handleOnFocus = (inputIndex: number) => {
		focusInput(inputIndex);
	};

	const handleOnBlur = () => {
		setActiveInput(-1);
	};

	const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
		const val = getRightValue(event.currentTarget.value);

		if (!val) {
			event.preventDefault();
			return;
		}

		changeCodeAtFocus(val);
		focusNextInput();
	};

	const handleOnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		const pressedKey = event.key;

		switch (pressedKey) {
			case "Backspace":
			case "Delete": {
				event.preventDefault();
				if (otpValues[activeInput]) {
					changeCodeAtFocus("");
				} else {
					focusPrevInput();
				}
				break;
			}
			case "ArrowLeft": {
				event.preventDefault();
				focusPrevInput();
				break;
			}
			case "ArrowRight": {
				event.preventDefault();
				focusNextInput();
				break;
			}
			default: {
				if (pressedKey.match(/^[^a-zA-Z0-9]$/)) {
					event.preventDefault();
				}
				break;
			}
		}
	};

	const handleOnPaste = (event: ClipboardEvent<HTMLInputElement>) => {
		event.preventDefault();
		const pastedData = event.clipboardData
			.getData("text/plain")
			.slice(0, length - activeInput)
			.split("");

		if (pastedData) {
			let nextFocusIndex = 0;
			const updatedOTPValues = [...otpValues];

			for (let i = 0; i < updatedOTPValues.length; i++) {
				if (i >= activeInput) {
					const changedValue = getRightValue(pastedData.shift() || updatedOTPValues[i]);
					if (changedValue) {
						updatedOTPValues[i] = changedValue;
						nextFocusIndex = i;
					}
				}
			}

			setOTPValues(updatedOTPValues);
			setActiveInput(Math.min(nextFocusIndex + 1, length - 1));
		}
	};

	return (
		<>
			{Array(length)
				.fill("")
				.map((_, index) => (
					<OTPInput
						key={`SingleInput-${index}`}
						type={"text"}
						min={0}
						max={9}
						maxLength={1}
						autoComplete="off"
						inputMode="numeric"
						focus={activeInput === index}
						value={otpValues && otpValues[index]}
						onFocus={() => handleOnFocus(index)}
						onChange={handleOnChange}
						onKeyDown={handleOnKeyDown}
						onBlur={handleOnBlur}
						onPaste={handleOnPaste}
						className="otp__number"
						disabled={disabled}
					/>
				))}
		</>
	);
};
