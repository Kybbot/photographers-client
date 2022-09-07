import React from "react";

type LightboxProps = {
	currentPrint: string;
	closeModal: () => void;
};

export const Lightbox: React.FC<LightboxProps> = ({ currentPrint, closeModal }) => {
	return (
		<section className="lightbox">
			<div className="lightbox__container">
				<div className="lightbox__wrapper">
					<button type="button" className="lightbox__close" aria-label="Close lightbox" onClick={closeModal}>
						<svg focusable="false" aria-hidden="true" width="17" height="17" fill="none">
							<use xlinkHref="#close" />
						</svg>
					</button>
				</div>
				<div className="lightbox__photo">
					<img src={currentPrint} alt="Print example" className="lightbox__img" />
				</div>
				<div className="lightbox__btns">
					<a href={currentPrint} download="PrintExample.png" className="lightbox__btn lightbox__download">
						<svg className="lightbox__svg" focusable="false" aria-hidden="true" width="25" height="21" fill="none">
							<use xlinkHref="#download" />
						</svg>
						Download
					</a>
					<button type="button" className="lightbox__btn lightbox__share">
						<svg className="lightbox__svg" focusable="false" aria-hidden="true" width="25" height="21" fill="none">
							<use xlinkHref="#share" />
						</svg>
						Share
					</button>
					<button type="button" className="btn btn--transparent lightbox__see">
						See in a frame
					</button>
					{/* <button type="button" className="btn btn--white">Unlock photos</button> */}
				</div>
			</div>
		</section>
	);
};
