import React, { useEffect } from "react";

type LightboxProps = {
	currentPrint: string;
	closeModal: () => void;
	openCheckout?: (openBtnRef: React.RefObject<HTMLButtonElement> | React.RefObject<HTMLInputElement>) => void;
};

export const Lightbox: React.FC<LightboxProps> = ({ currentPrint, closeModal, openCheckout }) => {
	const [copied, setCopied] = React.useState(false);
	const [copiedText, setCopiedText] = React.useState("");
	const [printUrl, setPrintUrl] = React.useState(currentPrint);
	const [isLoaded, setLoaded] = React.useState(false);

	const checkoutRef = React.useRef<HTMLButtonElement>(null);
	const imgRef = React.useRef<HTMLImageElement>(null);

	const shareData = {
		title: "PhotoDrop",
		url: currentPrint,
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

	const closeHandler = () => {
		closeModal();
	};

	const handeleCheckout = () => {
		if (openCheckout) {
			openCheckout(checkoutRef);
		}
	};

	useEffect(() => {
		setPrintUrl(currentPrint);
		setLoaded(false);

		if (imgRef.current) {
			imgRef.current.onload = () => {
				setLoaded(true);
			};
		}
	}, [currentPrint]);

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
					<img ref={imgRef} src={printUrl} alt="Print example" className="lightbox__img" />
				</div>
				<div className="lightbox__btns">
					<a href={currentPrint} download="PrintExample.png" className="lightbox__btn lightbox__download">
						<svg className="lightbox__svg" focusable="false" aria-hidden="true" width="24" height="21" fill="none">
							<use xlinkHref="#download" />
						</svg>
						Download
					</a>
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
					{/* <button
						ref={checkoutRef}
						type="button"
						className="btn btn--white lightbox__unlock"
						onClick={() => void handeleCheckout()}
					>
						Unlock photos
					</button> */}
				</div>
			</div>
			<div className="lightbox__gradient"></div>
		</section>
	);
};
