import React, { FC, useEffect } from "react";

import { Photos } from "./Photos";
import { NoData } from "./NoData";
import { Loader } from "../../components";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useAuthFetch } from "../../hooks/useAuthFetch";
import { getUserAlbumsLength, setUserAlbums, setUserPhotos } from "../../redux/reducers/userSlice";

import { AlbumsResponse, PhotosResponse } from "../../@types/api";

const Dashboard: FC = () => {
	const userAlbumsLength = useAppSelector(getUserAlbumsLength);

	const dispatch = useAppDispatch();

	const { loading: albumsLoading, error: albumsError, request: albumsRequest } = useAuthFetch(userAlbumsLength === 0);
	const { loading: photosLoading, error: photosError, request: photosRequest } = useAuthFetch(userAlbumsLength === 0);

	useEffect(() => {
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

		if (userAlbumsLength === 0) {
			void getUserAlbums();
			void getUserPhotos();
		}
	}, [userAlbumsLength, albumsRequest, photosRequest, dispatch]);

	if (albumsLoading || photosLoading) {
		return <Loader />;
	}

	if (albumsError || photosError) {
		return <p>An error has occurred: {albumsError || photosError}</p>;
	}

	if (userAlbumsLength > 0) {
		return <Photos />;
	} else {
		return <NoData />;
	}
};

export default Dashboard;
