import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const SettingsLayout: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const goBackHandler = () => {
		if (location.pathname === "/settings") {
			navigate("/");
		} else navigate(-1);
	};

	return (
		<div className="settings">
			<header className="header">
				<div className="header__container">
					<button className="header__btn header__btn--visible" aria-label="Go back" onClick={goBackHandler}>
						<svg width="8" height="17" fill="none" focusable="false" aria-hidden="true">
							<use xlinkHref="#left-arrow" />
						</svg>
					</button>
					<img className="header__logo" src="/logo.svg" alt="PhotoDrop" width={125} height={17} />
				</div>
			</header>
			<main className="main">
				<div className="container__settings h-100">
					<Outlet />
				</div>
			</main>
		</div>
	);
};

export default SettingsLayout;
