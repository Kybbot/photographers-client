import React, { FC, RefObject, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { AlbumItem } from "./components/AlbumItem";
import { PhotosItem } from "./components/PhotosItem";
import { Lightbox, Modal, PaymentForm } from "../../components";

import { useModal } from "../../hooks/useModal";
import { useAppSelector } from "../../hooks/reduxHooks";
import { useLazyLoadImages } from "../../hooks/useLazyLoadImages";
import { getUserPhotos } from "../../redux/reducers/userSlice";

import { AlbumsResponse, PhotoType } from "../../@types/api";

type PhotosProps = {
	albums: AlbumsResponse;
};

export const Photos: FC<PhotosProps> = ({ albums }) => {
	const userPhotos = useAppSelector(getUserPhotos);

	const [currentAlbum, setCurrentAlbum] = useState(albums[0]);
	const [currentPhoto, setCurrentPhoto] = useState<PhotoType>(userPhotos[0]);

	const stripeBtnRef = useRef<HTMLButtonElement>(null);
	const photosGalleryDiv = useRef<HTMLDivElement>(null);

	const { isActive: isActive1, openModal: openModal1, closeModal: closeModal1 } = useModal();
	const { isActive: isActive2, openModal: openModal2, closeModal: closeModal2 } = useModal();

	const openCurrentPhoto = (btnRef: RefObject<HTMLButtonElement>, photo: PhotoType) => {
		const album = albums.find((item) => item.id === +photo.album_id);
		if (album) setCurrentAlbum(album);
		setCurrentPhoto(photo);
		openModal1(btnRef);
	};

	useLazyLoadImages(photosGalleryDiv, []);

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
							{albums.map((item) => (
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
					<div className="photos__gallery" ref={photosGalleryDiv}>
						{userPhotos.map((item) => (
							<PhotosItem key={item.id} data={item} openCurrentPhoto={openCurrentPhoto} />
						))}
					</div>
				</div>
				{albums.length === 1 && !albums[0].owned && (
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
