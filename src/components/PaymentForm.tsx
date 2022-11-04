import React, { FormEvent } from "react";
import { useAuthFetch } from "../hooks/useAuthFetch";

type PaymentFormProps = {
	closeModal: () => void;
};

export const PaymentForm: React.FC<PaymentFormProps> = ({ closeModal }) => {
	const { loading, error, request } = useAuthFetch();

	const formHandler = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const result = await request<{ url: string }>("/create-checkout-session", "POST");
		console.log(result);

		// if (result?.success) {
		// 	setAlbumData(result.data);
		// }
	};

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
					Get all the photos from <b>Brooklyn Bridge</b> in hi-resolution with no watermark.
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
};
