import React from "react";
import { Link } from "react-router-dom";

const SettingsName: React.FC = () => {
	return (
		<>
			<header className="header">
				<div className="container">
					<div className="header__container">
						<Link to="/settings" className="header__btn header__btn--visible" aria-label="Go back">
							<svg width="8" height="17" fill="none" focusable="false" aria-hidden="true">
								<use xlinkHref="#left-arrow" />
							</svg>
						</Link>
						<img src="/logo.svg" alt="PhotoDrop" />
					</div>
				</div>
			</header>
			<main className="main">
				<section className="settings-name">
					<div className="container">
						<form className="settings-name__form">
							<h1 className="settigs__title">Your name</h1>
							<label className="sr-only" htmlFor="name">
								Your name
							</label>
							<input type="text" className="input settings-name__input" autoComplete="name" name="name" id="name" />
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

export default SettingsName;
