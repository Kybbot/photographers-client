import React, { ChangeEvent, Dispatch, FC, SetStateAction, useMemo, useRef, useState } from "react";

import { countries } from "../../utils/countries";

import { currentCountryType } from "../../@types/phoneForm";

type PhoneNumberSelectProps = {
	closeModal: () => void;
	setCurrentCountry: Dispatch<SetStateAction<currentCountryType>>;
	setPhone: Dispatch<React.SetStateAction<string>>;
	setSelectState: React.Dispatch<React.SetStateAction<string>>;
};

export const PhoneNumberSelect: FC<PhoneNumberSelectProps> = ({
	closeModal,
	setCurrentCountry,
	setPhone,
	setSelectState,
}) => {
	const [search, setSearch] = useState("");

	const countrysListRef = useRef<HTMLDivElement>(null);

	const currentCountries = useMemo(() => {
		if (!search) {
			return countries;
		} else {
			return countries.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
		}
	}, [search]);

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value);
		setSelectState(event.target.value);
	};

	const handleButtonClick = (data: currentCountryType) => {
		setCurrentCountry(data);
		setPhone(data.dial_code);
		closeModal();
	};

	// useEffect(() => {
	// 	const obserOptions = {
	// 		root: null,
	// 		rootMargin: "0px",
	// 		threshols: 0.7,
	// 	};

	// 	const observerCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
	// 		entries.forEach((entry) => {
	// 			if (entry.isIntersecting) {
	// 				const dataSrc = entry.target.children.item(0)!.getAttribute("data-src");
	// 				console.log("dataSrc:", dataSrc);
	// 				console.log(entry.target.children.item(0)!.getAttribute("src") !== dataSrc!);
	// 				if (entry.target.children.item(0)!.getAttribute("src") !== dataSrc!) {
	// 					entry.target.children.item(0)?.setAttribute("src", dataSrc!);
	// 					observer.unobserve(entry.target);
	// 				}
	// 			}
	// 		});
	// 	};

	// 	const countrysListDiv = countrysListRef.current;

	// 	const observer = new IntersectionObserver(observerCallback, obserOptions);
	// 	if (countrysListDiv) {
	// 		Array.from(countrysListDiv.children).forEach((item) => observer.observe(item));
	// 	}

	// 	return () => {
	// 		if (countrysListDiv) {
	// 			Array.from(countrysListDiv.children).forEach((item) => observer.unobserve(item));
	// 		}
	// 	};
	// }, [currentCountries]);

	return (
		<div className="phone-number__select phone-number__select--visible">
			<div className="phone-number__container">
				<h2 className="phone-number__title">Select Country</h2>
				<button className="phone-number__close" type="button" onClick={closeModal}>
					Close
				</button>
				<form>
					<input
						type="search"
						className="input phone-number__search"
						placeholder="Search country"
						value={search}
						onChange={handleInputChange}
					/>
				</form>
				<div ref={countrysListRef} className="phone-number__list">
					{currentCountries.map((item) => (
						<button
							className="phone-number__country"
							key={item.name}
							type="button"
							onClick={() => handleButtonClick(item)}
						>
							{/* <img
								className="phone-number__img"
								src={`/flugs/${item.code.toLowerCase()}.svg`}
								alt={item.name}
								width={28}
								height={19}
								loading="lazy"
							/> */}
							{item.name}
						</button>
					))}
				</div>
			</div>
		</div>
	);
};
