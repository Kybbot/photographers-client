import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { Modal, SelfiForm, UploadOptions } from "../../components";

import { useModal } from "../../hooks/useModal";
import { useAuthFetch } from "../../hooks/useAuthFetch";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { changeUserSelfie, getUserData } from "../../redux/reducers/userSlice";

import { SelfiResponse } from "../../@types/api";

const Settings: FC = () => {
	const userData = useAppSelector(getUserData);
	const dispatch = useAppDispatch();

	const [file, setFile] = useState<string | null>(null);
	const [stream, setStream] = useState<MediaStream | null>(null);

	const { width } = useWindowSize();

	const { loading, error, request } = useAuthFetch();

	const { isActive: isActive1, openModal: openModal1, closeModal: closeModal1 } = useModal();
	const { isActive: isActive2, openModal: openModal2, closeModal: closeModal2 } = useModal();

	const selfiBtnRef = useRef<HTMLButtonElement>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

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
			openModal1(selfiBtnRef);
		}
	};

	const openSelfiForm = () => {
		if (width && width < 1024) {
			openModal1(selfiBtnRef);
			fileInputRef.current?.click();
		} else {
			openModal2(selfiBtnRef);
		}
	};

	const closeSelfiForm = () => {
		cleanStream();
		closeModal1();
		if (userData) {
			setFile(userData.selfie_image);
		}
	};

	const openCamera = async () => {
		setFile(null);
		const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
		setStream(stream);
		openModal1(selfiBtnRef);
		closeModal2();
	};

	const uploadSelfi = async (img: Blob) => {
		const formData = new FormData();
		formData.append("Content-Type", "multipart/form-data");
		formData.append("file", img, "selfi.jpeg");

		const result = await request<SelfiResponse>("/selfie", "POST", formData, {}, true);

		if (result?.success) {
			dispatch(changeUserSelfie(URL.createObjectURL(img)));
		}
		closeSelfiForm();
	};

	useEffect(() => {
		if (userData) {
			setFile(userData.selfie_image);
		}
	}, [userData]);

	return (
		<section className="settings-welcome">
			<Modal overlay={true} active={isActive1} closeModal={closeModal1} displayType="flex">
				<SelfiForm
					fileData={file}
					fileInputRef={fileInputRef}
					stream={stream}
					documentWidth={width}
					loading={loading}
					closeHandler={closeSelfiForm}
					openOptions={openModal2}
					uploadSelfi={uploadSelfi}
				/>
			</Modal>
			<Modal overlay={true} active={isActive2} closeModal={closeModal2}>
				<UploadOptions fileHandler={fileHandler} closeHandler={closeModal2} openCamera={openCamera} />
			</Modal>
			<h1 className="settigs__title">
				Welcome{userData && !!userData.client_name.length && `, ${userData.client_name}`}.
			</h1>
			<h2 className="settings__subtitle">Your selfie</h2>
			<div className="settings__avatar">
				<img src={file ? file : "/avatar.png"} alt="Selfi" className="settings__img" width={100} height={100} />
				<button
					ref={selfiBtnRef}
					type="button"
					className="settings__pencil"
					aria-label="Edit avatar"
					onClick={openSelfiForm}
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
			{error && <p className="error">{error}</p>}
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
