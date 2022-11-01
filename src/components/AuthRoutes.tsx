import React, { FC, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import SettingsLayout from "../layouts/SettingLayout";

import Dashboard from "../pages/Dashboard";
import Album from "../pages/Dashboard/Album";
import { Photos } from "../pages/Dashboard/components/Photos";

import Settings from "../pages/Settings";
import SettingsName from "../pages/Settings/SettingsName";
import SettingsSelfi from "../pages/Settings/SettingsSelfi";

import InitialSelfi from "../pages/InitialSelfi";
import Success from "../pages/Success";
import Terms from "../pages/Terms";
import Privacy from "../pages/Privacy";
import NotFound from "../pages/NotFound";

import { useFact } from "../api/api";

export const AuthRoutes: FC = () => {
	const navigate = useNavigate();

	const { data, error, isLoading, isError } = useFact();

	useEffect(() => {
		if (data && data.success && !data.data.selfie_image.length) {
			navigate("/initial-selfi");
		}
	}, [data, navigate]);

	if (isLoading) {
		return null;
	}

	if (isError) {
		if (error instanceof Error) {
			return <p>{"An error has occurred: " + error.message}</p>;
		} else {
			return <p>{"An error has occurred: " + error.error.message}</p>;
		}
	}

	return (
		<Routes>
			<Route path="/" element={<DashboardLayout />}>
				<Route index element={<Dashboard />} />
				<Route path="photos" element={<Photos />} />
			</Route>
			<Route path="album/:id" element={<Album />} />
			<Route path="settings" element={<SettingsLayout />}>
				<Route index element={<Settings />} />
				<Route path="selfi" element={<SettingsSelfi />} />
				<Route path="name" element={<SettingsName />} />
			</Route>
			<Route path="initial-selfi" element={<InitialSelfi />} />
			<Route path="success" element={<Success />} />
			<Route path="terms" element={<Terms />} />
			<Route path="privacy" element={<Privacy />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};
