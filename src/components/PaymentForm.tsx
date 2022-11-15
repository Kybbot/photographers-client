import React, { FC, FormEvent, memo, useEffect, useState } from "react";

import { useAuthFetch } from "../hooks/useAuthFetch";

import { AlbumType, StripeResponse } from "../@types/api";

type PaymentFormProps = {
	albumData: AlbumType;
	closeModal: () => void;
};

export const PaymentForm: FC<PaymentFormProps> = memo(({ albumData, closeModal }) => {
	const { loading, error, request } = useAuthFetch();

	const [album, setAlbum] = useState(albumData);

	const formHandler = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const body = JSON.stringify({
			album_id: album.id,
		});

		const result = await request<StripeResponse>("/create-checkout-session", "POST", body);

		if (result?.success) {
			localStorage.setItem(
				"AlbumData",
				JSON.stringify({
					albumId: albumData.id,
					albumName: albumData.album_name,
					albumPhoto: albumData.album_logo,
				})
			);
			window.location.href = result.data.url;
		}
	};

	useEffect(() => {
		setAlbum(albumData);
	}, [albumData]);

	return (
		<form
			className="paymentForm__content"
			onSubmit={(event) => {
				void formHandler(event);
			}}
		>
			<div className="paymentForm__header">
				<button type="button" className="paymentForm__close" aria-label="Close payment modal" onClick={closeModal}>
					<svg focusable="false" aria-hidden="true" width="17" height="17" fill="none">
						<use xlinkHref="#close" />
					</svg>
				</button>
				<h2 className="paymentForm__title">Unlock your photos</h2>
			</div>
			<div className="paymentForm__info">
				<p className="paymentForm__text">
					Get all the photos from <b>{album.album_name}</b> in hi-resolution with no watermark.
				</p>
				<b className="paymentForm__price">$5</b>
			</div>
			<div className="paymentForm__btns">
				<button type="submit" className="btn paymentForm__checkout">
					Checkout {loading && <span className="spinner"></span>}
				</button>
			</div>
			{error && <p className="error">{error}</p>}
		</form>
	);
});
