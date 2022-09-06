import React from "react";

type ModalOverlayProps = {
	active: boolean;
	children: React.ReactNode;
};

export const ModalOverlay: React.FC<ModalOverlayProps> = ({ active, children }) => {
	return (
		<div
			aria-hidden={!active}
			className={`modal ${active ? "modal--visible" : ""}`}
			role="dialog"
			aria-modal="true"
			aria-label="Modal window"
		>
			{children}
		</div>
	);
};
