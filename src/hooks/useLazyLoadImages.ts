import { RefObject, useEffect } from "react";

export const useLazyLoadImages = (imgsWrapper: RefObject<HTMLDivElement>, ...dependencies: unknown[]) => {
	useEffect(() => {
		const obserOptions = {
			root: null,
			rootMargin: "0px",
			threshols: 0.7,
		};

		const observerCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const dataSrc = entry.target.children.item(0)?.getAttribute("data-src");
					if (entry.target.children.item(0)?.getAttribute("src") !== dataSrc && dataSrc) {
						entry.target.children.item(0)?.setAttribute("src", dataSrc);
						observer.unobserve(entry.target);
					}
				}
			});
		};

		const div = imgsWrapper.current;

		const observer = new IntersectionObserver(observerCallback, obserOptions);

		if (div) {
			Array.from(div.children).forEach((item) => observer.observe(item));
		}

		return () => {
			if (div) {
				Array.from(div.children).forEach((item) => observer.unobserve(item));
			}
		};
	}, [imgsWrapper, dependencies]);
};
