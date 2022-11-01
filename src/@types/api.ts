export type verifyResponse = {
	newUser: boolean;
	token: { accessToken: string };
	user: { person_id: number; phone_number: string };
};

export type UserData = {
	client_name: string;
	phone_number: string;
	selfie_image: string;
};

export type ApiResult<T> = {
	data: T;
	success: true;
};

export type ApiError = {
	error: {
		message: string;
	};
	success: false;
};

export type ApiResponse<T> = ApiError | ApiResult<T>;
