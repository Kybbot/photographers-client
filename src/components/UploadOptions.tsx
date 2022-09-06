import React, { ChangeEvent } from "react";

type UploadOptionsProps = {
	closeHandler: () => void;
	fileHandler: (event: ChangeEvent<HTMLInputElement>) => void;
	openCamera: () => Promise<void>;
};

export const UploadOptions: React.FC<UploadOptionsProps> = ({ fileHandler, closeHandler, openCamera }) => {
	const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		fileHandler(event);
		closeHandler();
	};

	return (
		<form className="upload-options__form" encType="multipart/form-data">
			<div className="upload-options__container">
				<button className="upload-options__close" type="button" aria-label="Close selfi form" onClick={closeHandler}>
					<svg width="17" height="17" fill="none" focusable="false" aria-hidden="true">
						<use xlinkHref="#close" />
					</svg>
				</button>
				<h3 className=" upload-options__title">Upload options</h3>
				<label htmlFor="file" className="btn btn--blue upload-options__btn">
					<input className="upload-options__input" type="file" name="file" id="file" onChange={onFileChange} /> Upload a
					file
				</label>
				<button
					type="button"
					className="btn btn--blue upload-options__btn"
					onClick={() => {
						void openCamera();
					}}
				>
					Use camera
				</button>
			</div>
		</form>
	);
};
