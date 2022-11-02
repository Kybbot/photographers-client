import React, { FC, FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { OTP } from "./components/OTP";

import { useFetch } from "../../hooks/useFetch";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getUserPhone, setLoggedIn } from "../../redux/reducers/authSlice";

import { verifyResponse } from "../../@types/api";

const Verify: FC = () => {
	const [otp, setOtp] = useState<string>("");
	const [isDisabled, setDisabled] = useState(false);
	const [otpValues, setOTPValues] = useState(Array<string>(6).fill(""));

	const navigate = useNavigate();

	const dispatch = useAppDispatch();
	const userPhone = useAppSelector(getUserPhone);

	const { loading, error, request } = useFetch();

	const formHandler = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const body = JSON.stringify({
			phone_number: "+" + userPhone,
			code: otp,
		});

		const response = await request<verifyResponse>("/verify", "POST", body);

		if (response?.success) {
			localStorage.setItem("PHOTODROP_TOKEN", response.data.token.accessToken);
			dispatch(setLoggedIn(true));
			if (!response.data.user.selfie_image.length) {
				navigate("/initial-selfi");
			} else {
				navigate("/");
			}
		}
	};

	const resendHendler = async () => {
		const body = JSON.stringify({
			phone_number: "+" + userPhone,
		});

		const response = await request<{ message: string }>("/login", "POST", body);

		if (response?.success) {
			setOTPValues(Array<string>(6).fill(""));
			setDisabled(true);
		}
	};

	useEffect(() => {
		if (!userPhone.length) {
			navigate("/");
		}
	}, [userPhone, navigate]);

	return (
		<div className="signup">
			<header className="header">
				<div className="header__container">
					<Link to="/" className="header__btn header__btn--visible" aria-label="Go back">
						<svg width="8" height="17" fill="none" focusable="false" aria-hidden="true">
							<use xlinkHref="#left-arrow" />
						</svg>
					</Link>
					<img className="header__logo" src="/logo.svg" alt="PhotoDrop" width={125} height={16} />
				</div>
			</header>
			<main className="main">
				<div className="signup__wrapper">
					<div className="container__settings">
						<div className="otp">
							<h2 className="otp__title">What’s the code?</h2>
							<p className="otp__text">
								Enter the code sent to <span className="otp__bold">+{userPhone}</span>
							</p>
							<form
								onSubmit={(event) => {
									void formHandler(event);
								}}
							>
								<div className="otp__code">
									<OTP
										isNumberInput
										length={6}
										otpValues={otpValues}
										setOTPValues={setOTPValues}
										onChangeOTP={(otp) => setOtp(otp)}
									/>
								</div>
								<button
									type="button"
									className="otp__resend"
									onClick={() => {
										void resendHendler();
									}}
									disabled={isDisabled}
								>
									Resend code
								</button>
								<button type="submit" className="btn" disabled={otp?.length !== 6 || loading}>
									Next {loading && <span className="spinner"></span>}
								</button>
								{error && <p className="error">{error}</p>}
							</form>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Verify;
