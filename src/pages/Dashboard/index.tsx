import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import logo from "../../assets/img/logo.svg";
import message from "../../assets/img/message.svg";
import realAvatar from "../../assets/img/real-avatar.jpg";

const Dashboard: React.FC = () => {
	return (
		<>
			<header className="header">
				<div className="container">
					<div className="header__container">
						<img src={logo} alt="PhotoDrop" />
						<Link to={"/settings"} className="header__avatar" aria-label="Settings">
							<img src={realAvatar} alt="avatar" aria-hidden="true" className="header__img" />
						</Link>
					</div>
				</div>
			</header>
			<main className="main">
				<section className="dashboard">
					<div className="container">
						<img className="dashboard__dec" src={message} alt="" arica-hidden="true" />
						<h1 className="dashboard__title">Your photos will drop soon.</h1>
						<p className="dashboard__text">
							You will get a text message when they are ready. It can take up to 48 hours.
						</p>
					</div>
					<hr className="dashboard__hr" />
					<div className="container__left">
						<h2 className="dashboard__subtitle">Browse Art Prints</h2>
						<div className="dashboard__prints">
							<Swiper spaceBetween={5} slidesPerView={"auto"} slidesOffsetAfter={15}>
								<SwiperSlide>
									<div className="dashboard__wrapper">
										<picture className="dashboard__picture">
											<source type="image/webp" srcSet="/artPrints/1.webp" />
											<img src="/artPrints/1.jpg" alt="Manhattan Bridge" className="dashboard__img" />
										</picture>
									</div>
								</SwiperSlide>
								<SwiperSlide>
									<div className="dashboard__wrapper">
										<picture className="dashboard__picture">
											<source type="image/webp" srcSet="/artPrints/2.webp" />
											<img src="./artPrints/2.jpg" alt="New York" className="dashboard__img" />
										</picture>
									</div>
								</SwiperSlide>
								<SwiperSlide>
									<div className="dashboard__wrapper">
										<picture className="dashboard__picture">
											<source type="image/webp" srcSet="/artPrints/3.webp" />
											<img src="/artPrints/3.jpg" alt="Asia" className="dashboard__img" />
										</picture>
									</div>
								</SwiperSlide>
							</Swiper>
						</div>
					</div>
				</section>
			</main>
		</>
	);
};

export default Dashboard;
