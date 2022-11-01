import create from "zustand";

export type AuthStore = {
	isLoggedIn: boolean;
	userPhone: string;
	setUserPhone: (phoneNumber: string) => void;
	setLoggedIn: (auth: boolean) => void;
};

export const useAuth = create<AuthStore>()((set) => ({
	isLoggedIn: !!localStorage.getItem("PHOTODROP_TOKEN"),
	userPhone: "",
	setUserPhone: (phoneNumber) => {
		set({ userPhone: phoneNumber });
	},
	setLoggedIn: (auth) => {
		set({ isLoggedIn: auth });
	},
}));
