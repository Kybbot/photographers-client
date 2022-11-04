import { useCallback, useState } from "react";

import { ApiResponse } from "../@types/api";

export const useAuthFetch = (isLoading = false) => {
	const [loading, setLoading] = useState(isLoading);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	const request = useCallback(
		async <T>(endpoint: string, method?: string, body?: BodyInit, headers?: HeadersInit, isItImage?: boolean) => {
			setError(null);
			setSuccess(false);
			if (!isLoading) setLoading(true);

			headers = {
				Authorization: `Bearer ${localStorage.getItem("PHOTODROP_TOKEN") || ""}`,
			};

			try {
				if (!isItImage) {
					if (body) {
						headers = {
							...headers,
							"Content-Type": "application/json",
						};
					}
				}

				const init = {
					method,
					body,
					headers,
				};

				const response = await fetch(`${import.meta.env.VITE_SERVER_ENDPOINT}${endpoint}`, init);

				const data = (await response.json()) as ApiResponse<T>;

				if (!response.ok && !data.success) {
					setLoading(false);
					throw new Error(data.error.message);
				}

				if (data.success) {
					setSuccess(true);
					setLoading(false);
					return data;
				}
			} catch (error) {
				if (error instanceof Error) {
					setError(error.message);
				}
				setLoading(false);
			}
		},
		[isLoading]
	);

	return { loading, error, success, request };
};
