import React, { FC, RefObject, useEffect, useRef, useState } from "react";

import { PhotoType } from "../@types/api";

type LightboxProps = {
	currentPhoto: PhotoType;
	owned?: boolean;
	closeModal: () => void;
	openCheckout?: (openBtnRef: RefObject<HTMLButtonElement> | RefObject<HTMLInputElement>) => void;
};

export const Lightbox: FC<LightboxProps> = ({ currentPhoto, owned, closeModal, openCheckout }) => {
	const [copied, setCopied] = useState(false);
	const [copiedText, setCopiedText] = useState("");

	const [print, setPrint] = useState(currentPhoto);

	const [isLoaded, setLoaded] = useState(false);
	const [isDownloading, setDownloading] = useState(false);

	const checkoutRef = useRef<HTMLButtonElement>(null);
	const imgRef = useRef<HTMLImageElement>(null);

	const shareData = {
		title: "PhotoDrop",
		url: print.photo_url,
	};

	const copyToClipBoard = async (url: string) => {
		if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
			await navigator.clipboard.writeText(url);
			setCopiedText("Copied link to photo");
		} else {
			setCopiedText("Clipboard doesn't work");
		}
		setCopied(true);

		setTimeout(() => {
			setCopied(false);
		}, 2000);
	};

	const shareHandler = async () => {
		if (navigator.canShare) {
			if (navigator.canShare(shareData)) {
				try {
					await navigator.share(shareData);
				} catch (error) {
					console.log(error);
				}
			} else {
				await copyToClipBoard(shareData.url);
			}
		} else {
			await copyToClipBoard(shareData.url);
		}
	};

	const downloadHandlere = async () => {
		setDownloading(true);
		const image = await fetch(print.photo_url);
		const imageBlog = await image.blob();
		const imageURL = URL.createObjectURL(imageBlog);

		const link = document.createElement("a");
		link.href = imageURL;
		link.download = "Image";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		setDownloading(false);
	};

	const closeHandler = () => {
		closeModal();
	};

	const handeleCheckout = () => {
		if (openCheckout) {
			openCheckout(checkoutRef);
		}
	};

	useEffect(() => {
		setPrint(currentPhoto);
		setLoaded(false);

		if (imgRef.current) {
			imgRef.current.onload = () => {
				setLoaded(true);
			};
		}
	}, [currentPhoto]);

	return (
		<section className="lightbox">
			<div className="lightbox__container">
				<div className="lightbox__wrapper">
					<button type="button" className="lightbox__close" aria-label="Close lightbox" onClick={closeHandler}>
						<svg focusable="false" aria-hidden="true" width="15" height="15" fill="none">
							<use xlinkHref="#close" />
						</svg>
					</button>
				</div>
				<div className="lightbox__photo">
					{!isLoaded && (
						<div className="lightbox__loader">
							<span className="spinner spinner--big"></span>
						</div>
					)}
					<img
						ref={imgRef}
						src={print.owned || owned ? print.photo_url : print.marked_url}
						alt="Print example"
						className="lightbox__img"
					/>
				</div>
				<div className="lightbox__btns">
					{print.owned || owned ? (
						<>
							<button
								className="lightbox__btn lightbox__download"
								onClick={() => {
									void downloadHandlere();
								}}
							>
								{isDownloading ? (
									<div className="lightbox__spinner"></div>
								) : (
									<svg
										className="lightbox__svg"
										focusable="false"
										aria-hidden="true"
										width="24"
										height="21"
										fill="none"
									>
										<use xlinkHref="#download" />
									</svg>
								)}
								Download
							</button>
							<button
								type="button"
								className={`lightbox__btn lightbox__share ${copied ? "lightbox__share--active" : ""}`}
								onClick={() => void shareHandler()}
								data-title={copiedText}
							>
								<svg className="lightbox__svg" focusable="false" aria-hidden="true" width="24" height="21" fill="none">
									<use xlinkHref="#share" />
								</svg>
								Share
							</button>
							<button type="button" className="btn btn--transparent lightbox__see">
								See in a frame
							</button>
						</>
					) : (
						<button
							ref={checkoutRef}
							type="button"
							className="btn btn--white lightbox__unlock"
							onClick={() => void handeleCheckout()}
						>
							Unlock photos
						</button>
					)}
				</div>
			</div>
			<div className="lightbox__gradient"></div>
		</section>
	);
};
