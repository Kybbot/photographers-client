import React from "react";
import { Link } from "react-router-dom";

const Terms: React.FC = () => {
	return (
		<>
			<header className="header">
				<div className="header__container">
					<img className="header__logo" src="/logo.svg" alt="PhotoDrop" width={125} height={16} />
				</div>
			</header>
			<main className="main">
				<div className="container container--terms">
					<h1 className="terms__title">Terms of service</h1>
					<p className="terms__text">
						By registering to use and access the FOM Online, Inc. (“PhotoDrop”) websites located at photodrop.me and
						frameology.com, the PhotoDrop photo matching service, and texting bot (together, the “Service”), you are
						agreeing to be bound by these Terms of Use (the “Terms”). The Terms and our Privacy Policy
						(photodrop.me/terms) govern your use of our Service. By agreeing to these Terms, you represent that you are
						not a resident of the state of Illinois and will not upload photos to PhotoDrop taken in the state of
						Illinois.{" "}
						<span className="terms__bold">
							Please read these Terms carefully. Unless you opt out of arbitration in accordance with the instructions
							below within 30 days of first agreeing to these Terms, you are agreeing that we will resolve certain
							disputes between us in binding arbitration on an individual basis rather than in jury trials or class
							actions.
						</span>
					</p>
					<p className="terms__text">
						If you do not agree with any of these terms, you are prohibited from using or accessing the Service. If you
						are accessing and using the Service on behalf of a company (such as your employer) or other legal entity,
						you represent and warrant that you have the authority to bind that company or other legal entity to these
						Terms. In that case, “you” and “your” will refer to that company or other legal entity.
					</p>
					<h2 className="terms__subtitle">Privacy Policy</h2>
					<p className="terms__text">
						Please refer to our Privacy Policy at https://photodrop.me/ privacy for information on how we collect, use
						and disclose information from our users. You acknowledge and agree that your use of the Service is subject
						to our Privacy Policy.
					</p>
					<h2 className="terms__subtitle">Facial Recognition Technology</h2>
					<p className="terms__text">
						You agree that we may use facial recognition technology to allow us to identify photos on the Service in
						which you appear when you add a reference photo to the Service. For example, our facial recognition
						technology will compare your reference image with albums of photos to locate photos of you. In addition,
						your responses to potential photo matches may improve the accuracy of the facial recognition technology. By
						using the Service and adding a reference image, you consent to the use of facial recognition technology to
						identify photos on the Service in which you appear. You represent that the reference image photo added by
						you to the Service is you (or a family member for whom you are the legal guardian or have their consent) and
						that you are not impersonating or misrepresenting yourself as any other person or entity. For more
						information on our use of facial recognition technology, please see our Privacy Policy.
					</p>
				</div>
			</main>
			<footer className="footer">
				<div className="footer__container">
					<div className="footer__block">
						<h2 className="footer__title">PhotoDrop is brought to you by</h2>
						<img className="footer__logo" src="/footer-logo.svg" alt="Frameology" width={150} height={24} />
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
		</>
	);
};

export default Terms;
