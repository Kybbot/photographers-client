import React from "react";

import { usePrevious } from "../../../hooks/usePrevious";

export interface OTPInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	focus?: boolean;
}

export const OTPInput: React.FC<OTPInputProps> = React.memo(({ focus, ...rest }) => {
	const inputRef = React.useRef<HTMLInputElement>(null);
	const prevFocus = usePrevious(!!focus);

	React.useLayoutEffect(() => {
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
});
