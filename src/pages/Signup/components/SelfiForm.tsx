import React, { ChangeEvent, FormEvent } from "react";
import Cropper, { Area } from "react-easy-crop";

export const SelfiForm: React.FC = () => {
	const [file, setFile] = React.useState<string | null>(null);
	const [form, setForm] = React.useState(false);
	const [crop, setCrop] = React.useState({ x: 0, y: 0 });
	const [zoom, setZoom] = React.useState(1);
	const [minZoom, setMinZoom] = React.useState(1);

	const fileInputRef = React.useRef<HTMLInputElement>(null);

	const fileHandler = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const file = event.target.files[0];

			setFile(URL.createObjectURL(file));
			setForm(true);
		}
	};

	const onCropComplete = React.useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
		console.log(croppedArea, croppedAreaPixels);
	}, []);

	const closeHandler = () => {
		setFile(null);
		setForm(false);
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
		<>
			<h2 className="selfi__title">Add a selfie</h2>
			<p className="selfi__text">A selfie allows your photos to be synced with your account.</p>
			<div className="selfi__wrapper">
				<img aria-hidden="true" src="/avatar.png" alt="avatar placeholder" className="selfi__avatar" />
				<div className="selfi__picker">
					<input ref={fileInputRef} type="file" name="selfi" id="selfi" className="selfi__btn" onChange={fileHandler} />
					<label htmlFor="selfi" className="selfi__label" aria-label="Add a selfie">
						<svg
							focusable="false"
							aria-hidden="true"
							width="24"
							height="24"
							fill="none"
							stroke="#ffffff"
							strokeWidth="2"
						>
							<use xlinkHref="#plus" />
						</svg>
					</label>
				</div>
			</div>
			<form className={`selfi__form  ${form ? "selfi__form--visible" : ""}`} onSubmit={formHandler}>
				<div className="container">
					<div className="selfi__container">
						<button className="selfi__close" type="button" aria-label="Close selfi form" onClick={closeHandler}>
							<svg width="17" height="17" fill="none" focusable="false" aria-hidden="true">
								<use xlinkHref="#close" />
							</svg>
						</button>
						<h3 className="selfi__subtitle">Take selfie</h3>
						<p className="selfi__subtext">Drag and zoom image to crop</p>
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
				</div>
			</form>
		</>
	);
};
