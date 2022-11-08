import React, { FC, RefObject, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { AlbumItem } from "./components/AlbumItem";
import { PhotosItem } from "./components/PhotosItem";
import { Lightbox, Modal, PaymentForm } from "../../components";

import { useModal } from "../../hooks/useModal";
import { useAppSelector } from "../../hooks/reduxHooks";
import { getUserAlbums, getUserPhotos } from "../../redux/reducers/userSlice";

import { PhotoType } from "../../@types/api";

export const Photos: FC = () => {
	const userAlbums = useAppSelector(getUserAlbums);
	const userPhotos = useAppSelector(getUserPhotos);

	const [currentAlbum, setCurrentAlbum] = useState(userAlbums[0]);
	const [currentPhoto, setCurrentPhoto] = useState<PhotoType>(userPhotos[0]);

	const stripeBtnRef = useRef<HTMLButtonElement>(null);

	const { isActive: isActive1, openModal: openModal1, closeModal: closeModal1 } = useModal();
	const { isActive: isActive2, openModal: openModal2, closeModal: closeModal2 } = useModal();

	const openCurrentPhoto = (btnRef: RefObject<HTMLButtonElement>, photo: PhotoType) => {
		const album = userAlbums.find((item) => item.id === +photo.album_id);
		if (album) setCurrentAlbum(album);
		setCurrentPhoto(photo);
		openModal1(btnRef);
	};

	return (
		<section className="dashboard__container">
			<Modal overlay={false} active={isActive1} closeModal={closeModal1}>
				<Lightbox currentPhoto={currentPhoto} closeModal={closeModal1} openCheckout={openModal2} />
			</Modal>
			<Modal overlay={true} active={isActive2} closeModal={closeModal2} displayType="flex">
				<PaymentForm albumData={currentAlbum} closeModal={closeModal2} />
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
				{userAlbums.length === 1 && !userAlbums[0].owned && (
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
