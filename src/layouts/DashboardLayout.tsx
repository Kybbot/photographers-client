import React from "react";
import { Link, Outlet } from "react-router-dom";

import realAvatar from "../assets/img/real-avatar.jpg";

const DashboardLayout: React.FC = () => {
	return (
		<div className="dashboard">
			<header className="header">
				<div className="header__container">
					<img className="header__logo" src="/logo.svg" alt="PhotoDrop" />
					<Link to="/settings" className="header__avatar" aria-label="Settings">
						<img src={realAvatar} alt="avatar" aria-hidden="true" className="header__img" width={35} height={35} />
					</Link>
				</div>
			</header>
			<main className="main">
				<Outlet />
			</main>
			<footer className="footer">
				<div className="footer__container">
					<div className="footer__block">
						<h2 className="footer__title">PhotoDrop is brought to you by</h2>
						<img className="footer__logo" src="/footer-logo.svg" alt="Frameology" width={150} height={25} />
						<p className="footer__text">
							Our mission is to help people connect with their memories. If you framing some of the photos from your
							experience, please consider using Frameology. It supports the photographers and makes PhotoDrop possible.
						</p>
						<button className="btn btn--transparent">Frame a photo</button>
						<p className="footer__date">© {new Date().getFullYear()} FOM Online Inc</p>
					</div>
					<div className="footer__block">
						<p className="footer__email">
							Questions? Get in touch -{" "}
							<a className="footer__link" href="mailto:hello@photodrop.me" target="_blank" rel="noreferrer noopener">
								hello@photodrop.me
							</a>
						</p>
						<img src="/climate.svg" alt="Climate Neutral Certified" className="footer__dec" width={100} height={40} />
						<div className="footer__links">
							<Link to="/terms" className="footer__link">
								Terms of services
							</Link>
							<Link to="/privacy" className="footer__link">
								Privacy Party
							</Link>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default DashboardLayout;
