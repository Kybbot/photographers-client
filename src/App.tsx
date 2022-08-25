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

const App: React.FC = () => {
	return (
		<Routes>
			<Route path="/" element={<Dashboard />} />
			<Route path="/signup" element={<Signup />} />
			<Route path="/settings" element={<Settings />} />
			<Route path="/settings/name" element={<SettingsName />} />
			<Route path="/settings/account" element={<SettingsAccount />} />
			<Route path="/settings/notifications" element={<SettingsNotification />} />
			<Route path="/settings/phone" element={<SettingsPhone />} />
			<Route path="/settings/otp" element={<SettingsOtp />} />
			<Route path="/settings/email" element={<SettingsEmail />} />
			<Route path="/settings/selfi" element={<SettingsSelfi />} />
			<Route path="/settings/final" element={<SettingsFinal />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default App;
