import React, { FC, FormEvent, useEffect, useState } from "react";
import { NameResponse } from "../../@types/api";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useAuthFetch } from "../../hooks/useAuthFetch";
import { changeUserName, getUserData } from "../../redux/reducers/userSlice";

const SettingsName: FC = () => {
	const dispatch = useAppDispatch();
	const userData = useAppSelector(getUserData);

	const [name, setName] = useState("");

	const { loading, error, request } = useAuthFetch();

	const formHandler = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const body = JSON.stringify({
			client_name: name,
		});

		const result = await request<NameResponse>("/name", "POST", body);

		if (result?.success) {
			dispatch(changeUserName(result.data.client_name));
		}
	};

	useEffect(() => {
		if (userData) {
			setName(userData.client_name);
		}
	}, [userData]);

	return (
		<form
			className="settings-name__form"
			onSubmit={(event) => {
				void formHandler(event);
			}}
		>
			<h1 className="settigs__title settings-name__title">Your name</h1>
			<label className="sr-only" htmlFor="name">
				Your name
			</label>
			<input
				type="text"
				className="input settings__input"
				autoComplete="name"
				name="client_name"
				id="client_name"
				value={name}
				onChange={(event) => setName(event.target.value)}
			/>
			<button type="submit" className="btn">
				Save {loading && <span className="spinner"></span>}
			</button>
			{error && <p className="error">{error}</p>}
		</form>
	);
};

export default SettingsName;
