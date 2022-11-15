import React, { FC, useLayoutEffect, useRef } from "react";

import { usePrevious } from "../../../hooks/usePrevious";

export interface OTPInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	focus?: boolean;
}

export const OTPInput: FC<OTPInputProps> = ({ focus, ...rest }) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const prevFocus = usePrevious(!!focus);

	useLayoutEffect(() => {
		if (inputRef.current) {
			if (focus) {
				inputRef.current.focus();
			}
			if (focus && focus !== prevFocus) {
				inputRef.current.focus();
				inputRef.current.select();
			}
		}
	}, [focus, prevFocus]);

	return <input ref={inputRef} {...rest} />;
};
