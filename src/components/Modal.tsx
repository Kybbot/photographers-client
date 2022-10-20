import React from "react";

import { onTab } from "../utils/onTab";

type ModalProps = {
	overlay: boolean;
	active: boolean;
	children: React.ReactNode;
	displayType?: "block" | "flex";
	closeModal: () => void;
};

export const Modal: React.FC<ModalProps> = ({ overlay, active, children, displayType, closeModal }) => {
	const wrapperRef = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		let handleModalKeyboard: (event: KeyboardEvent) => void;

		if (active) {
			if (wrapperRef.current) {
				const elems: NodeListOf<HTMLButtonElement & HTMLInputElement> =
					wrapperRef.current.querySelectorAll("button, input, a");
				const arrOfEllems = Array.from(elems);

				for (const elem of elems) {
					elem.style.display = displayType ? displayType : "block";
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
	}, [active, closeModal, displayType]);

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
			{overlay ? <div className="modal__overlay"></div> : null}
			<div className="modal__wrapper" ref={wrapperRef}>
				{children}
			</div>
		</div>
	);
};
