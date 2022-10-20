import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Modal, PhoneNumber, PhoneNumberSelect } from "../../components";

import { useModal } from "../../hooks/useModal";

import { currentCountryType } from "../../@types/phoneForm";

const SettingsPhone: React.FC = () => {
	const navigate = useNavigate();

	const [selectState, setSelectState] = useState("");
	const [phone, setPhone] = React.useState("");

	const [currentCountry, setCurrentCountry] = useState<currentCountryType>({
		name: "United States",
		dial_code: "+1",
		code: "US",
		mask: /^(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,4}).*/,
	});

	const { isActive: isActive1, openModal: openModal1, closeModal: closeModal1 } = useModal();

	const formHandler = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		navigate("/settings/otp", { state: { phone: phone } });
	};

	return (
		<div className="settings-phone">
			<Modal overlay={true} active={isActive1} displayType="flex" closeModal={closeModal1} dependencies={[selectState]}>
				<PhoneNumberSelect
					closeModal={closeModal1}
					setCurrentCountry={setCurrentCountry}
					setPhone={setPhone}
					setSelectState={setSelectState}
				/>
			</Modal>
			<h1 className="settigs__title settings-phone__title">Mobile number</h1>
			<p className="settings-phone__text">Update your number and we’ll send a verification code to this number.</p>
			<form onSubmit={formHandler}>
				<PhoneNumber currentCountry={currentCountry} setPhone={setPhone} openModal={openModal1} />
				<button type="submit" className="btn" disabled={phone.length <= 7}>
					Next
				</button>
			</form>
		</div>
	);
};

export default SettingsPhone;
