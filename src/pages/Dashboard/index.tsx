import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

const Dashboard: React.FC = () => {
	return (
		<section className="dashboard__container">
			<div className="container">
				<img className="dashboard__dec" src="/message.svg" alt="" arica-hidden="true" width={82} height={75} />
				<h1 className="dashboard__title">Your photos will drop soon.</h1>
				<p className="dashboard__text">You will get a text message when they are ready. It can take up to 48 hours.</p>
			</div>
			<hr className="dashboard__hr" />
			<div className="container__left">
				<h2 className="dashboard__subtitle">Browse Art Prints</h2>
				<div className="dashboard__prints">
					<Swiper slidesPerView={"auto"} slidesOffsetAfter={15}>
						<SwiperSlide>
							<div className="dashboard__wrapper">
								<picture className="dashboard__picture">
									<source type="image/webp" srcSet="/artPrints/1.webp" />
									<img
										src="/artPrints/1.jpg"
										alt="Manhattan Bridge"
										className="dashboard__img"
										width={167}
										height={215}
									/>
								</picture>
							</div>
						</SwiperSlide>
						<SwiperSlide>
							<div className="dashboard__wrapper">
								<picture className="dashboard__picture">
									<source type="image/webp" srcSet="/artPrints/2.webp" />
									<img src="./artPrints/2.jpg" alt="New York" className="dashboard__img" width={167} height={215} />
								</picture>
							</div>
						</SwiperSlide>
						<SwiperSlide>
							<div className="dashboard__wrapper">
								<picture className="dashboard__picture">
									<source type="image/webp" srcSet="/artPrints/3.webp" />
									<img src="/artPrints/3.jpg" alt="Asia" className="dashboard__img" width={167} height={215} />
								</picture>
							</div>
						</SwiperSlide>
					</Swiper>
				</div>
			</div>
		</section>
	);
};

export default Dashboard;
