import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const SettingsLayout: React.FC = () => {
	const navigate = useNavigate();

	const goBackHandler = () => {
		navigate(-1);
	};

	return (
		<>
			<header className="header">
				<div className="container">
					<div className="header__container">
						<button className="header__btn header__btn--visible" aria-label="Go back" onClick={goBackHandler}>
							<svg width="8" height="17" fill="none" focusable="false" aria-hidden="true">
								<use xlinkHref="#left-arrow" />
							</svg>
						</button>
						<img src="/logo.svg" alt="PhotoDrop" width={125} height={17} />
					</div>
				</div>
			</header>
			<main className="main">
				<Outlet />
			</main>
		</>
	);
};

export default SettingsLayout;
