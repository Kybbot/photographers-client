import React from "react";

type PhotosItemProps = {
	url: string;
	openCurrentPhoto: (btnRef: React.RefObject<HTMLButtonElement>, url: string) => void;
};

export const PhotosItem: React.FC<PhotosItemProps> = ({ url, openCurrentPhoto }) => {
	const btnRef = React.useRef<HTMLButtonElement>(null);

	const handleButton = () => {
		openCurrentPhoto(btnRef, url);
	};

	return (
		<button
			ref={btnRef}
			className="photos__item"
			type="button"
			onClick={handleButton}
			aria-label="Open photo in lightbox"
		>
			<img src={url} alt="Random" className="photos__img" />
		</button>
	);
};
