import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
	return (
		<>
			<header className="header">
				<div className="container">
					<div className="header__container">
						<Link className="header__link" to="/">
							<img className="header__logo" src="/logo.svg" alt="PhotoDrop" width={125} height={16} />
						</Link>
					</div>
				</div>
			</header>
			<main className="main">
				<section className="notFound">
					<div className="container">
						<h1 className="notFound__title">Page not found!</h1>
						<Link to="/" className="btn" title="Go back">
							Go back
						</Link>
					</div>
				</section>
			</main>
		</>
	);
};

export default NotFound;
