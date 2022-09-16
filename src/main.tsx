import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import App from "./App";
import { ScrollToTop } from "./components/ScrollToTop";

import "react-phone-input-2/lib/style.css";
import "swiper/css";
import "./assets/css/index.css";

type responseType = {
	client_secret: string;
};

void (async () => {
	const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY, {
		locale: "en",
	});

	const response = await fetch(`${import.meta.env.VITE_SERVER_ENDPOINT}/create-payment-intent`);
	const data = (await response.json()) as responseType;

	const options = {
		clientSecret: data.client_secret,
		appearance: {},
	};

	ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
		<React.StrictMode>
			<BrowserRouter>
				<ScrollToTop />
				<Elements options={options} stripe={stripePromise}>
					<App />
				</Elements>
			</BrowserRouter>
		</React.StrictMode>
	);
})();
