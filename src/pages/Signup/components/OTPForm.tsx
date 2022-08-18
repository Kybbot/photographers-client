import React, { Dispatch, FormEvent } from "react";

import { OTP } from "../../../components";

type OTPFormProps = {
	phone: string;
	setOtpResult: Dispatch<React.SetStateAction<boolean>>;
};

export const OTPForm: React.FC<OTPFormProps> = ({ phone, setOtpResult }) => {
	const formHandler = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setOtpResult(true);
	};

	return (
		<>
			<h2 className="otp__title">What’s the code?</h2>
			<p className="otp__text">
				Enter the code sent to <span className="otp__bold">+{phone}</span>
			</p>
			<form onSubmit={formHandler}>
				<div className="otp__code">
					<OTP isNumberInput length={6} onChangeOTP={(otp) => console.log("Number OTP: ", otp)} />
				</div>
				<button type="button" className="otp__resend">
					Resend code
				</button>
				<button type="submit" className="btn">
					Next
				</button>
			</form>
		</>
	);
};
