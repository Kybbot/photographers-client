import { RefObject } from "react";

export const transformVideo = (videoRef: RefObject<HTMLVideoElement>) => {
	if (videoRef.current) {
		const canvas = document.createElement("canvas");
		const context = canvas.getContext("2d") as CanvasRenderingContext2D;

		canvas.width = 500;
		canvas.height = 500;

		context.drawImage(
			videoRef.current,
			videoRef.current.videoWidth / 2 - 250,
			videoRef.current.videoHeight / 2 - 250,
			500,
			500,
			0,
			0,
			500,
			500
		);

		return new Promise((resolve) => {
			canvas.toBlob(resolve, "image/jpeg");
		});
	}
};
