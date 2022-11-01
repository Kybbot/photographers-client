import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import App from "./App";
import { ScrollToTop } from "./components/ScrollToTop";

import "swiper/css";
import "./assets/css/index.css";

type responseType = {
	client_secret: string;
};

const vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);

const queryClient = new QueryClient();

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
				<QueryClientProvider client={queryClient}>
					<ReactQueryDevtools initialIsOpen={false} />
					<ScrollToTop />
					<Elements options={options} stripe={stripePromise}>
						<App />
					</Elements>
				</QueryClientProvider>
			</BrowserRouter>
		</React.StrictMode>
	);
})();
