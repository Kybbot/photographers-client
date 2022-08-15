import React, { Dispatch, FormEvent } from "react";
import PhoneInput from "react-phone-input-2";

type PhoneFormProps = {
	setPhoneResult: Dispatch<React.SetStateAction<boolean>>;
};

export const PhoneForm: React.FC<PhoneFormProps> = ({ setPhoneResult }) => {
	const [phone, setPhone] = React.useState("");

	const formHandler = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setPhoneResult(true);
	};

	return (
		<>
			<h1 className="phoneForm__title">Let’s get started</h1>
			<p className="phoneForm__text">Enter your phone number</p>
			<form onSubmit={formHandler}>
				<PhoneInput enableSearch country={"us"} value={phone} onChange={(phone) => setPhone(phone)} />
				<button type="submit" className="btn">
					Create account
				</button>
			</form>
			<p className="phoneForm__description">
				By proceeding, you consent to get WhatsApp or SMS messages, from PhotoDrop and its affiliates to the number
				provided. Text “STOP” to 89203 to opt out.
			</p>
			<p className="phoneForm__description">
				By continuing, you indicate that you have read and agree to our{" "}
				<a className="phoneForm__link" href="/">
					Terms of Use
				</a>{" "}
				&#38;{" "}
				<a className="phoneForm__link" href="/">
					Privacy Policy
				</a>
			</p>
		</>
	);
};
