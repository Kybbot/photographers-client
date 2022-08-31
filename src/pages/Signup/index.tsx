import React, { FormEvent } from "react";

import { PhoneForm } from "./components/PhoneForm";
import { SelfiForm } from "./components/SelfiForm";
import { OTPForm } from "../../components/OTPForm";

const Signup: React.FC = () => {
	const [phone, setPhone] = React.useState("");
	const [phoneResult, setPhoneResult] = React.useState(false);
	const [otpResult, setOtpResult] = React.useState(false);

	const goBackHandler = () => {
		setPhoneResult(false);
		setOtpResult(false);
	};

	const otpFormHandler = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setOtpResult(true);
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
						<img src="/logo.svg" alt="PhotoDrop" width={125} height={17} />
					</div>
				</div>
			</header>
			<main className="main">
				<section className="signup">
					<div className="container">
						{!phoneResult && <PhoneForm phone={phone} setPhone={setPhone} setPhoneResult={setPhoneResult} />}
						{phoneResult && !otpResult && <OTPForm phone={phone} formHandler={otpFormHandler} />}
						{otpResult && phoneResult && <SelfiForm />}
					</div>
				</section>
			</main>
		</>
	);
};

export default Signup;
