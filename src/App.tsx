import React from "react";
import { Routes, Route } from "react-router-dom";

import Signup from "./pages/Signup";
import Verify from "./pages/Signup/Verify";

import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

import { useAuth } from "./stores/useAuth";
import { AuthRoutes } from "./components";

const App: React.FC = () => {
	const isLoggedIn = useAuth((state) => state.isLoggedIn);

	if (isLoggedIn) {
		return <AuthRoutes />;
	} else {
		return (
			<Routes>
				<Route index element={<Signup />} />
				<Route path="verify" element={<Verify />} />
				<Route path="terms" element={<Terms />} />
				<Route path="privacy" element={<Privacy />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		);
	}
};

export default App;
