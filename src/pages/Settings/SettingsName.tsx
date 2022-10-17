import React from "react";

const SettingsName: React.FC = () => {
	return (
		<form className="settings-name__form">
			<h1 className="settigs__title settings-name__title">Your name</h1>
			<label className="sr-only" htmlFor="name">
				Your name
			</label>
			<input type="text" className="input settings__input" autoComplete="name" name="name" id="name" />
			<button type="submit" className="btn">
				Save
			</button>
		</form>
	);
};

export default SettingsName;
