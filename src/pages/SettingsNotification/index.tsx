import React from "react";
import { Link } from "react-router-dom";

const SettingsNotification: React.FC = () => {
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
				<section className="settings-notification">
					<div className="container">
						<form className="settings-notification__form">
							<h1 className="settigs__title">Notification settings</h1>
							<label htmlFor="settings-text" className="custom-checkbox">
								<input type="checkbox" name="text" id="settings-text" className="custom-checkbox__input" checked />
								<div className="custom-checkbox__wrapper" aria-hidden="true">
									<svg
										className="custom-checkbox__svg"
										width="14"
										height="10"
										fill="none"
										focusable="false"
										aria-hidden="true"
									>
										<use xlinkHref="#checkbox" />
									</svg>
								</div>
								Text messages
							</label>
							<label htmlFor="settings-email" className="custom-checkbox">
								<input type="checkbox" name="email" id="settings-email" className="custom-checkbox__input" />
								<div className="custom-checkbox__wrapper" aria-hidden="true">
									<svg
										className="custom-checkbox__svg"
										width="14"
										height="10"
										fill="none"
										focusable="false"
										aria-hidden="true"
									>
										<use xlinkHref="#checkbox" />
									</svg>
								</div>
								Email
							</label>
							<label htmlFor="settings-unsubscribe" className="custom-checkbox">
								<input
									type="checkbox"
									name="unsubscribe"
									id="settings-unsubscribe"
									className="custom-checkbox__input"
								/>
								<div className="custom-checkbox__wrapper" aria-hidden="true">
									<svg
										className="custom-checkbox__svg"
										width="14"
										height="10"
										fill="none"
										focusable="false"
										aria-hidden="true"
									>
										<use xlinkHref="#checkbox" />
									</svg>
								</div>
								Unsubscribe
							</label>
							<p className="settings-notification__text">
								Stop marketing notifications. You will still receive transactional notifications for purchases and when
								new photos are available.
							</p>
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

export default SettingsNotification;
