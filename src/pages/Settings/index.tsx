import React, { ChangeEvent } from "react";
import { Link } from "react-router-dom";

import { Modal, SelfiForm, UploadOptions } from "../../components";

import { useModal } from "../../hooks/useModal";

import realAvatar from "../../assets/img/real-avatar.jpg";

const Settings: React.FC = () => {
	const [file, setFile] = React.useState<string | null>(realAvatar);
	const [stream, setStream] = React.useState<MediaStream | null>(null);

	const { isActive: isActive1, openModal: openModal1, closeModal: closeModal1 } = useModal();
	const { isActive: isActive2, openModal: openModal2, closeModal: closeModal2 } = useModal();

	const selfiBtnRef = React.useRef<HTMLButtonElement>(null);
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

	const closeSelfiForm = () => {
		cleanStream();
		closeModal1();
		if (!file) setFile(realAvatar);
	};

	const openCamera = async () => {
		setFile(null);
		const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
		setStream(stream);
		openModal1(selfiBtnRef);
		closeModal2();
	};

	return (
		<section className="settings-welcome">
			<Modal overlay={true} active={isActive1} closeModal={closeModal1}>
				<SelfiForm
					fileData={file}
					fileInputRef={fileInputRef}
					stream={stream}
					closeHandler={closeSelfiForm}
					openOptions={openModal2}
				/>
			</Modal>
			<Modal overlay={true} active={isActive2} closeModal={closeModal2}>
				<UploadOptions fileHandler={fileHandler} closeHandler={closeModal2} openCamera={openCamera} />
			</Modal>
			<h1 className="settigs__title">Welcome, Jane Smith.</h1>
			<h2 className="settings__subtitle">Your selfie</h2>
			<div className="settings__avatar">
				<img src={realAvatar} alt="avatar" className="settings__img" width={100} height={100} />
				<button
					ref={selfiBtnRef}
					type="button"
					className="settings__pencil"
					aria-label="Edit avatar"
					onClick={() => openModal1(selfiBtnRef)}
				>
					<img src="/pencil.svg" width={36.5} height={36.5} alt="pencil" aria-hidden="true" />
				</button>
				<input
					ref={fileInputRef}
					type="file"
					name="selfi"
					className="settings__file"
					capture="user"
					onChange={fileHandler}
					tabIndex={-1}
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
						<svg className="settings__svg" width="8" height="16" fill="none" focusable="false" aria-hidden="true">
							<use xlinkHref="#left-arrow" />
						</svg>
					</Link>
				</div>
			</div>
		</section>
	);
};

export default Settings;
