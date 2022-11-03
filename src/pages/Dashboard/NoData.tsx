import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Print } from "./components/Print";

export const NoData: React.FC = () => {
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
						{Array(3)
							.fill(0)
							.map((_, index) => (
								<SwiperSlide key={index}>
									<Print index={index} />
								</SwiperSlide>
							))}
					</Swiper>
				</div>
			</div>
		</section>
	);
};
