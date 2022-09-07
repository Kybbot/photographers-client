import React from "react";

const SettingsEmail: React.FC = () => {
	return (
		<section className="settings__center">
			<form className="settings-email__form settings__center--helper">
				<h1 className="settigs__title">Your email</h1>
				<label className="sr-only" htmlFor="email">
					Your email
				</label>
				<input type="text" className="input settings__input" autoComplete="email" name="email" id="email" />
				<button type="submit" className="btn">
					Save
				</button>
			</form>
		</section>
	);
};

export default SettingsEmail;
