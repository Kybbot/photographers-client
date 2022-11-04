import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "./redux/store";
import App from "./App";
import { ScrollToTop } from "./components/ScrollToTop";

import "swiper/css";
import "./assets/css/index.css";

const vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<>
		<BrowserRouter>
			<Provider store={store}>
				<ScrollToTop />
				<App />
			</Provider>
		</BrowserRouter>
	</>
);
