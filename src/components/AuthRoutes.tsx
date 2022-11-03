import React, { FC, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import SettingsLayout from "../layouts/SettingLayout";

import Dashboard from "../pages/Dashboard";
import Album from "../pages/Dashboard/Album";

import Settings from "../pages/Settings";
import SettingsName from "../pages/Settings/SettingsName";
import SettingsSelfi from "../pages/Settings/SettingsSelfi";

import InitialSelfi from "../pages/InitialSelfi";
import Success from "../pages/Success";
import Terms from "../pages/Terms";
import Privacy from "../pages/Privacy";
import NotFound from "../pages/NotFound";

import { useAppSelector } from "../hooks/reduxHooks";
import { getUserData } from "../redux/reducers/userSlice";

export const AuthRoutes: FC = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const userData = useAppSelector(getUserData);

	useEffect(() => {
		if (userData && !userData.selfie_image.length) {
			navigate("/initial-selfi");
		} else if (userData && userData.selfie_image.length && location.pathname === "/initial-selfi") {
			navigate("/");
		}
	}, [userData, location, navigate]);

	return (
		<Routes>
			<Route path="/" element={<DashboardLayout />}>
				<Route index element={<Dashboard />} />
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
