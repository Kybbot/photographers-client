import React, { FC } from "react";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";

const SettingsLayout: FC = () => {
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
						<svg width="8" height="16" fill="none" focusable="false" aria-hidden="true">
							<use xlinkHref="#left-arrow" />
						</svg>
					</button>
					<Link className="header__link" to="/">
						<img className="header__logo" src="/logo.svg" alt="PhotoDrop" width={125} height={16} />
					</Link>
				</div>
			</header>
			<main className="main">
				<div className="container__settings">
					<Outlet />
				</div>
			</main>
		</div>
	);
};

export default SettingsLayout;
