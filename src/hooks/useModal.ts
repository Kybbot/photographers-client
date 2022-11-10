import { RefObject, useCallback, useState } from "react";

type useModalProps = () => {
	isActive: boolean;
	openModal: (openBtnRef: RefObject<HTMLButtonElement> | RefObject<HTMLInputElement>) => void;
	closeModal: () => void;
};

export const useModal: useModalProps = () => {
	const [isActive, setActive] = useState(false);
	const [openBtn, setOpenBtn] = useState<RefObject<HTMLButtonElement> | RefObject<HTMLInputElement>>();

	const openModal = useCallback((openBtnRef: RefObject<HTMLButtonElement> | RefObject<HTMLInputElement>) => {
		document.body.style.overflow = "hidden";
		setOpenBtn(openBtnRef);
		setActive(true);
	}, []);

	const closeModal = useCallback(() => {
		document.body.style.overflow = "initial";
		if (openBtn) {
			openBtn.current?.focus();
		}
		setActive(false);
	}, [openBtn]);

	return { isActive, openModal, closeModal };
};
