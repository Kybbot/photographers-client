import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./reducers/authSlice";
import userSlice from "./reducers/userSlice";

export const store = configureStore({
	reducer: {
		auth: authSlice,
		user: userSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
