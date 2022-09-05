import React from "react";

type StripeModalProps = {
	active: boolean;
};

export const StripeModal: React.FC<StripeModalProps> = ({ active }) => {
	return (
		<div aria-hidden={!active} className={`stripeModal ${active ? "stripeModal--visible" : ""}`}>
			<div className="stripeModal__content" role="dialog" aria-modal="true" aria-label="Modal window">
				<form>
					<div className="stripeModal__header">
						<button className="stripeModal__close" aria-label="Close payment modal">
							<svg focusable="false" aria-hidden="true" width="17" height="17" fill="none">
								<use xlinkHref="#close" />
							</svg>
						</button>
						<h2 className="stripeModal__title">Unlock your photos</h2>
					</div>
					<div className="stripeModal__info">
						<p className="stripeModal__text">
							Get all the photos from <b>Brooklyn Bridge</b> in hi-resolution with no watermark.
						</p>
						<b className="stripeModal__price">$5</b>
					</div>
					<fieldset className="stripeModal__fieldset">
						<label htmlFor="1" className="stripeModal__label">
							<input type="radio" name="price" id="1" className="stripeModal__radio" />
							<span>Current Photo</span>
							<b className="stripeModal__price">$1</b>
						</label>
						<label htmlFor="2" className="stripeModal__label">
							<input type="radio" name="price" id="2" className="stripeModal__radio" />
							<span>All 5 photos from Brooklyn Bridge</span>
							<b className="stripeModal__price">$5</b>
						</label>
					</fieldset>
					<div className="stripeModal__btns">
						<button className="btn stripeModal__apple">
							<img src="/pay.svg" alt="Apple pay" width={66} height={27} />
						</button>
						<button className="btn stripeModal__checkout">Checkout</button>
						<button className="btn stripeModal__paypal">
							<img src="/paypal.svg" alt="PayPal" width={116} height={29} />
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
