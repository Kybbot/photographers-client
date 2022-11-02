import React, { FormEvent } from "react";
import Cropper, { Area } from "react-easy-crop";

import { transformImage } from "../utils/transformImage";
import { transformVideo } from "../utils/transformVideo";

type SelfiFormProps = {
	fileData: string | null;
	fileInputRef: React.RefObject<HTMLInputElement>;
	stream: MediaStream | null;
	documentWidth: number | undefined;
	loading: boolean;
	closeHandler: () => void;
	openOptions?: (openBtnRef: React.RefObject<HTMLButtonElement>) => void;
	uploadSelfi: (img: Blob) => Promise<void>;
};

export const SelfiForm: React.FC<SelfiFormProps> = ({
	fileData,
	fileInputRef,
	stream,
	documentWidth,
	loading,
	closeHandler,
	openOptions,
	uploadSelfi,
}) => {
	const [crop, setCrop] = React.useState({ x: 0, y: 0 });
	const [zoom, setZoom] = React.useState(1);
	const [minZoom, setMinZoom] = React.useState(1);
	const [croppedAreaPixels, setCroppedAreaPixels] = React.useState<Area>({
		width: 0,
		height: 0,
		x: 0,
		y: 0,
	});
	const [selfi, setSelfi] = React.useState<string | MediaStream | null>(null);

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

	const formHandler = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (selfi && typeof selfi === "string") {
			const selfiImg = (await transformImage(selfi, croppedAreaPixels)) as Blob;
			void uploadSelfi(selfiImg);
		} else {
			const selfiImg = (await transformVideo(videoRef)) as Blob;
			void uploadSelfi(selfiImg);
		}
	};

	React.useEffect(() => {
		if (fileData) {
			setSelfi(fileData);
		}

		if (stream) {
			setSelfi(stream);
		}

		if (videoRef.current) {
			videoRef.current.srcObject = stream;
		}
	}, [fileData, stream]);

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
					{documentWidth && documentWidth < 1024 ? (
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
					<button className="btn selfi__save" type="submit" disabled={!selfi}>
						Save {loading && <span className="spinner spinner--black"></span>}
					</button>
				</fieldset>
			</div>
		</form>
	);
};
