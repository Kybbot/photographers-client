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
			<img
				data-src={data.owned || owned ? data.photo_logo : data.marked_logo}
				src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII="
				alt="Image"
				className="photos__img"
			/>
		</button>
	);
};
