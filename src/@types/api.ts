export type verifyResponse = {
	newUser: boolean;
	token: { accessToken: string };
	user: { person_id: number; phone_number: string; selfie_image: string };
};

export type UserResponse = {
	client_name: string;
	phone_number: string;
	selfie_image: string;
};

export type SelfiResponse = {
	id: number;
	selfie_url: string;
};

export type NameResponse = {
	id: number;
	client_name: string;
	phone_number: string;
	verified: boolean;
	selfie_image: string;
};

export type AlbumType = {
	id: number;
	person_id: string;
	date: string;
	album_name: string;
	album_location: string;
	album_logo: string;
};

export type AlbumsResponse = AlbumType[];

export type PhotoType = {
	id: number;
	album_id: string;
	client_name: string;
	marked_url: string;
	marked_logo: string;
	photo_url: string;
	photo_logo: string;
};

export type PhotosResponse = PhotoType[];

export type AlbumDataResponse = {
	album: AlbumType;
	photos: PhotoType[];
};

export type StripeResponse = {
	url: string;
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
