import React, {
	ChangeEvent,
	KeyboardEvent,
	ClipboardEvent,
	Dispatch,
	FC,
	memo,
	useState,
	useCallback,
	SetStateAction,
} from "react";

import { OTPInput } from "./OTPInput";

export type OTPProps = {
	length: number;
	isNumberInput?: boolean;
	disabled?: boolean;
	otpValues: string[];
	setOTPValues: Dispatch<SetStateAction<string[]>>;
	onChangeOTP: (otp: string) => void;
};

export const OTP: FC<OTPProps> = memo(({ length, isNumberInput, disabled, otpValues, setOTPValues, onChangeOTP }) => {
	const [activeInput, setActiveInput] = useState(0);

	const handleOtpChange = useCallback(
		(otp: string[]) => {
			const otpValue = otp.join("");
			onChangeOTP(otpValue);
		},
		[onChangeOTP]
	);

	const getRightValue = useCallback(
		(str: string) => {
			const changedValue = str;

			if (!isNumberInput || !changedValue) {
				return changedValue;
			}

			return Number(changedValue) >= 0 ? changedValue : "";
		},
		[isNumberInput]
	);

	const changeCodeAtFocus = useCallback(
		(str: string) => {
			const updatedOTPValues = [...otpValues];
			updatedOTPValues[activeInput] = str[0] || "";
			setOTPValues(updatedOTPValues);
			handleOtpChange(updatedOTPValues);
		},
		[activeInput, handleOtpChange, otpValues, setOTPValues]
	);

	const focusInput = useCallback(
		(inputIndex: number) => {
			const selectedIndex = Math.max(Math.min(length - 1, inputIndex), 0);
			setActiveInput(selectedIndex);
		},
		[length]
	);

	const focusNextInput = useCallback(() => {
		focusInput(activeInput + 1);
	}, [activeInput, focusInput]);

	const focusPrevInput = useCallback(() => {
		focusInput(activeInput - 1);
	}, [activeInput, focusInput]);

	const handleOnFocus = useCallback(
		(inputIndex: number) => {
			focusInput(inputIndex);
		},
		[focusInput]
	);

	const handleOnBlur = useCallback(() => {
		setActiveInput(-1);
	}, []);

	const handleOnChange = useCallback(
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

	const handleOnKeyDown = useCallback(
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

	const handleOnPaste = useCallback(
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
		[activeInput, getRightValue, length, otpValues, setOTPValues]
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
