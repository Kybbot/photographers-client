import React, { FormEvent } from "react";

import { OTP } from "./OTP";

type OTPFormProps = {
	phone: string;
	formHandler: (event: FormEvent<HTMLFormElement>) => void;
};

export const OTPForm: React.FC<OTPFormProps> = ({ phone, formHandler }) => {
	const [otpLength, setOtpLength] = React.useState(0);

	return (
		<>
			<h2 className="otp__title">What’s the code?</h2>
			<p className="otp__text">
				Enter the code sent to <span className="otp__bold">+{phone}</span>
			</p>
			<form onSubmit={formHandler}>
				<div className="otp__code">
					<OTP isNumberInput length={6} onChangeOTP={(otp) => setOtpLength(otp.length)} />
				</div>
				<button type="button" className="otp__resend">
					Resend code
				</button>
				<button type="submit" className="btn" disabled={otpLength !== 6}>
					Next
				</button>
			</form>
		</>
	);
};
