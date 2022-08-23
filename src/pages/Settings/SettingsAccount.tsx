import React from "react";
import { Link } from "react-router-dom";

const SettingsAccount: React.FC = () => {
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
				<section className="settings-account">
					<div className="container">
						<h1 className="settigs__title">Account settings</h1>
						<div className="settings__element">
							<svg className="settings__icon" width="25" height="30" fill="none" focusable="false" aria-hidden="true">
								<use xlinkHref="#phone" />
							</svg>
							<div className="settings__wrapper">
								<h3 className="settings__name">
									Phone • <span className="settings--green">Verified</span>
								</h3>
								<p className="settings__text">+1 123-456-7890</p>
							</div>
							<div className="settings__arrow">
								<Link to="/settings/phone" className="settings__link" aria-label="Change your name">
									<svg className="settings__svg" width="8" height="17" fill="none" focusable="false" aria-hidden="true">
										<use xlinkHref="#left-arrow" />
									</svg>
								</Link>
							</div>
						</div>
						<div className="settings__element">
							<svg className="settings__icon" width="25" height="21" fill="none" focusable="false" aria-hidden="true">
								<use xlinkHref="#email" />
							</svg>
							<div className="settings__wrapper">
								<h3 className="settings__name">Email</h3>
								<p className="settings__text">the.real.jane.smith@gmail.com</p>
							</div>
							<div className="settings__arrow">
								<Link to="/settings/email" className="settings__link" aria-label="Change your name">
									<svg className="settings__svg" width="8" height="17" fill="none" focusable="false" aria-hidden="true">
										<use xlinkHref="#left-arrow" />
									</svg>
								</Link>
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
};

export default SettingsAccount;
