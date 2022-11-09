import { RefObject } from "react";

export const transformVideo = (videoRef: RefObject<HTMLVideoElement>) => {
	if (videoRef.current) {
		const canvas = document.createElement("canvas");
		const context = canvas.getContext("2d") as CanvasRenderingContext2D;

		canvas.width = videoRef.current.videoWidth;
		canvas.height = videoRef.current.videoHeight;

		context.drawImage(
			videoRef.current,
			0,
			0,
			videoRef.current.videoWidth,
			videoRef.current.videoHeight,
			0,
			0,
			videoRef.current.videoWidth,
			videoRef.current.videoHeight
		);

		return new Promise((resolve) => {
			canvas.toBlob(resolve, "image/jpeg");
		});
	}
};
