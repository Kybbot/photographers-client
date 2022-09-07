import React from "react";

const SettingsName: React.FC = () => {
	return (
		<section className="settings__center">
			<form className="settings-name__form settings__center--helper">
				<h1 className="settigs__title">Your name</h1>
				<label className="sr-only" htmlFor="name">
					Your name
				</label>
				<input type="text" className="input settings__input" autoComplete="name" name="name" id="name" />
				<button type="submit" className="btn">
					Save
				</button>
			</form>
		</section>
	);
};

export default SettingsName;
