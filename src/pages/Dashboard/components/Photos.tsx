import React from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { Swiper, SwiperSlide } from "swiper/react";

import { AlbumItem } from "./AlbumItem";
import { PhotosItem } from "./PhotosItem";
import { Lightbox, Modal, StripeCheckout, StripeError, PaymentForm } from "../../../components";

import { useModal } from "../../../hooks/useModal";

const arrOfPhotos = [
	"https://images.pexels.com/photos/13148555/pexels-photo-13148555.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
	"https://images.pexels.com/photos/13014389/pexels-photo-13014389.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
	"https://images.pexels.com/photos/13162210/pexels-photo-13162210.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
	"https://images.pexels.com/photos/13054281/pexels-photo-13054281.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
	"https://images.pexels.com/photos/13391438/pexels-photo-13391438.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
];

export const Photos: React.FC = () => {
	const stripe = useStripe();

	const [currentPhoto, setCurrentPhoto] = React.useState("");

	const stripeBtnRef = React.useRef<HTMLButtonElement>(null);

	const { isActive: isActive1, openModal: openModal1, closeModal: closeModal1 } = useModal();
	const { isActive: isActive2, openModal: openModal2, closeModal: closeModal2 } = useModal();
	const { isActive: isActive3, openModal: openModal3, closeModal: closeModal3 } = useModal();

	const openCurrentPhoto = (btnRef: React.RefObject<HTMLButtonElement>, url: string) => {
		setCurrentPhoto(url);
		openModal1(btnRef);
	};

	return (
		<section className="dashboard__container">
			<Modal overlay={false} active={isActive1} closeModal={closeModal1}>
				<Lightbox currentPrint={currentPhoto} closeModal={closeModal1} openCheckout={openModal3} />
			</Modal>
			<Modal overlay={true} active={isActive2} closeModal={closeModal2}>
				<PaymentForm openCheckout={openModal3} closeModal={closeModal2} />
			</Modal>
			<Modal overlay={true} active={isActive3} closeModal={closeModal3}>
				{stripe ? <StripeCheckout closeModal={closeModal3} /> : <StripeError closeModal={closeModal3} />}
			</Modal>
			<div className="albums">
				<div className="container__left">
					<h2 className="albums__title">Albums</h2>
					<div className="albums__container">
						<Swiper slidesPerView={"auto"} slidesOffsetAfter={15}>
							{Array(3)
								.fill(0)
								.map((_, index) => (
									<SwiperSlide key={index}>
										<AlbumItem index={index} />
									</SwiperSlide>
								))}
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
						{arrOfPhotos.map((item, index) => (
							<PhotosItem key={index} url={item} openCurrentPhoto={openCurrentPhoto} />
						))}
					</div>
				</div>
				<div className="container">
					<button ref={stripeBtnRef} type="button" className="btn photos__btn" onClick={() => openModal2(stripeBtnRef)}>
						Unlock your photos
					</button>
				</div>
			</div>
		</section>
	);
};
