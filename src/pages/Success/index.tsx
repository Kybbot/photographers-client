import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAppSelector } from "../../hooks/reduxHooks";
import { getUserData } from "../../redux/reducers/userSlice";

const Success: FC = () => {
	const navigate = useNavigate();

	const userData = useAppSelector(getUserData);

	const albumData = JSON.parse(localStorage.getItem("AlbumData") || "") as {
		albumId: number;
		albumName: string;
		albumPhoto: string;
	};

	const btnHandler = () => {
		navigate(`/album/${albumData.albumId}`);
	};

	return (
		<div className="success">
			<header className="header">
				<div className="header__container">
					<Link className="header__link" to="/">
						<img className="header__logo" src="/logo.svg" alt="PhotoDrop" width={125} height={16} />
					</Link>
					<Link to="/settings" className="header__avatar terms__avatar" aria-label="Settings">
						<img
							src={userData ? userData.selfie_image : "/avatar.png"}
							alt="avatar"
							aria-hidden="true"
							className="header__img"
							width={35}
							height={35}
						/>
					</Link>
				</div>
			</header>
			<main className="main">
				<div className="container__settings h-100">
					<h2 className="success__title">Thank you</h2>
					<p className="success__text">
						The album <b>{albumData.albumName}</b> is now unlocked.
					</p>
					<p className="success__text">
						You can now download, share, post, and print your hi-res, watermark-free, glorious memories.
					</p>
					<img className="success__img" src={albumData.albumPhoto} alt="Album" />
					<button type="button" className="btn" onClick={btnHandler}>
						See photos
					</button>
					<p className="success__text">You will receive an email with your order details.</p>
				</div>
			</main>
		</div>
	);
};

export default Success;
