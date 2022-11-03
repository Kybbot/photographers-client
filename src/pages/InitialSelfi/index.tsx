import React, { ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Modal, SelfiForm, UploadOptions } from "../../components";

import { useModal } from "../../hooks/useModal";
import { useAuthFetch } from "../../hooks/useAuthFetch";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { changeUserSelfie } from "../../redux/reducers/userSlice";

import { SelfiResponse } from "../../@types/api";

const InitialSelfi: React.FC = () => {
	const [file, setFile] = React.useState<string | null>(null);
	const [stream, setStream] = React.useState<MediaStream | null>(null);

	const navigate = useNavigate();

	const { width } = useWindowSize();

	const dispatch = useAppDispatch();

	const { loading, error, request } = useAuthFetch();

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
		setFile(null);
		closeModal1();
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
			dispatch(changeUserSelfie(result.data.selfie_url));
			navigate("/");
		}
		closeSelfiForm();
	};

	return (
		<div className="signup">
			<header className="header">
				<div className="header__container">
					<Link className="header__link" to="/">
						<img className="header__logo" src="/logo.svg" alt="PhotoDrop" width={125} height={16} />
					</Link>
				</div>
			</header>
			<main className="main">
				<div className="signup__wrapper">
					<div className="container__settings">
						<div className="selfi">
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
									<svg
										focusable="false"
										aria-hidden="true"
										width="42"
										height="42"
										fill="none"
										stroke="#ffffff"
										strokeWidth="2"
									>
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
							{error && <p className="error">{error}</p>}
							<Modal overlay={true} active={isActive1} closeModal={closeModal1}>
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
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default InitialSelfi;
