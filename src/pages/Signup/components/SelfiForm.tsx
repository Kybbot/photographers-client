import React from "react";

import avatar from "../../../assets/img/avatar.png";

export const SelfiForm: React.FC = () => {
	return (
		<>
			<h2 className="selfi__title">Add a selfie</h2>
			<p className="selfi__text">A selfie allows your photos to be synced with your account.</p>
			<div className="selfi__wrapper">
				<img aria-hidden="true" src={avatar} alt="avatar placeholder" className="selfi__avatar" />
				<button type="button" aria-label="Add a selfie" className="selfi__btn">
					<svg focusable="false" aria-hidden="true" width="24" height="24" fill="none" stroke="#ffffff" strokeWidth="2">
						<use xlinkHref="#plus" />
					</svg>
				</button>
			</div>
		</>
	);
};
