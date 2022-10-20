import React, { Dispatch, FormEvent, useState } from "react";
import { Link } from "react-router-dom";

import { Modal, PhoneNumber, PhoneNumberSelect } from "../../../components";

import { useModal } from "../../../hooks/useModal";

import { currentCountryType } from "../../../@types/phoneForm";

type PhoneFormProps = {
	phone: string;
	setPhone: Dispatch<React.SetStateAction<string>>;
	setPhoneResult: Dispatch<React.SetStateAction<boolean>>;
};

export const PhoneForm: React.FC<PhoneFormProps> = ({ phone, setPhone, setPhoneResult }) => {
	const [selectState, setSelectState] = useState("");

	const [currentCountry, setCurrentCountry] = useState<currentCountryType>({
		name: "United States",
		dial_code: "+1",
		code: "US",
		mask: /^(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,4}).*/,
	});

	const { isActive: isActive1, openModal: openModal1, closeModal: closeModal1 } = useModal();

	const formHandler = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setPhoneResult(true);
	};

	return (
		<div className="phoneForm">
			<Modal overlay={true} active={isActive1} displayType="flex" closeModal={closeModal1} dependencies={[selectState]}>
				<PhoneNumberSelect
					closeModal={closeModal1}
					setCurrentCountry={setCurrentCountry}
					setPhone={setPhone}
					setSelectState={setSelectState}
				/>
			</Modal>
			<h1 className="phoneForm__title">Let’s get started</h1>
			<p className="phoneForm__text">Enter your phone number</p>
			<form onSubmit={formHandler}>
				<PhoneNumber currentCountry={currentCountry} setPhone={setPhone} openModal={openModal1} />
				<button type="submit" className="btn" disabled={phone.length <= 7}>
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
