import React, { FC } from "react";

type PrintProps = {
	index: number;
};

export const Print: FC<PrintProps> = ({ index }) => {
	return (
		<div className="dashboard__wrapper">
			<picture className="dashboard__picture">
				<source type="image/webp" srcSet={`/artPrints/${index + 1}.webp`} />
				<img
					src={`/artPrints/${index + 1}.jpg`}
					alt="Print example"
					className="dashboard__img"
					width={167}
					height={215}
				/>
			</picture>
		</div>
	);
};
