import React from "react";

import { onTab } from "../utils/onTab";

type ModalOverlayProps = {
	active: boolean;
	children: React.ReactNode;
	closeModal: () => void;
};

export const ModalOverlay: React.FC<ModalOverlayProps> = ({ active, children, closeModal }) => {
	const wrapperRef = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		let handleModalKeyboard: (event: KeyboardEvent) => void;

		if (active) {
			if (wrapperRef.current) {
				const elems: NodeListOf<HTMLButtonElement & HTMLInputElement> =
					wrapperRef.current.querySelectorAll("button, input");
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

	return (
		<div
			aria-hidden={!active}
			className={`modal ${active ? "modal--visible" : ""}`}
			role="dialog"
			aria-modal="true"
			aria-label="Modal window"
		>
			<div className="modal__wrapper" ref={wrapperRef}>
				{children}
			</div>
		</div>
	);
};
