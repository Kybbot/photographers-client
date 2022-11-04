import React from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { Swiper, SwiperSlide } from "swiper/react";

import { AlbumItem } from "./components/AlbumItem";
import { PhotosItem } from "./components/PhotosItem";
import { Lightbox, Modal, StripeCheckout, StripeError, PaymentForm } from "../../components";

import { useModal } from "../../hooks/useModal";
import { useAppSelector } from "../../hooks/reduxHooks";
import { getUserAlbums, getUserPhotos } from "../../redux/reducers/userSlice";

export const Photos: React.FC = () => {
	const stripe = useStripe();

	const userAlbums = useAppSelector(getUserAlbums);
	const userPhotos = useAppSelector(getUserPhotos);

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
							{userAlbums.map((item) => (
								<SwiperSlide key={item.id}>
									<AlbumItem data={item} />
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
						{userPhotos.map((item) => (
							<PhotosItem key={item.id} data={item} openCurrentPhoto={openCurrentPhoto} />
						))}
					</div>
				</div>
				{userAlbums.length === 1 && (
					<div className="container">
						<button
							ref={stripeBtnRef}
							type="button"
							className="btn photos__btn"
							onClick={() => openModal2(stripeBtnRef)}
						>
							Unlock your photos
						</button>
					</div>
				)}
			</div>
		</section>
	);
};
