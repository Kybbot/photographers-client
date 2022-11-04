import React, { FC } from "react";

export const Loader: FC = () => {
	return (
		<div className="loader">
			<img className="loader__gif" src="/gif-loader.gif" alt="loader" />
			<p className="loader__text">Almost there...</p>
		</div>
	);
};
