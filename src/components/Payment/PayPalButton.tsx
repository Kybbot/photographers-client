import React from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";

const PayPalButton: React.FC = () => {
	const navigate = useNavigate();

	const createOrderHandler = async () => {
		try {
			const response = await fetch(`${import.meta.env.VITE_SERVER_ENDPOINT}/api/orders`, {
				method: "post",
			});
			const order = (await response.json()) as { id: string };

			return order.id;
		} catch (err) {
			console.log("PAYPAL-ERROR:", err);
			return "Error";
		}
	};

	return (
		<PayPalScriptProvider
			options={{
				"client-id": "AWOF1RdvigHwqPs2T_Cmp6CXQt3zVjLfw3j2gS_sDIVcw9MhdmPHgesOQTIb3JmItaTTLhigMzgUkbfg",
			}}
		>
			<PayPalButtons
				className="paymentForm__paypal"
				style={{ layout: "horizontal", shape: "pill", height: 50, tagline: false }}
				createOrder={createOrderHandler}
				onApprove={async (data) => {
					try {
						const response = await fetch(`${import.meta.env.VITE_SERVER_ENDPOINT}/api/orders/${data.orderID}/capture`, {
							method: "post",
						});
						const orderData = (await response.json()) as { status: string };
						if (orderData.status === "COMPLETED") {
							navigate("/success");
						}
					} catch (err) {
						console.log("PAYPAL-ERROR:", err);
					}
				}}
			/>
		</PayPalScriptProvider>
	);
};

export default PayPalButton;
