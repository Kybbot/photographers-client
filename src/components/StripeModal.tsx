import React from "react";

import { onTab } from "../utils/onTab";

type StripeModalProps = {
	active: boolean;
	closeModal: () => void;
	openCheckout: (openBtnRef: React.RefObject<HTMLButtonElement> | React.RefObject<HTMLInputElement>) => void;
	fetchIntent: () => Promise<void>;
};

export const StripeModal: React.FC<StripeModalProps> = ({ active, closeModal, openCheckout, fetchIntent }) => {
	const wrapperRef = React.useRef<HTMLDivElement>(null);
	const checkoutRef = React.useRef<HTMLButtonElement>(null);

	React.useEffect(() => {
		let handleModalKeyboard: (event: KeyboardEvent) => void;

		if (active) {
			if (wrapperRef.current) {
				const elems: NodeListOf<HTMLButtonElement & HTMLInputElement> =
					wrapperRef.current.querySelectorAll("button, input, a");
				const arrOfEllems = Array.from(elems);

				for (const elem of elems) {
					elem.style.display = "block";
				}

				handleModalKeyboard = onTab(wrapperRef, arrOfEllems, closeModal);

				document.addEventListener("keydown", handleModalKeyboard);
			}
		} else {
			if (wrapperRef.current) {
				const elems: NodeListOf<HTMLButtonElement & HTMLInputElement> =
					wrapperRef.current.querySelectorAll("button, input");

				for (const elem of elems) {
					elem.style.display = "none";
				}
			}
		}

		return () => document.removeEventListener("keydown", handleModalKeyboard);
	}, [active, closeModal]);

	React.useEffect(() => {
		if (active) {
			wrapperRef.current?.querySelector("button")?.focus();
		}
	}, [active]);

	const handeleCheckout = async () => {
		await fetchIntent();
		openCheckout(checkoutRef);
	};

	return (
		<div aria-hidden={!active} className={`stripeModal ${active ? "stripeModal--visible" : ""}`}>
			<div ref={wrapperRef} className="stripeModal__content" role="dialog" aria-modal="true" aria-label="Modal window">
				<form>
					<div className="stripeModal__header">
						<button type="button" className="stripeModal__close" aria-label="Close payment modal" onClick={closeModal}>
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
						<button type="button" className="btn stripeModal__apple">
							<img src="/pay.svg" alt="Apple pay" width={66} height={27} />
						</button>
						<button
							ref={checkoutRef}
							type="button"
							className="btn stripeModal__checkout"
							onClick={() => void handeleCheckout()}
						>
							Checkout
						</button>
						<button type="button" className="btn stripeModal__paypal">
							<img src="/paypal.svg" alt="PayPal" width={116} height={29} />
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
