import React from "react";
import { Link } from "react-router-dom";

const Privacy: React.FC = () => {
	return (
		<>
			<header className="header">
				<div className="header__container">
					<img className="header__logo" src="/logo.svg" alt="PhotoDrop" />
				</div>
			</header>
			<main className="main">
				<div className="container container--terms">
					<h1 className="terms__title">Privacy policy</h1>
					<p className="terms__text">
						Your privacy is very important to us. Accordingly, we have developed this Privacy Policy in order for you to
						understand how we collect, use, and disclose information that we receive through our Service. The FOM
						Online, Inc. (“PhotoDrop,” “us,” “we,” or “our”) website available at photodrop.me and the PhotoDrop photo
						finding service (together, the “Service”) are owned and operated by PhotoDrop. This Privacy Policy does not
						apply to any third party websites, services or applications, even if they are accessible through our
						Service. Also, please note that, unless we define a term in this Privacy Policy, all capitalized terms used
						in this Privacy Policy have the same meanings as in our Terms of Service. So, please make sure that you have
						read and understand our Terms of Service.
					</p>
					<h2 className="terms__subtitle">User Consent</h2>
					<p className="terms__text">
						By accessing or otherwise using the Service, you agree to the terms and conditions of this Privacy Policy
						and the associated Terms of Service (set forth on PhotoDrop) you expressly consent to the processing of your
						Personal Information (as defined below) and Anonymous Information (as defined below) according to this
						Privacy Policy.
					</p>
					<p className="terms__text">
						Your Personal Information may be processed by us in the country where it was collected and transferred to,
						and maintained on, computers located outside of your state, province, country (including the United States),
						or other governmental jurisdiction where privacy laws regarding processing of Personal Information may be
						less stringent than the laws in your country. If youU+2019re located outside the United States and choose to
						provide your Personal Information to us, we may transfer your Personal Information to the United States and
						process it there.
					</p>
					<h2 className="terms__subtitle">Regarding Children</h2>
					<p className="terms__text">
						Children under the age of 13 are not permitted to use the Service and we do not intentionally collect or
						maintain Personal Information from those who are under 13 years old. Protecting the privacy of children is
						very important to us. Thus, if we obtain actual knowledge that a user is under 13, we will take steps to
						remove that userU+2019s Personal Information from our databases. We recommend that children between the ages
						of 13 and 18 obtain their parentU+2019s permission before submitting information over the internet. By using
						the Service, you are representing that you are at least 18 years old, or that you are at least 13 years old
						and have your parentsU+2019 permission to use the Service.
					</p>
				</div>
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
		</>
	);
};

export default Privacy;
