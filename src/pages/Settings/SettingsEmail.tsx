import React from "react";
import { Link } from "react-router-dom";

const SettingsEmail: React.FC = () => {
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
				<section className="settings-email">
					<div className="container">
						<form className="settings-email__form">
							<h1 className="settigs__title">Your email</h1>
							<label className="sr-only" htmlFor="email">
								Your email
							</label>
							<input type="text" className="input settings__input" autoComplete="email" name="email" id="email" />
							<button type="submit" className="btn">
								Save
							</button>
						</form>
					</div>
				</section>
			</main>
		</>
	);
};

export default SettingsEmail;
