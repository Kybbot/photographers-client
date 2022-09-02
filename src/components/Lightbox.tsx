import React from "react";

export const Lightbox: React.FC = () => {
	return (
		<section className="lightbox">
			<div className="lightbox__container">
				<div className="lightbox__wrapper">
					<button className="lightbox__close" aria-label="Close lightbox">
						<svg focusable="false" aria-hidden="true" width="17" height="17" fill="none">
							<use xlinkHref="#close" />
						</svg>
					</button>
				</div>
				<div className="lightbox__photo">
					<img src="/artPrints/2.jpg" alt="" className="lightbox__img" />
				</div>
				<div className="lightbox__btns">
					<button className="lightbox__btn lightbox__download">
						<svg className="lightbox__svg" focusable="false" aria-hidden="true" width="25" height="21" fill="none">
							<use xlinkHref="#download" />
						</svg>
						<a href="/artPrints/2.jpg" download="name.png">
							Download
						</a>
					</button>
					<button className="lightbox__btn lightbox__share">
						<svg className="lightbox__svg" focusable="false" aria-hidden="true" width="25" height="21" fill="none">
							<use xlinkHref="#share" />
						</svg>
						Share
					</button>
					<button className="btn btn--transparent lightbox__see">See in a frame</button>
					{/* <button className="btn btn--white">Unlock photos</button> */}
				</div>
			</div>
		</section>
	);
};
