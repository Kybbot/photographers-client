import { useQuery } from "@tanstack/react-query";

import { ApiResponse, UserData, ApiError } from "../@types/api";

const authFetch = async <T>(endpoint: string, method?: string, body?: BodyInit, headers?: HeadersInit) => {
	headers = {
		Authorization: `Bearer ${localStorage.getItem("PHOTODROP_TOKEN") || ""}`,
	};

	if (body) {
		headers = {
			...headers,
			"Content-Type": "application/json",
		};
	}

	const init = {
		method,
		body,
		headers,
	};

	const response = await fetch(`${import.meta.env.VITE_SERVER_ENDPOINT2}${endpoint}`, init);
	const data = (await response.json()) as ApiResponse<T>;
	return data;
};

const getUserData = () => authFetch<UserData>("/client", "GET");

export const useFact = () => {
	return useQuery<ApiResponse<UserData>, ApiError>(["userData"], getUserData, {
		refetchOnMount: false,
	});
};
