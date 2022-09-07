import React from "react";
import { Link } from "react-router-dom";

type AlbumItemProps = {
	index: number;
};

export const AlbumItem: React.FC<AlbumItemProps> = ({ index }) => {
	return (
		<Link to={`/album/${index}`} className="albums__wrapper" type="button">
			<picture className="albums__picture">
				<source type="image/webp" srcSet={`/artPrints/${index + 1}.webp`} />
				<img
					src={`/artPrints/${index + 1}.jpg`}
					alt="Manhattan Bridge"
					className="albums__img"
					width={167}
					height={215}
				/>
			</picture>
		</Link>
	);
};
