import React, { Dispatch, FormEvent } from "react";
import { Link } from "react-router-dom";
import RPI, { PhoneInputProps } from "react-phone-input-2";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const ReactPhoneInput: React.FC<PhoneInputProps> = RPI.default ? RPI.default : RPI;

type PhoneFormProps = {
	phone: string;
	setPhone: Dispatch<React.SetStateAction<string>>;
	setPhoneResult: Dispatch<React.SetStateAction<boolean>>;
};

export const PhoneForm: React.FC<PhoneFormProps> = ({ phone, setPhone, setPhoneResult }) => {
	const formHandler = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setPhoneResult(true);
	};

	return (
		<div className="phoneForm">
			<h1 className="phoneForm__title">Let’s get started</h1>
			<p className="phoneForm__text">Enter your phone number</p>
			<form onSubmit={formHandler}>
				<ReactPhoneInput enableSearch country={"us"} value={phone} onChange={(phone) => setPhone(phone)} />
				<button type="submit" className="btn" disabled={phone.length < 10}>
					Create account
				</button>
			</form>
			<p className="phoneForm__description">
				By proceeding, you consent to get WhatsApp or SMS messages, from PhotoDrop and its affiliates to the number
				provided. Text “STOP” to 89203 to opt out.
			</p>
			<p className="phoneForm__description">
				By continuing, you indicate that you have read and agree to our{" "}
				<Link to="/terms" className="phoneForm__link">
					Terms of Use
				</Link>{" "}
				&#38;{" "}
				<Link to="/privacy" className="phoneForm__link">
					Privacy Policy
				</Link>
			</p>
		</div>
	);
};
