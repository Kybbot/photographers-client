import React, { FormEvent } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

type StripeCheckoutProps = {
	closeModal: () => void;
};

export const StripeCheckout: React.FC<StripeCheckoutProps> = ({ closeModal }) => {
	const stripe = useStripe();
	const elements = useElements();

	const [message, setMessage] = React.useState<string | null>(null);
	const [isLoading, setIsLoading] = React.useState(false);

	React.useEffect(() => {
		if (!stripe) {
			return;
		}

		const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");

		if (!clientSecret) {
			return;
		}

		void stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
			switch (paymentIntent?.status) {
				case "succeeded":
					setMessage("Payment succeeded!");
					break;
				case "processing":
					setMessage("Your payment is processing.");
					break;
				case "requires_payment_method":
					setMessage("Your payment was not successful, please try again.");
					break;
				default:
					setMessage("Something went wrong.");
					break;
			}
		});
	}, [stripe]);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		setIsLoading(true);

		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: "http://localhost:5173/success",
			},
		});

		if (error.type === "card_error" || error.type === "validation_error") {
			setMessage(error.message ? error.message : "An unexpected error occurred.");
		} else {
			setMessage("An unexpected error occurred.");
		}

		setIsLoading(false);
	};

	return (
		<form
			className="stripeCheckout"
			onSubmit={(event) => {
				void handleSubmit(event);
			}}
		>
			<div className="stripeCheckout__container">
				<button className="stripeCheckout__close" type="button" aria-label="Close selfi form" onClick={closeModal}>
					<svg width="17" height="17" fill="none" focusable="false" aria-hidden="true">
						<use xlinkHref="#close" />
					</svg>
				</button>
				<h2 className="stripeCheckout__title">Pay with card</h2>
				<PaymentElement />
				<button className="btn stripeCheckout__btn" disabled={isLoading || !stripe || !elements}>
					{isLoading ? "Loading" : "Pay"}
				</button>
				{message && <p className="stripeCheckout__message">{message}</p>}
			</div>
		</form>
	);
};