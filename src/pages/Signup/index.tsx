import React from "react";

import { PhoneForm } from "./components/PhoneForm";
import { OTPForm } from "./components/OTPForm";
import logo from "../../assets/img/logo.svg";
import { SelfiForm } from "./components/SelfiForm";

const Signup: React.FC = () => {
	const [phoneResult, setPhoneResult] = React.useState(false);
	const [otpResult, setOtpResult] = React.useState(false);

	const goBackHandler = () => {
		setPhoneResult(false);
	};

	return (
		<>
			<header className="header">
				<div className="container">
					<div className="header__container">
						<button
							onClick={goBackHandler}
							className={`header__btn ${!otpResult && phoneResult ? "header__btn--visible" : ""}`}
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
						{!phoneResult && <PhoneForm setPhoneResult={setPhoneResult} />}
						{!otpResult && phoneResult && <OTPForm setOtpResult={setOtpResult} />}
						{otpResult && phoneResult && <SelfiForm />}
					</section>
				</div>
			</main>
		</>
	);
};

export default Signup;
