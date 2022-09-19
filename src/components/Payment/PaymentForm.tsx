import React from "react";
import { useStripe, useElements, PaymentRequestButtonElement } from "@stripe/react-stripe-js";

import PayPalButton from "./PayPalButton";

type PaymentFormProps = {
	closeModal: () => void;
	openCheckout: (openBtnRef: React.RefObject<HTMLButtonElement> | React.RefObject<HTMLInputElement>) => void;
};

type responseType = {
	client_secret: string;
};

export const PaymentForm: React.FC<PaymentFormProps> = ({ closeModal, openCheckout }) => {
	const stripe = useStripe();
	const elements = useElements();

	const [paymentRequest, setPaymentRequest] = React.useState();

	const checkoutRef = React.useRef<HTMLButtonElement>(null);

	const handeleCheckout = () => {
		openCheckout(checkoutRef);
	};

	React.useEffect(() => {
		void (async () => {
			if (!stripe || !elements) {
				return;
			}

			let clientSecret = "";

			const fetchIntent = async () => {
				const response = await fetch(`${import.meta.env.VITE_SERVER_ENDPOINT}/create-payment-intent`);
				const data = (await response.json()) as responseType;
				clientSecret = data.client_secret;
			};

			await fetchIntent();

			if (!clientSecret) {
				return;
			}

			const pr = stripe.paymentRequest({
				country: "US",
				currency: "usd",
				total: {
					label: "Demo total",
					amount: 1099,
				},
				requestPayerName: true,
				requestPayerEmail: true,
			});

			await pr.canMakePayment().then((result) => {
				if (result) {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					//@ts-ignore
					setPaymentRequest(pr);
				}
			});

			pr.on("paymentmethod", async (event) => {
				const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
					clientSecret,
					{ payment_method: event.paymentMethod.id },
					{ handleActions: false }
				);

				if (confirmError) {
					event.complete("fail");
				} else {
					event.complete("success");
					if (paymentIntent.status === "requires_action") {
						await stripe.confirmCardPayment(clientSecret);
					}
				}
			});
		})();
	}, [stripe, elements]);

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
				{paymentRequest && <PaymentRequestButtonElement className="paymentForm__apple" options={{ paymentRequest }} />}
				<button
					ref={checkoutRef}
					type="button"
					className="btn paymentForm__checkout"
					onClick={() => void handeleCheckout()}
				>
					Checkout
				</button>
				<PayPalButton />
			</div>
		</form>
	);
};
