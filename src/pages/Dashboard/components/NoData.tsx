import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Print } from "./Print";
import { Lightbox, Modal } from "../../../components";

import { useModal } from "../../../hooks/useModal";

export const NoData: React.FC = () => {
	const [currentPrint, setCurrentPrint] = React.useState<string>("");

	const { isActive, openModal, closeModal } = useModal();

	const openCurrentPrint = (btnRef: React.RefObject<HTMLButtonElement>, imgSrc: string) => {
		setCurrentPrint(imgSrc);
		openModal(btnRef);
	};

	return (
		<section className="dashboard__container">
			<Modal overlay={false} active={isActive} closeModal={closeModal}>
				<Lightbox currentPrint={currentPrint} closeModal={closeModal} />
			</Modal>
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
									<Print index={index} openCurrentPrint={openCurrentPrint} />
								</SwiperSlide>
							))}
					</Swiper>
				</div>
			</div>
		</section>
	);
};
