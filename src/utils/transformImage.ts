import { Area } from "react-easy-crop";

export const transformImage = (imageUrl: string, area: Area) => {
	const canvas = document.createElement("canvas");
	const context = canvas.getContext("2d") as CanvasRenderingContext2D;

	const img = new Image();
	img.src = imageUrl;

	canvas.width = area.width;
	canvas.height = area.height;

	context.drawImage(img, area.x, area.y, area.width, area.height, 0, 0, area.width, area.height);

	return new Promise((resolve) => {
		canvas.toBlob(resolve, "image/jpeg");
	});
};
