import React, { ChangeEvent } from "react";
import { Link } from "react-router-dom";

import { ModalOverlay, SelfiForm, UploadOptions } from "../../components";

import realAvatar from "../../assets/img/real-avatar.jpg";

const Settings: React.FC = () => {
	const [file, setFile] = React.useState<string | null>(realAvatar);
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
		}
	};

	const openSelfiForm = () => {
		setForm(true);
	};

	const closeSelfiForm = () => {
		cleanStream();
		setForm(false);
		if (!file) setFile(realAvatar);
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
		<section className="settings">
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
			<h1 className="settigs__title">Welcome, Jane Smith.</h1>
			<h2 className="settings__subtitle">Your selfie</h2>
			<div className="settings__avatar">
				<img src={realAvatar} alt="avatar" className="settings__img" width={100} height={100} />
				<button type="button" className="settings__pencil" aria-label="Edit avatar" onClick={openSelfiForm}>
					<svg width="16" height="22" fill="none" focusable="false" aria-hidden="true">
						<use xlinkHref="#pencil" />
					</svg>
				</button>
				<input
					ref={fileInputRef}
					type="file"
					name="selfi"
					className="settings__file"
					capture="user"
					onChange={fileHandler}
					aria-hidden="true"
				/>
			</div>
			<div className="settings__element">
				<div className="settings__wrapper">
					<h3 className="settings__name">Your name</h3>
					<p className="settings__text">Tell us your name to personalize communications.</p>
				</div>
				<div className="settings__arrow">
					<Link to="/settings/name" className="settings__link" aria-label="Change your name">
						<svg className="settings__svg" width="8" height="17" fill="none" focusable="false" aria-hidden="true">
							<use xlinkHref="#left-arrow" />
						</svg>
					</Link>
				</div>
			</div>
			<div className="settings__element">
				<div className="settings__wrapper">
					<h3 className="settings__name">Account settings</h3>
					<p className="settings__text">Update your phone and email.</p>
				</div>
				<div className="settings__arrow">
					<Link to="/settings/account" className="settings__link" aria-label="Change your name">
						<svg className="settings__svg" width="8" height="17" fill="none" focusable="false" aria-hidden="true">
							<use xlinkHref="#left-arrow" />
						</svg>
					</Link>
				</div>
			</div>
			<div className="settings__element">
				<div className="settings__wrapper">
					<h3 className="settings__name">Notification settings</h3>
					<p className="settings__text">How should we contact you?</p>
				</div>
				<div className="settings__arrow">
					<Link to="/settings/notifications" className="settings__link" aria-label="Change your name">
						<svg className="settings__svg" width="8" height="17" fill="none" focusable="false" aria-hidden="true">
							<use xlinkHref="#left-arrow" />
						</svg>
					</Link>
				</div>
			</div>
		</section>
	);
};

export default Settings;
