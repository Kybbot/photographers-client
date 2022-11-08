import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Signup from "./pages/Signup";
import Verify from "./pages/Signup/Verify";

import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

import { AuthRoutes } from "./components";

import { useAuthFetch } from "./hooks/useAuthFetch";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { getIsLoggedIn } from "./redux/reducers/authSlice";
import { getUserData, setUserData } from "./redux/reducers/userSlice";

import { UserResponse } from "./@types/api";

const App: React.FC = () => {
	const isLoggedIn = useAppSelector(getIsLoggedIn);

	const dispatch = useAppDispatch();
	const userData = useAppSelector(getUserData);

	const { error: clientError, request: clientRequest } = useAuthFetch();

	useEffect(() => {
		const getUserData = async () => {
			const result = await clientRequest<UserResponse>("/client", "GET");

			if (result?.success) {
				dispatch(setUserData(result.data));
			}
		};

		if (!userData && isLoggedIn) {
			void getUserData();
		}
	}, [isLoggedIn, userData, clientRequest, dispatch]);

	useEffect(() => {
		function handleResize() {
			const vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty("--vh", `${vh}px`);
		}

		window.addEventListener("resize", handleResize);

		handleResize();

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	if (clientError) {
		return <p>An error has occurred: {clientError}</p>;
	}

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
