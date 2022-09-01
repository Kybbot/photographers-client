import React from "react";
import { Outlet } from "react-router-dom";

const OnBoardingLayout: React.FC = () => {
	return (
		<>
			<header className="header">
				<div className="container">
					<div className="header__container">
						<img className="header__logo" src="/logo.svg" alt="PhotoDrop" width={125} height={17} />
					</div>
				</div>
			</header>
			<main className="main h-100">
				<div className="container__settings h-100">
					<Outlet />
				</div>
			</main>
		</>
	);
};

export default OnBoardingLayout;
