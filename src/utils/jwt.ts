export const getExpirationDate = (jwtToken: string): number | null => {
	if (!jwtToken) {
		return null;
	}

	const jwt = JSON.parse(atob(jwtToken.split(".")[1])) as {
		id: number;
		iat: number;
		exp: number;
	};

	return (jwt && jwt.exp && jwt.exp * 1000) || null;
};

export const isExpired = (exp: number | null) => {
	if (!exp) {
		return false;
	}

	return Date.now() > exp;
};
