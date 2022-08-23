import React from "react";
import { Link } from "react-router-dom";

const SettingsFinal: React.FC = () => {
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
				<section className="settings-final">
					<div className="container">
						<form className="settings-final__form">
							<h1 className="settigs-final__title">Let’s get to know you</h1>
							<label className="sr-only" htmlFor="name">
								Your name
							</label>
							<input
								type="text"
								className="input settings__input"
								autoComplete="name"
								name="name"
								id="name"
								placeholder="What’s your name?"
							/>
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

export default SettingsFinal;
