import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { PhotosItem } from "./components/PhotosItem";
import { Lightbox, ModalOverlay, StripeCheckout, StripeError, StripeModal } from "../../components";

import { useModal } from "../../hooks/useModal";

const arrOfPhotos = [
	"https://images.pexels.com/photos/13148555/pexels-photo-13148555.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
	"https://images.pexels.com/photos/13014389/pexels-photo-13014389.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
	"https://images.pexels.com/photos/13162210/pexels-photo-13162210.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
	"https://images.pexels.com/photos/13054281/pexels-photo-13054281.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
	"https://images.pexels.com/photos/13391438/pexels-photo-13391438.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
];

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY, {
	locale: "en",
});

type responseType = {
	client_secret: string;
};

const Album: React.FC = () => {
	const navigate = useNavigate();

	const [clientSecret, setClientSecret] = React.useState("");
	const [currentPhoto, setCurrentPhoto] = React.useState("");

	const stripeBtnRef = React.useRef<HTMLButtonElement>(null);

	const { isActive: isActive1, openModal: openModal1, closeModal: closeModal1 } = useModal();
	const { isActive: isActive2, openModal: openModal2, closeModal: closeModal2 } = useModal();
	const { isActive: isActive3, openModal: openModal3, closeModal: closeModal3 } = useModal();

	const openCurrentPhoto = (btnRef: React.RefObject<HTMLButtonElement>, url: string) => {
		setCurrentPhoto(url);
		openModal1(btnRef);
	};

	const fetchIntent = async () => {
		const response = await fetch("http://localhost:5000/create-payment-intent");
		const data = (await response.json()) as responseType;
		setClientSecret(data.client_secret);
	};

	const options = {
		clientSecret: clientSecret,
		appearance: {},
	};

	const goBackHandler = () => {
		navigate("/photos");
	};

	return (
		<>
			<header className="header header--small">
				<button className="header__btn header__btn--visible" aria-label="Go back" onClick={goBackHandler}>
					<svg width="8" height="17" fill="none" focusable="false" aria-hidden="true">
						<use xlinkHref="#left-arrow" />
					</svg>
				</button>
				<div className="container">
					<div className="header__content">
						<h1 className="header__title">Brooklyn Bridge</h1>
						<p className="header__info">
							<span className="header__date">Jan 10, 2022</span> • <span className="header__amount">5 photos</span>
						</p>
					</div>
				</div>
			</header>
			<main className="main">
				<section className="album">
					<ModalOverlay active={isActive1} closeModal={closeModal1}>
						<Lightbox
							currentPrint={currentPhoto}
							closeModal={closeModal1}
							openCheckout={openModal3}
							fetchIntent={fetchIntent}
						/>
					</ModalOverlay>
					<StripeModal
						active={isActive2}
						closeModal={closeModal2}
						openCheckout={openModal3}
						fetchIntent={fetchIntent}
					/>
					<ModalOverlay active={isActive3} closeModal={closeModal3}>
						{clientSecret.length ? (
							<Elements options={options} stripe={stripePromise}>
								<StripeCheckout closeModal={closeModal3} />
							</Elements>
						) : (
							<StripeError closeModal={closeModal3} />
						)}
					</ModalOverlay>
					<div className="container container--full">
						<div className="album__gallery">
							{arrOfPhotos.map((item, index) => (
								<PhotosItem key={index} url={item} openCurrentPhoto={openCurrentPhoto} />
							))}
						</div>
					</div>
					<div className="container">
						<button
							ref={stripeBtnRef}
							type="button"
							className="btn album__btn"
							onClick={() => openModal2(stripeBtnRef)}
						>
							Unlock your photos
						</button>
					</div>
				</section>
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

export default Album;
