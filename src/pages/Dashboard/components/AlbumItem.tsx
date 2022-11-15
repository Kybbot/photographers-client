import React, { FC, memo } from "react";
import { Link } from "react-router-dom";

import { AlbumType } from "../../../@types/api";

type AlbumItemProps = {
	data: AlbumType;
};

export const AlbumItem: FC<AlbumItemProps> = memo(({ data }) => {
	return (
		<Link to={`/album/${data.id}`} className="albums__wrapper" type="button">
			<img src={data.album_logo} alt={data.album_name} className="albums__img" width={167} height={215} />
			<span className="albums__name">{data.album_location}</span>
		</Link>
	);
});
