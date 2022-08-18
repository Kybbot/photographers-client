import React from "react";

import { PhoneForm } from "./components/PhoneForm";
import { OTPForm } from "./components/OTPForm";
import { SelfiForm } from "./components/SelfiForm";
import logo from "../../assets/img/logo.svg";

const Signup: React.FC = () => {
	const [phone, setPhone] = React.useState("");
	const [phoneResult, setPhoneResult] = React.useState(false);
	const [otpResult, setOtpResult] = React.useState(false);

	const goBackHandler = () => {
		setPhoneResult(false);
		setOtpResult(false);
	};

	return (
		<>
			<header className="header">
				<div className="container">
					<div className="header__container">
						<button
							onClick={goBackHandler}
							className={`header__btn ${
								(phoneResult && !otpResult) || (phoneResult && otpResult) ? "header__btn--visible" : ""
							}`}
							aria-label="Go back"
						>
							<svg width="8" height="17" fill="none" focusable="false" aria-hidden="true">
								<use xlinkHref="#left-arrow" />
							</svg>
						</button>
						<img src={logo} alt="PhotoDrop" />
					</div>
				</div>
			</header>
			<main className="main">
				<div className="container">
					<section className="signup">
						{!phoneResult && <PhoneForm phone={phone} setPhone={setPhone} setPhoneResult={setPhoneResult} />}
						{phoneResult && !otpResult && <OTPForm phone={phone} setOtpResult={setOtpResult} />}
						{otpResult && phoneResult && <SelfiForm />}
					</section>
				</div>
			</main>
		</>
	);
};

export default Signup;
