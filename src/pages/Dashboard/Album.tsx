import React, { FC, RefObject, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { PhotosItem } from "./components/PhotosItem";
import { Lightbox, Modal, PaymentForm, Loader } from "../../components";

import { useModal } from "../../hooks/useModal";
import { useAuthFetch } from "../../hooks/useAuthFetch";
import { useLazyLoadImages } from "../../hooks/useLazyLoadImages";

import { formatDate } from "../../utils/formatDate";

import { AlbumDataResponse, PhotoType } from "../../@types/api";

const Album: FC = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const [albumData, setAlbumData] = useState<AlbumDataResponse | null>(null);
	const [currentPhoto, setCurrentPhoto] = useState<PhotoType>();

	const { loading, error, request } = useAuthFetch(true);

	const stripeBtnRef1 = useRef<HTMLButtonElement>(null);
	const stripeBtnRef2 = useRef<HTMLButtonElement>(null);
	const photosGalleryDiv = useRef<HTMLDivElement>(null);

	const { isActive: isActive1, openModal: openModal1, closeModal: closeModal1 } = useModal();
	const { isActive: isActive2, openModal: openModal2, closeModal: closeModal2 } = useModal();

	const openCurrentPhoto = (btnRef: RefObject<HTMLButtonElement>, photo: PhotoType) => {
		setCurrentPhoto(photo);
		openModal1(btnRef);
	};

	const goBackHandler = () => {
		navigate("/");
	};

	useEffect(() => {
		const getAlbumData = async () => {
			const result = await request<AlbumDataResponse>(`/album/${location.pathname.split("/")[2]}`, "GET");

			if (result?.success) {
				setAlbumData(result.data);
			}
		};

		if (!albumData && location.pathname) {
			void getAlbumData();
		}
	}, [location, albumData, request]);

	useLazyLoadImages(photosGalleryDiv, [albumData]);

	if (loading) {
		return <Loader />;
	}

	if (error) {
		return <p>An error has occurred: {error}</p>;
	}

	return (
		<>
			{albumData && (
				<>
					<header className="header header--album">
						<div className="header__container">
							<button className="header__btn header__btn--visible" aria-label="Go back" onClick={goBackHandler}>
								<svg width="8" height="16" fill="none" focusable="false" aria-hidden="true">
									<use xlinkHref="#left-arrow" />
								</svg>
							</button>
							<div className="container">
								<div className="header__content">
									<div className="header__wrapper">
										<h1 className="header__title">{albumData.album.album_name}</h1>
										<p className="header__info">
											<span className="header__date">{formatDate(albumData.album.date)}</span> •{" "}
											<span className={`header__amount ${albumData.album.owned ? "header__amount--default" : ""}`}>
												{albumData.photos.length} photos
											</span>
										</p>
									</div>
									{!albumData.album.owned && (
										<button
											ref={stripeBtnRef1}
											className="header__buy"
											type="button"
											onClick={() => openModal2(stripeBtnRef1)}
										>
											Unlock your photos
										</button>
									)}
								</div>
							</div>
						</div>
					</header>
					<main className="main">
						<section className="album">
							<Modal overlay={false} active={isActive1} closeModal={closeModal1}>
								<Lightbox
									currentPhoto={currentPhoto || albumData.photos[0]}
									owned={albumData.album.owned}
									closeModal={closeModal1}
									openCheckout={openModal2}
								/>
							</Modal>
							<Modal overlay={true} active={isActive2} closeModal={closeModal2} displayType="flex">
								<PaymentForm albumData={albumData.album} closeModal={closeModal2} />
							</Modal>
							<div className="container container--full">
								<div className="album__gallery" ref={photosGalleryDiv}>
									{albumData.photos.map((item, index) => (
										<PhotosItem
											key={index}
											data={item}
											owned={albumData.album.owned}
											openCurrentPhoto={openCurrentPhoto}
										/>
									))}
								</div>
							</div>
							{!albumData.album.owned && (
								<div className="container">
									<button
										ref={stripeBtnRef2}
										type="button"
										className="btn album__btn"
										onClick={() => openModal2(stripeBtnRef2)}
									>
										Unlock your photos
									</button>
								</div>
							)}
						</section>
					</main>
					<footer className="footer">
						<div className="footer__container">
							<div className="footer__block">
								<h2 className="footer__title">PhotoDrop is brought to you by</h2>
								<img className="footer__logo" src="/footer-logo.svg" alt="Frameology" width={150} height={24} />
								<p className="footer__text">
									Our mission is to help people connect with their memories. If you framing some of the photos from your
									experience, please consider using Frameology. It supports the photographers and makes PhotoDrop
									possible.
								</p>
								<button className="btn btn--transparent">Frame a photo</button>
								<p className="footer__date">© {new Date().getFullYear()} FOM Online Inc</p>
							</div>
							<div className="footer__block">
								<p className="footer__email">
									Questions? Get in touch -{" "}
									<a
										className="footer__link"
										href="mailto:hello@photodrop.me"
										target="_blank"
										rel="noreferrer noopener"
									>
										hello@photodrop.me
									</a>
								</p>
								<img
									src="/climate.svg"
									alt="Climate Neutral Certified"
									className="footer__dec"
									width={100}
									height={40}
								/>
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
			)}
		</>
	);
};

export default Album;
