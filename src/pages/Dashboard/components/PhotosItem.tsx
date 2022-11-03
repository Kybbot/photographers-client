import React from "react";

import { PhotoType } from "../../../@types/api";

type PhotosItemProps = {
	data: PhotoType;
	openCurrentPhoto: (btnRef: React.RefObject<HTMLButtonElement>, url: string) => void;
};

export const PhotosItem: React.FC<PhotosItemProps> = ({ data, openCurrentPhoto }) => {
	const btnRef = React.useRef<HTMLButtonElement>(null);

	const handleButton = () => {
		openCurrentPhoto(btnRef, data.marked_url);
	};

	return (
		<button
			ref={btnRef}
			className="photos__item"
			type="button"
			onClick={handleButton}
			aria-label="Open photo in lightbox"
		>
			<img src={data.marked_logo} alt="Random" className="photos__img" />
		</button>
	);
};
