import React, { ChangeEvent, KeyboardEvent, ClipboardEvent } from "react";

import { OTPInput } from "./OTPInput";

export type OTPProps = {
	length: number;
	onChangeOTP: (otp: string) => void;

	isNumberInput?: boolean;
	disabled?: boolean;
};

export const OTP: React.FC<OTPProps> = React.memo(({ length, isNumberInput, disabled, onChangeOTP }) => {
	const [activeInput, setActiveInput] = React.useState(0);
	const [otpValues, setOTPValues] = React.useState(Array<string>(length).fill(""));

	const handleOtpChange = React.useCallback(
		(otp: string[]) => {
			const otpValue = otp.join("");
			onChangeOTP(otpValue);
		},
		[onChangeOTP]
	);

	const getRightValue = React.useCallback(
		(str: string) => {
			const changedValue = str;

			if (!isNumberInput || !changedValue) {
				return changedValue;
			}

			return Number(changedValue) >= 0 ? changedValue : "";
		},
		[isNumberInput]
	);

	const changeCodeAtFocus = React.useCallback(
		(str: string) => {
			const updatedOTPValues = [...otpValues];
			updatedOTPValues[activeInput] = str[0] || "";
			setOTPValues(updatedOTPValues);
			handleOtpChange(updatedOTPValues);
		},
		[activeInput, handleOtpChange, otpValues]
	);

	const focusInput = React.useCallback(
		(inputIndex: number) => {
			const selectedIndex = Math.max(Math.min(length - 1, inputIndex), 0);
			setActiveInput(selectedIndex);
		},
		[length]
	);

	const focusNextInput = React.useCallback(() => {
		focusInput(activeInput + 1);
	}, [activeInput, focusInput]);

	const focusPrevInput = React.useCallback(() => {
		focusInput(activeInput - 1);
	}, [activeInput, focusInput]);

	const handleOnFocus = React.useCallback(
		(inputIndex: number) => {
			focusInput(inputIndex);
		},
		[focusInput]
	);

	const handleOnBlur = React.useCallback(() => {
		setActiveInput(-1);
	}, []);

	const handleOnChange = React.useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const val = getRightValue(event.currentTarget.value);

			if (!val) {
				event.preventDefault();
				return;
			}

			changeCodeAtFocus(val);
			focusNextInput();
		},
		[changeCodeAtFocus, focusNextInput, getRightValue]
	);

	const handleOnKeyDown = React.useCallback(
		(event: KeyboardEvent<HTMLInputElement>) => {
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
		},
		[activeInput, changeCodeAtFocus, focusNextInput, focusPrevInput, otpValues]
	);

	const handleOnPaste = React.useCallback(
		(event: ClipboardEvent<HTMLInputElement>) => {
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
		},
		[activeInput, getRightValue, length, otpValues]
	);

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
});
