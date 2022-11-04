import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Signup from "./pages/Signup";
import Verify from "./pages/Signup/Verify";

import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

import { AuthRoutes, Loader } from "./components";

import { useAuthFetch } from "./hooks/useAuthFetch";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { getIsLoggedIn } from "./redux/reducers/authSlice";
import { getUserData, setUserAlbums, setUserData, setUserPhotos } from "./redux/reducers/userSlice";

import { AlbumsResponse, PhotosResponse, UserResponse } from "./@types/api";

const App: React.FC = () => {
	const isLoggedIn = useAppSelector(getIsLoggedIn);

	const dispatch = useAppDispatch();
	const userData = useAppSelector(getUserData);

	const { loading: clientLoading, error: clientError, request: clientRequest } = useAuthFetch(true);
	const { loading: albumsLoading, error: albumsError, request: albumsRequest } = useAuthFetch(true);
	const { loading: photosLoading, error: photosError, request: photosRequest } = useAuthFetch(true);

	useEffect(() => {
		const getUserData = async () => {
			const result = await clientRequest<UserResponse>("/client", "GET");

			if (result?.success) {
				dispatch(setUserData(result.data));
			}
		};

		const getUserAlbums = async () => {
			const result = await albumsRequest<AlbumsResponse>("/albums", "GET");

			if (result?.success) {
				dispatch(setUserAlbums(result.data));
			}
		};

		const getUserPhotos = async () => {
			const result = await photosRequest<PhotosResponse>("/photos", "GET");

			if (result?.success) {
				dispatch(setUserPhotos(result.data));
			}
		};

		if (!userData && isLoggedIn) {
			void getUserData();
			void getUserAlbums();
			void getUserPhotos();
		}
	}, [isLoggedIn, userData, clientRequest, albumsRequest, photosRequest, dispatch]);

	if ((clientLoading && isLoggedIn) || (albumsLoading && isLoggedIn) || (photosLoading && isLoggedIn)) {
		return <Loader />;
	}

	if (clientError || albumsError || photosError) {
		return <p>An error has occurred: {clientError || albumsError || photosError}</p>;
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
