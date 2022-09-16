import React, { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

import { Modal, SelfiForm, UploadOptions } from "../../../components";

import { useModal } from "../../../hooks/useModal";

export const Selfi: React.FC = () => {
	const [file, setFile] = React.useState<string | null>(null);
	const [stream, setStream] = React.useState<MediaStream | null>(null);

	const navigate = useNavigate();

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

			openModal1(selfiBtnRef);
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
		fileInputRef.current?.click();
		openModal1(selfiBtnRef);
	};

	const closeSelfiForm = () => {
		cleanStream();
		setFile(null);
		closeModal1();
		navigate("/");
	};

	const openCamera = async () => {
		setFile(null);
		const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
		setStream(stream);
		openModal1(selfiBtnRef);
		closeModal2();
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
				<button
					ref={selfiBtnRef}
					type="button"
					className="selfi__open"
					aria-label="Add a selfie"
					onClick={openSelfiForm}
				>
					<svg focusable="false" aria-hidden="true" width="24" height="24" fill="none" stroke="#ffffff" strokeWidth="2">
						<use xlinkHref="#plus" />
					</svg>
				</button>
				<input
					ref={fileInputRef}
					tabIndex={-1}
					type="file"
					name="selfi"
					id="selfi"
					className="selfi__btn"
					capture="user"
					onChange={fileHandler}
				/>
			</div>
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
		</>
	);
};
