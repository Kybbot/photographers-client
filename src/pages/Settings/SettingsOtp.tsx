import React, { FormEvent } from "react";
import { Location, useLocation } from "react-router-dom";

import { OTPForm } from "../../components/OTPForm";

interface locationState extends Location {
	state: {
		phone: string;
	};
}

const SettingsOtp: React.FC = () => {
	const location = useLocation() as locationState;

	const otpFormHandler = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	};

	return (
		<section className="settings__container">
			<OTPForm phone={location.state.phone} formHandler={otpFormHandler} />
		</section>
	);
};

export default SettingsOtp;
