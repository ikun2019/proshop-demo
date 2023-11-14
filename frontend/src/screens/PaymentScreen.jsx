import React, { useEffect, useState } from 'react';
import { Button, Col, Form, FormCheck, FormGroup, FormLabel } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../store/modules/cartSlice';

const PaymentScreen = () => {
	const [paymentMethod, setPaymentMethod] = useState('paypal');

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const cart = useSelector((store) => store.cart);
	const { shippingAddress } = cart;

	useEffect(() => {
		if (!shippingAddress) {
			navigate('shipping');
		}
	}, [shippingAddress, navigate]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		navigate('/placeorder');
	};

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 step3 />
			<h1>Payment Method</h1>
			<Form onSubmit={submitHandler}>
				<FormGroup>
					<FormLabel as="legend">Select Method</FormLabel>
					<Col>
						<FormCheck
							type="radio"
							className="my-2"
							label="PayPal or Credit Card"
							id="PayPal"
							name="paymentMethod"
							value="PayPal"
							checked
							onChange={(e) => setPaymentMethod(e.target.value)}
						></FormCheck>
					</Col>
				</FormGroup>
				<Button type="submit" variant="primary">
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default PaymentScreen;
