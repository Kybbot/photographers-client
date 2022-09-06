export const onTab = (
	wrapper: React.RefObject<HTMLDivElement>,
	allEllements: (HTMLButtonElement & HTMLInputElement)[],
	closeModal: () => void
) => {
	const block = wrapper;
	const elements = allEllements;

	return function (event: KeyboardEvent) {
		if (event.key === "Escape") {
			closeModal();
		}

		if (event.key === "Tab") {
			event.preventDefault();

			let index = elements.findIndex((f) => f === block.current?.querySelector(":focus"));

			if (event.shiftKey === true) {
				index--;
			} else {
				index++;
			}
			if (index >= elements.length) {
				index = 0;
			}
			if (index < 0) {
				index = elements.length - 1;
			}

			elements[index].focus();
		}
	};
};
