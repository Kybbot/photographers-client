import React from "react";

type useModalProps = () => {
	isActive: boolean;
	openModal: (openBtnRef: React.RefObject<HTMLButtonElement> | React.RefObject<HTMLInputElement>) => void;
	closeModal: () => void;
};

export const useModal: useModalProps = () => {
	const [isActive, setActive] = React.useState(false);
	const [openBtn, setOpenBtn] = React.useState<
		React.RefObject<HTMLButtonElement> | React.RefObject<HTMLInputElement>
	>();

	const openModal = React.useCallback(
		(openBtnRef: React.RefObject<HTMLButtonElement> | React.RefObject<HTMLInputElement>) => {
			document.body.style.overflow = "hidden";
			setOpenBtn(openBtnRef);
			setActive(true);
		},
		[]
	);

	const closeModal = React.useCallback(() => {
		document.body.style.overflow = "initial";
		if (openBtn) {
			openBtn.current?.focus();
		}
		setActive(false);
	}, [openBtn]);

	return { isActive, openModal, closeModal };
};
