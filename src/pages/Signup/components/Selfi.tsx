import React, { ChangeEvent } from "react";

import { ModalOverlay, SelfiForm, UploadOptions } from "../../../components";

export const Selfi: React.FC = () => {
	const [file, setFile] = React.useState<string | null>(null);
	const [stream, setStream] = React.useState<MediaStream | null>(null);
	const [form, setForm] = React.useState(false);
	const [options, setOptions] = React.useState(false);

	const fileInputRef = React.useRef<HTMLInputElement>(null);

	const cleanStream = () => {
		if (stream) {
			const tracks = stream.getTracks();

			tracks.forEach((track) => {
				track.stop();
			});

			setStream(null);
		}
	};

	const fileHandler = (event: ChangeEvent<HTMLInputElement>) => {
		cleanStream();

		if (event.target.files) {
			const file = event.target.files[0];

			setFile(URL.createObjectURL(file));
			setForm(true);
		}
	};

	const closeSelfiForm = () => {
		cleanStream();

		setFile(null);
		setForm(false);
	};

	const openOptions = () => {
		setOptions(true);
	};

	const closeOptions = () => {
		setOptions(false);
	};

	const openCamera = async () => {
		setFile(null);
		const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
		setStream(stream);
		setForm(true);
		closeOptions();
	};

	return (
		<>
			<h2 className="selfi__title">Add a selfie</h2>
			<p className="selfi__text">A selfie allows your photos to be synced with your account.</p>
			<div className="selfi__wrapper">
				<img
					aria-hidden="true"
					src="/avatar.png"
					alt="avatar placeholder"
					className="selfi__avatar"
					width={181}
					height={181}
				/>
				<div className="selfi__picker">
					<input
						ref={fileInputRef}
						type="file"
						name="selfi"
						id="selfi"
						className="selfi__btn"
						capture="user"
						onChange={fileHandler}
					/>
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
				<button type="button" className="selfi__open" aria-label="Add a selfie" onClick={openOptions}>
					<svg focusable="false" aria-hidden="true" width="24" height="24" fill="none" stroke="#ffffff" strokeWidth="2">
						<use xlinkHref="#plus" />
					</svg>
				</button>
			</div>
			<ModalOverlay active={form}>
				<SelfiForm
					fileData={file}
					fileInputRef={fileInputRef}
					stream={stream}
					closeHandler={closeSelfiForm}
					openOptions={openOptions}
				/>
			</ModalOverlay>
			<ModalOverlay active={options}>
				<UploadOptions fileHandler={fileHandler} closeHandler={closeOptions} openCamera={openCamera} />
			</ModalOverlay>
		</>
	);
};
