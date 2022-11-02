import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { UserResponse } from "../../@types/api";

type UserStore = {
	userData: UserResponse | null;
};

const initialState: UserStore = {
	userData: null,
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
	},
});

export const { setUserData, changeUserSelfie, changeUserName } = userSlice.actions;

export const getUserData = (state: RootState) => state.user.userData;

export default userSlice.reducer;
