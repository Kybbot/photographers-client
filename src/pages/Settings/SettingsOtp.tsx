import React, { FormEvent } from "react";
import { Link, Location, useLocation } from "react-router-dom";

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
		<>
			<header className="header">
				<div className="container">
					<div className="header__container">
						<Link to="/settings/phone" className="header__btn header__btn--visible" aria-label="Go back">
							<svg width="8" height="17" fill="none" focusable="false" aria-hidden="true">
								<use xlinkHref="#left-arrow" />
							</svg>
						</Link>
						<img src="/logo.svg" alt="PhotoDrop" />
					</div>
				</div>
			</header>
			<main className="main">
				<section className="settings-otp">
					<div className="container">
						<OTPForm phone={location.state.phone} formHandler={otpFormHandler} />
					</div>
				</section>
			</main>
		</>
	);
};

export default SettingsOtp;
