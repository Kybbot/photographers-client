import React from "react";

const SettingsFinal: React.FC = () => {
	return (
		<section className="settings__container">
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
		</section>
	);
};

export default SettingsFinal;
