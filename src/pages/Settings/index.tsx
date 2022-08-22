import React from "react";
import { Link } from "react-router-dom";

import realAvatar from "../../assets/img/real-avatar.jpg";

const Settings: React.FC = () => {
	return (
		<>
			<header className="header">
				<div className="container">
					<div className="header__container">
						<Link to="/" className="header__btn header__btn--visible" aria-label="Go back">
							<svg width="8" height="17" fill="none" focusable="false" aria-hidden="true">
								<use xlinkHref="#left-arrow" />
							</svg>
						</Link>
						<img src="/logo.svg" alt="PhotoDrop" />
					</div>
				</div>
			</header>
			<main className="main">
				<section className="settings">
					<div className="container">
						<h1 className="settigs__title">Welcome, Jane Smith.</h1>
						<h2 className="settings__subtitle">Your selfie</h2>
						<div className="settings__avatar">
							<img src={realAvatar} alt="avatar" className="settings__img" />
							<Link to="/" className="settings__pencil" aria-label="Edit avatar">
								<svg width="16" height="22" fill="none" focusable="false" aria-hidden="true">
									<use xlinkHref="#pencil" />
								</svg>
							</Link>
						</div>
						<div className="settings__element">
							<div className="settings__wrapper">
								<h3 className="settings__name">Your name</h3>
								<p className="settings__text">Tell us your name to personalize communications.</p>
							</div>
							<div className="settings__arrow">
								<Link to="/settings/name" className="settings__link" aria-label="Change your name">
									<svg className="settings__svg" width="8" height="17" fill="none" focusable="false" aria-hidden="true">
										<use xlinkHref="#left-arrow" />
									</svg>
								</Link>
							</div>
						</div>
						<div className="settings__element">
							<div className="settings__wrapper">
								<h3 className="settings__name">Account settings</h3>
								<p className="settings__text">Update your phone and email.</p>
							</div>
							<div className="settings__arrow">
								<Link to="/settings/account" className="settings__link" aria-label="Change your name">
									<svg className="settings__svg" width="8" height="17" fill="none" focusable="false" aria-hidden="true">
										<use xlinkHref="#left-arrow" />
									</svg>
								</Link>
							</div>
						</div>
						<div className="settings__element">
							<div className="settings__wrapper">
								<h3 className="settings__name">Notification settings</h3>
								<p className="settings__text">How should we contact you?</p>
							</div>
							<div className="settings__arrow">
								<Link to="/settings/notifications" className="settings__link" aria-label="Change your name">
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

export default Settings;
