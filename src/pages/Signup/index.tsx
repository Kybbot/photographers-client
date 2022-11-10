import React, { FC, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Modal, PhoneNumber, PhoneNumberSelect } from "../../components";

import { useModal } from "../../hooks/useModal";
import { useFetch } from "../../hooks/useFetch";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { setUserPhone } from "../../redux/reducers/authSlice";

import { currentCountryType } from "../../@types/phoneForm";

const Signup: FC = () => {
	const [phone, setPhone] = useState("");
	const [selectState, setSelectState] = useState("");

	const navigate = useNavigate();

	const dispatch = useAppDispatch();

	const [currentCountry, setCurrentCountry] = useState<currentCountryType>({
		name: "United States",
		dial_code: "+1",
		code: "US",
		mask: /^(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,4}).*/,
	});

	const { loading, error, request } = useFetch();

	const { isActive: isActive1, openModal: openModal1, closeModal: closeModal1 } = useModal();

	const formHandler = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const body = JSON.stringify({
			phone_number: "+" + phone,
		});

		const response = await request<{ message: string }>("/login", "POST", body);

		if (response?.success) {
			dispatch(setUserPhone(phone));
			navigate("/verify");
		}
	};

	return (
		<div className="signup">
			<header className="header">
				<div className="header__container">
					<img className="header__logo" src="/logo.svg" alt="PhotoDrop" width={125} height={16} />
				</div>
			</header>
			<main className="main">
				<div className="signup__wrapper">
					<div className="container__settings">
						<div className="phoneForm">
							<Modal
								overlay={true}
								active={isActive1}
								displayType="flex"
								closeModal={closeModal1}
								dependencies={[selectState]}
							>
								<PhoneNumberSelect
									closeModal={closeModal1}
									setCurrentCountry={setCurrentCountry}
									setPhone={setPhone}
									setSelectState={setSelectState}
								/>
							</Modal>
							<h1 className="phoneForm__title">Let’s get started</h1>
							<p className="phoneForm__text">Enter your phone number</p>
							<form
								onSubmit={(event) => {
									void formHandler(event);
								}}
							>
								<PhoneNumber currentCountry={currentCountry} setPhone={setPhone} openModal={openModal1} />
								<button type="submit" className="btn" disabled={!phone || phone.length <= 7 || loading}>
									Create account {loading && <span className="spinner"></span>}
								</button>
							</form>
							{error && <p className="error">{error}</p>}
							<p className="phoneForm__description">
								By proceeding, you consent to get WhatsApp or SMS messages, from PhotoDrop and its affiliates to the
								number provided. Text “STOP” to 89203 to opt out.
							</p>
							<p className="phoneForm__description">
								By continuing, you indicate that you have read and agree to our{" "}
								<Link to="/terms" className="phoneForm__link">
									Terms of Use
								</Link>{" "}
								&#38;{" "}
								<Link to="/privacy" className="phoneForm__link">
									Privacy Policy
								</Link>
							</p>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Signup;
