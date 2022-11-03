import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";

import { AlbumsResponse, PhotosResponse, UserResponse } from "../../@types/api";

type UserStore = {
	userData: UserResponse | null;
	albums: AlbumsResponse;
	photos: PhotosResponse;
};

const initialState: UserStore = {
	userData: null,
	albums: [],
	photos: [],
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUserData: (state, action: PayloadAction<UserResponse>) => {
			state.userData = action.payload;
		},
		changeUserSelfie: (state, action: PayloadAction<string>) => {
			if (state.userData) {
				state.userData.selfie_image = action.payload;
			}
		},
		changeUserName: (state, action: PayloadAction<string>) => {
			if (state.userData) {
				state.userData.client_name = action.payload;
			}
		},
		setUserAlbums: (state, action: PayloadAction<AlbumsResponse>) => {
			state.albums = action.payload;
		},
		setUserPhotos: (state, action: PayloadAction<PhotosResponse>) => {
			state.photos = action.payload;
		},
	},
});

export const { setUserData, changeUserSelfie, changeUserName, setUserAlbums, setUserPhotos } = userSlice.actions;

export const getUserData = (state: RootState) => state.user.userData;
export const getUserAlbumsLength = (state: RootState) => state.user.albums.length;
export const getUserAlbums = (state: RootState) => state.user.albums;
export const getUserPhotos = (state: RootState) => state.user.photos;

export default userSlice.reducer;
