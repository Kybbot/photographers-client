import React from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

const App: React.FC = () => {
	return (
		<Routes>
			<Route path="/" element={<Dashboard />} />
			<Route path="signup" element={<Signup />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default App;
