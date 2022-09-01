import React from "react";
import { Routes, Route } from "react-router-dom";

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
import SettingsFinal from "./pages/Settings/SettingsFinal";
import SettingsLayout from "./layouts/SettingLayout";
import OnBoardingLayout from "./layouts/OnboardingLayout";

const App: React.FC = () => {
	return (
		<Routes>
			<Route index element={<Dashboard />} />
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
			<Route path="onboarding" element={<OnBoardingLayout />}>
				<Route index element={<SettingsFinal />} />
			</Route>
			<Route path="signup" element={<Signup />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default App;
