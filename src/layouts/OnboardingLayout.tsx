import React from "react";
import { Outlet } from "react-router-dom";

const OnBoardingLayout: React.FC = () => {
	return (
		<div className="settings">
			<header className="header">
				<div className="container">
					<div className="header__container">
						<img className="header__logo" src="/logo.svg" alt="PhotoDrop" width={125} height={16} />
					</div>
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

export default OnBoardingLayout;
