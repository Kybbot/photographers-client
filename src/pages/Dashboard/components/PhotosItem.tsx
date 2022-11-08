import React, { FC, RefObject, useRef } from "react";

import { PhotoType } from "../../../@types/api";

type PhotosItemProps = {
	data: PhotoType;
	owned?: boolean;
	openCurrentPhoto: (btnRef: RefObject<HTMLButtonElement>, url: PhotoType) => void;
};

export const PhotosItem: FC<PhotosItemProps> = ({ data, owned, openCurrentPhoto }) => {
	const btnRef = useRef<HTMLButtonElement>(null);

	const handleButton = () => {
		openCurrentPhoto(btnRef, data);
	};

	return (
		<button
			ref={btnRef}
			className="photos__item"
			type="button"
			onClick={handleButton}
			aria-label="Open photo in lightbox"
		>
			<img src={data.owned || owned ? data.photo_logo : data.marked_logo} alt="Random" className="photos__img" />
		</button>
	);
};
