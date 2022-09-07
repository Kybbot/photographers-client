import React from "react";

type PrintProps = {
	index: number;
	openCurrentPrint: (btnRef: React.RefObject<HTMLButtonElement>, imgSrc: string) => void;
};

export const Print: React.FC<PrintProps> = ({ index, openCurrentPrint }) => {
	const btnRef = React.useRef<HTMLButtonElement>(null);
	const imgRef = React.useRef<HTMLImageElement>(null);

	const handleButton = () => {
		if (imgRef.current) openCurrentPrint(btnRef, imgRef.current?.src);
	};

	return (
		<button
			ref={btnRef}
			type="button"
			className="dashboard__wrapper"
			onClick={handleButton}
			aria-label="Open print in lightbox"
		>
			<picture className="dashboard__picture">
				<source type="image/webp" srcSet={`/artPrints/${index + 1}.webp`} />
				<img
					ref={imgRef}
					src={`/artPrints/${index + 1}.jpg`}
					alt="Print example"
					className="dashboard__img"
					width={167}
					height={215}
				/>
			</picture>
		</button>
	);
};
