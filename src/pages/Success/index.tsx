import React from "react";
import { useNavigate } from "react-router-dom";

import successImg from "../../assets/img/success.jpg";

const Success: React.FC = () => {
	const navigate = useNavigate();

	const btnHandler = () => {
		navigate("/album/1");
	};

	return (
		<div className="success">
			<header className="header">
				<div className="header__container">
					<img className="header__logo" src="/logo.svg" alt="PhotoDrop" width={125} height={17} />
				</div>
			</header>
			<main className="main">
				<div className="container__settings h-100">
					<h2 className="success__title">Thank you</h2>
					<p className="success__text">
						The album <b>Brooklyn Bridge</b> is now unlocked.
					</p>
					<p className="success__text">
						You can now download, share, post, and print your hi-res, watermark-free, glorious memories.
					</p>
					<img className="success__img" src={successImg} alt="" />
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
