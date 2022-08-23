import React from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import SettingsName from "./pages/Settings/SettingsName";
import SettingsAccount from "./pages/Settings/SettingsAccount";
import SettingsNotification from "./pages/Settings/SettingsNotification";

const App: React.FC = () => {
	return (
		<Routes>
			<Route path="/" element={<Dashboard />} />
			<Route path="signup" element={<Signup />} />
			<Route path="settings" element={<Settings />} />
			<Route path="settings/name" element={<SettingsName />} />
			<Route path="settings/account" element={<SettingsAccount />} />
			<Route path="settings/notifications" element={<SettingsNotification />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default App;
