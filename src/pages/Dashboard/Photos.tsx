import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

const Photos: React.FC = () => {
	return (
		<section className="dashboard__container">
			<div className="albums">
				<div className="container__left">
					<h2 className="albums__title">Albums</h2>
					<div className="album__container">
						<Swiper slidesPerView={"auto"} slidesOffsetAfter={15}>
							<SwiperSlide>
								<div className="album__wrapper">
									<picture className="album__picture">
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
								<div className="album__wrapper">
									<picture className="album__picture">
										<source type="image/webp" srcSet="/artPrints/2.webp" />
										<img src="./artPrints/2.jpg" alt="New York" className="dashboard__img" width={167} height={215} />
									</picture>
								</div>
							</SwiperSlide>
							<SwiperSlide>
								<div className="album__wrapper">
									<picture className="album__picture">
										<source type="image/webp" srcSet="/artPrints/3.webp" />
										<img src="/artPrints/3.jpg" alt="Asia" className="dashboard__img" width={167} height={215} />
									</picture>
								</div>
							</SwiperSlide>
							<SwiperSlide>
								<div className="album__wrapper">
									<picture className="album__picture">
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
						</Swiper>
					</div>
				</div>
			</div>
			<div className="photos">
				<div className="container">
					<h2 className="photos__title">All Photos</h2>
				</div>
				<div className="container container--full">
					<div className="photos__gallery">
						<div className="photos__item">
							<img
								src="https://images.pexels.com/photos/13148555/pexels-photo-13148555.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
								alt=""
								className="photos__img"
							/>
						</div>
						<div className="photos__item">
							<img
								src="https://images.pexels.com/photos/13014389/pexels-photo-13014389.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
								alt=""
								className="photos__img"
							/>
						</div>
						<div className="photos__item">
							<img
								src="https://images.pexels.com/photos/13162210/pexels-photo-13162210.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
								alt=""
								className="photos__img"
							/>
						</div>
						<div className="photos__item">
							<img
								src="https://images.pexels.com/photos/13054281/pexels-photo-13054281.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
								alt=""
								className="photos__img"
							/>
						</div>
						<div className="photos__item">
							<img
								src="https://images.pexels.com/photos/13391438/pexels-photo-13391438.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
								alt=""
								className="photos__img"
							/>
						</div>
					</div>
				</div>
				<div className="container">
					<button className="btn photos__btn">Unlock your photos</button>
				</div>
			</div>
		</section>
	);
};

export default Photos;
