import React, { FormEvent } from "react";
import Cropper, { Area } from "react-easy-crop";

import { useWindowSize } from "../hooks/useWindowSize";

type SelfiFormProps = {
	fileData: string | null;
	fileInputRef: React.RefObject<HTMLInputElement>;
	stream: MediaStream | null;
	closeHandler: () => void;
	openOptions?: (openBtnRef: React.RefObject<HTMLButtonElement>) => void;
};

export const SelfiForm: React.FC<SelfiFormProps> = ({ fileData, fileInputRef, stream, closeHandler, openOptions }) => {
	const [crop, setCrop] = React.useState({ x: 0, y: 0 });
	const [zoom, setZoom] = React.useState(1);
	const [minZoom, setMinZoom] = React.useState(1);
	const [croppedAreaPixels, setCroppedAreaPixels] = React.useState<Area>({
		width: 0,
		height: 0,
		x: 0,
		y: 0,
	});

	const { width } = useWindowSize();

	const retakeBtnRef = React.useRef<HTMLButtonElement>(null);
	const videoRef = React.useRef<HTMLVideoElement>(null);

	const onCropComplete = React.useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
		setCroppedAreaPixels(croppedAreaPixels);
	}, []);

	const retakeHandlerMb = () => {
		fileInputRef.current?.click();
	};

	const retakeHandlerDk = () => {
		if (openOptions) {
			openOptions(retakeBtnRef);
		}
	};

	const transformImage = (imageUrl: string, area: Area) => {
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

	const formHandler = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (videoRef.current) {
			const canvas = document.createElement("canvas");
			const context = canvas.getContext("2d") as CanvasRenderingContext2D;

			canvas.width = 570;
			canvas.height = 570;

			context.drawImage(
				videoRef.current,
				videoRef.current.videoWidth / 2 - 285,
				videoRef.current.videoHeight / 2 - 285,
				570,
				570,
				0,
				0,
				570,
				570
			);
			document.body.append(canvas);
			canvas.toBlob((blob) => blob && console.log(URL.createObjectURL(blob)));
			// canvas.remove();
		}

		if (fileData) {
			const a = (await transformImage(fileData, croppedAreaPixels)) as Blob;

			console.log(URL.createObjectURL(a));
		}

		closeHandler();
	};

	React.useEffect(() => {
		if (videoRef.current) {
			videoRef.current.srcObject = stream;
		}
	}, [stream]);

	return (
		<form
			className="selfi__form selfi__form--visible"
			onSubmit={(event) => {
				void formHandler(event);
			}}
		>
			<div className="selfi__container">
				<button className="selfi__close" type="button" aria-label="Close selfi form" onClick={closeHandler}>
					<svg width="17" height="17" fill="none" focusable="false" aria-hidden="true">
						<use xlinkHref="#close" />
					</svg>
				</button>
				<h3 className="selfi__subtitle">Take selfie</h3>
				<div>
					<p className="selfi__subtext">Drag and zoom image to crop</p>
					{stream ? (
						<video className="selfi__video" ref={videoRef} id="video" width="285" height="285" autoPlay muted />
					) : (
						<Cropper
							image={fileData ? fileData : ""}
							aspect={1}
							crop={crop}
							zoom={zoom}
							showGrid={false}
							minZoom={minZoom}
							cropShape="round"
							objectFit="horizontal-cover"
							onCropChange={setCrop}
							onCropComplete={onCropComplete}
							onZoomChange={setZoom}
							cropSize={{ width: 285, height: 285 }}
							onMediaLoaded={({ height, width }) => {
								const smallerSide = height >= width ? width : height;
								setMinZoom(285 / smallerSide);
								setZoom(285 / smallerSide);
							}}
							disableAutomaticStylesInjection
						/>
					)}
				</div>
				<fieldset className="selfi__fieldset">
					{width && width < 1024 ? (
						<button className="btn selfi__retake selfi__retake--mb" type="button" onClick={retakeHandlerMb}>
							Retake
						</button>
					) : (
						<button
							ref={retakeBtnRef}
							className="btn selfi__retake selfi__retake--dk"
							type="button"
							onClick={retakeHandlerDk}
						>
							Retake
						</button>
					)}
					<button className="btn selfi__save" type="submit">
						Save
					</button>
				</fieldset>
			</div>
		</form>
	);
};
