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

	const { width } = useWindowSize();

	const retakeBtnRef = React.useRef<HTMLButtonElement>(null);
	const videoRef = React.useRef<HTMLVideoElement>(null);

	const onCropComplete = React.useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
		console.log(croppedArea, croppedAreaPixels);
	}, []);

	const retakeHandlerMb = () => {
		fileInputRef.current?.click();
	};

	const retakeHandlerDk = () => {
		if (openOptions) {
			openOptions(retakeBtnRef);
		}
	};

	const formHandler = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (videoRef.current) {
			const test = document.createElement("canvas");
			test.getContext("2d")?.drawImage(videoRef.current, 0, 0, 285, 285);
			test.toBlob((blob) => console.log(blob));
			test.remove();
		}

		console.log(fileData, stream);
		closeHandler();
	};

	React.useEffect(() => {
		if (videoRef.current) {
			videoRef.current.srcObject = stream;
		}
	}, [stream]);

	return (
		<form className="selfi__form selfi__form--visible" onSubmit={formHandler}>
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
