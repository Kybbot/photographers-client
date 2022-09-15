import React from "react";

type StripeCheckoutProps = {
	closeModal: () => void;
};

export const StripeError: React.FC<StripeCheckoutProps> = ({ closeModal }) => {
	return (
		<div className="stripeCheckout">
			<div className="stripeCheckout__container">
				<button className="stripeCheckout__close" type="button" aria-label="Close selfi form" onClick={closeModal}>
					<svg width="17" height="17" fill="none" focusable="false" aria-hidden="true">
						<use xlinkHref="#close" />
					</svg>
				</button>
				<h2 className="stripeCheckout__title">Error with stripe</h2>
			</div>
		</div>
	);
};
