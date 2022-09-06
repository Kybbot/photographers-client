import React from "react";

type Size = {
	width: number | undefined;
	height: number | undefined;
};

type useWindowSizeType = () => Size;

export const useWindowSize: useWindowSizeType = () => {
	const [windowSize, setWindowSize] = React.useState<Size>({
		width: undefined,
		height: undefined,
	});

	React.useEffect(() => {
		function handleResize() {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		}

		window.addEventListener("resize", handleResize);

		handleResize();

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return windowSize;
};
