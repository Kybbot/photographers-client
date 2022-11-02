import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";

type AuthStore = {
	isLoggedIn: boolean;
	userPhone: string;
};

const initialState: AuthStore = {
	isLoggedIn: !!localStorage.getItem("PHOTODROP_TOKEN"),
	userPhone: "",
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUserPhone: (state, action: PayloadAction<string>) => {
			state.userPhone = action.payload;
		},
		setLoggedIn: (state, action: PayloadAction<boolean>) => {
			state.isLoggedIn = action.payload;
		},
	},
});

export const { setUserPhone, setLoggedIn } = authSlice.actions;

export const getIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const getUserPhone = (state: RootState) => state.auth.userPhone;

export default authSlice.reducer;
