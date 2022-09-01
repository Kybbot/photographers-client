import React from "react";
import { Outlet } from "react-router-dom";

const OnBoardingLayout: React.FC = () => {
	return (
		<>
			<header className="header">
				<div className="container">
					<div className="header__container">
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

export default OnBoardingLayout;
