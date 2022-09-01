import React, { ChangeEvent, FormEvent } from "react";
import Cropper, { Area } from "react-easy-crop";
import { useNavigate } from "react-router-dom";

import realAvatar from "../../assets/img/real-avatar.jpg";

const SettingsSelfi: React.FC = () => {
	const navigate = useNavigate();

	const [file, setFile] = React.useState<string | null>(realAvatar);
	const [crop, setCrop] = React.useState({ x: 0, y: 0 });
	const [zoom, setZoom] = React.useState(1);
	const [minZoom, setMinZoom] = React.useState(1);

	const fileInputRef = React.useRef<HTMLInputElement>(null);

	const fileHandler = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const file = event.target.files[0];

			setFile(URL.createObjectURL(file));
		}
	};

	const onCropComplete = React.useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
		console.log(croppedArea, croppedAreaPixels);
	}, []);

	const closeHandler = () => {
		navigate("/settings");
	};

	const retakeHandler = () => {
		fileInputRef.current?.click();
	};

	const formHandler = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log(file);

		closeHandler();
	};
	return (
		<form className="selfi__form selfi__form--visible" onSubmit={formHandler}>
			<div className="selfi__container">
				<button className="selfi__close" type="button" aria-label="Close selfi form" onClick={closeHandler}>
					<svg width="17" height="17" fill="none" focusable="false" aria-hidden="true">
						<use xlinkHref="#close" />
					</svg>
				</button>
				<h3 className="selfi__subtitle">Take selfie</h3>
				<p className="selfi__subtext">Drag and zoom image to crop</p>
				<input
					ref={fileInputRef}
					type="file"
					name="selfi"
					id="selfi"
					className="settings-selfi__input sr-only"
					onChange={fileHandler}
				/>
				<Cropper
					image={file ? file : ""}
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
				<fieldset className="selfi__fieldset">
					<button className="btn selfi__retake" type="button" onClick={retakeHandler}>
						Retake
					</button>
					<button className="btn selfi__save" type="submit">
						Save
					</button>
				</fieldset>
			</div>
		</form>
	);
};

export default SettingsSelfi;
