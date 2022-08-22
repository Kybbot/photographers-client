import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { ScrollToTop } from "./components/ScrollToTop";

import "react-phone-input-2/lib/style.css";
import "swiper/css";
import "./assets/css/index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<ScrollToTop />
			<App />
		</BrowserRouter>
	</React.StrictMode>
);
