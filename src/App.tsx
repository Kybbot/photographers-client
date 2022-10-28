import React from "react";
import { Routes, Route } from "react-router-dom";

import SettingsLayout from "./layouts/SettingLayout";
import DashboardLayout from "./layouts/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import SettingsName from "./pages/Settings/SettingsName";
import SettingsAccount from "./pages/Settings/SettingsAccount";
import SettingsNotification from "./pages/Settings/SettingsNotification";
import SettingsPhone from "./pages/Settings/SettingsPhone";
import SettingsOtp from "./pages/Settings/SettingsOtp";
import SettingsEmail from "./pages/Settings/SettingsEmail";
import SettingsSelfi from "./pages/Settings/SettingsSelfi";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import { Photos } from "./pages/Dashboard/components/Photos";
import Album from "./pages/Dashboard/Album";
import Success from "./pages/Success";

const App: React.FC = () => {
	return (
		<Routes>
			<Route path="/" element={<DashboardLayout />}>
				<Route index element={<Dashboard />} />
				<Route path="photos" element={<Photos />} />
			</Route>
			<Route path="album/:id" element={<Album />} />
			<Route path="success" element={<Success />} />
			<Route path="settings" element={<SettingsLayout />}>
				<Route index element={<Settings />} />
				<Route path="name" element={<SettingsName />} />
				<Route path="account" element={<SettingsAccount />} />
				<Route path="notifications" element={<SettingsNotification />} />
				<Route path="phone" element={<SettingsPhone />} />
				<Route path="otp" element={<SettingsOtp />} />
				<Route path="email" element={<SettingsEmail />} />
				<Route path="selfi" element={<SettingsSelfi />} />
			</Route>
			<Route path="signup" element={<Signup />} />
			<Route path="terms" element={<Terms />} />
			<Route path="privacy" element={<Privacy />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default App;
