import React, { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import RPI, { PhoneInputProps } from "react-phone-input-2";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const ReactPhoneInput: React.FC<PhoneInputProps> = RPI.default ? RPI.default : RPI;

const SettingsPhone: React.FC = () => {
	const navigate = useNavigate();

	const [phone, setPhone] = React.useState("");

	const formHandler = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		navigate("/settings/otp", { state: { phone: phone } });
	};

	return (
		<>
			<header className="header">
				<div className="container">
					<div className="header__container">
						<Link to="/settings/account" className="header__btn header__btn--visible" aria-label="Go back">
							<svg width="8" height="17" fill="none" focusable="false" aria-hidden="true">
								<use xlinkHref="#left-arrow" />
							</svg>
						</Link>
						<img src="/logo.svg" alt="PhotoDrop" />
					</div>
				</div>
			</header>
			<main className="main">
				<section className="settings-phone">
					<div className="container">
						<h1 className="settigs__title">Mobile number</h1>
						<p className="settings-phone__text">
							Update your number and we’ll send a verification code to this number.
						</p>
						<form onSubmit={formHandler}>
							<ReactPhoneInput enableSearch country={"us"} value={phone} onChange={(phone) => setPhone(phone)} />
							<button type="submit" className="btn">
								Next
							</button>
						</form>
					</div>
				</section>
			</main>
		</>
	);
};

export default SettingsPhone;
