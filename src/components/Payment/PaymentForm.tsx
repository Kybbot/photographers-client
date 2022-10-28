import React from "react";

type PaymentFormProps = {
	closeModal: () => void;
	openCheckout: (openBtnRef: React.RefObject<HTMLButtonElement> | React.RefObject<HTMLInputElement>) => void;
};

export const PaymentForm: React.FC<PaymentFormProps> = ({ closeModal, openCheckout }) => {
	const checkoutRef = React.useRef<HTMLButtonElement>(null);

	const handeleCheckout = () => {
		openCheckout(checkoutRef);
	};

	return (
		<form className="paymentForm__content">
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
			<fieldset className="paymentForm__fieldset">
				<label htmlFor="1" className="paymentForm__label">
					<input type="radio" name="price" id="1" className="paymentForm__radio" />
					<span>Current Photo</span>
					<b className="paymentForm__price">$1</b>
				</label>
				<label htmlFor="2" className="paymentForm__label">
					<input type="radio" name="price" id="2" className="paymentForm__radio" />
					<span>All 5 photos from Brooklyn Bridge</span>
					<b className="paymentForm__price">$5</b>
				</label>
			</fieldset>
			<div className="paymentForm__btns">
				<button
					ref={checkoutRef}
					type="button"
					className="btn paymentForm__checkout"
					onClick={() => void handeleCheckout()}
				>
					Checkout
				</button>
			</div>
		</form>
	);
};
