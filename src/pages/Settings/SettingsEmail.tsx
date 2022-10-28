import React from "react";

const SettingsEmail: React.FC = () => {
	return (
		<form className="settings-email__form">
			<h1 className="settigs__title settings-email__title">Your email</h1>
			<label className="sr-only" htmlFor="email">
				Your email
			</label>
			<input type="text" className="input settings__input" autoComplete="email" name="email" id="email" disabled />
			<button type="submit" className="btn" disabled>
				Cooming Soon
			</button>
		</form>
	);
};

export default SettingsEmail;
