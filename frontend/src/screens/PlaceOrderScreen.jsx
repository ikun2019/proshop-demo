import React, { useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Col, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { clearCartItems } from '../store/modules/cartSlice';

const PlaceOrderScreen = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const cart = useSelector((store) => store.cart);

	useEffect(() => {
		if (!cart.shippingAddress.address) {
			navigate('/shipping');
		} else if (!cart.paymentMethod) {
			navigate('/payment');
		}
	}, [cart.paymentMethod, cart.shippingAddress, navigate]);

	const placeOrderHandler = async () => {
		try {
			const response = await axios.post('/api/orders', {
				orderItems: cart.cartItems,
				shippingAddress: cart.shippingAddress,
				paymentMethod: cart.paymentMethod,
				itemsPrice: cart.itemsPrice,
				taxPrice: cart.taxPrice,
				shippingPrice: cart.shippingPrice,
				totalPrice: cart.totalPrice,
			});
			dispatch(clearCartItems());
			navigate(`/order/${response._id}`);
		} catch (error) {
			toast.error(error);
		}
	};

	return (
		<>
			<CheckoutSteps step1 step2 step3 step4 />
			<Row>
				<Col md={8}>
					<ListGroup variant="flush">
						<ListGroupItem>
							<h2>Shipping</h2>
							<p>
								{cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
								{cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
							</p>
						</ListGroupItem>
						<ListGroupItem>
							<h2>Payment Method</h2>
							<strong>Method:</strong>
							{cart.paymentMethod}
						</ListGroupItem>
						<ListGroupItem>
							<h2>Order Items</h2>
							{cart.cartItems.length === 0 ? (
								<Message>Your cart is empty.</Message>
							) : (
								<ListGroup variant="flush">
									{cart.cartItems.map((item, index) => (
										<ListGroupItem key={index}>
											<Row>
												<Col md={1}>
													<Image src={item.image} alt={item.name} fluid rounded />
												</Col>
												<Col>
													<Link to={`/products/${item.product}`}>{item.name}</Link>
												</Col>
												<Col md={4}>
													{item.qty} x ${item.price} = ${item.qty * item.price}
												</Col>
											</Row>
										</ListGroupItem>
									))}
								</ListGroup>
							)}
						</ListGroupItem>
					</ListGroup>
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup variant="flush">
							<ListGroupItem>
								<h2>Order Summary</h2>
							</ListGroupItem>
							<ListGroupItem>
								<Row>
									<Col>Items:</Col>
									<Col>${cart.itemsPrice}</Col>
								</Row>
							</ListGroupItem>
							<ListGroupItem>
								<Col>Shipping:</Col>
								<Col>${cart.shippingPrice}</Col>
							</ListGroupItem>
							<ListGroupItem>
								<Col>Tax:</Col>
								<Col>${cart.taxPrice}</Col>
							</ListGroupItem>
							<ListGroupItem>
								<Col>Total:</Col>
								<Col>${cart.totalPrice}</Col>
							</ListGroupItem>
							{/* <ListGroupItem>{error && <Message variant="danger">{error}</Message>}</ListGroupItem> */}
							<ListGroupItem>
								<Button
									type="button"
									className="btn-block"
									disabled={cart.cartItems.length === 0}
									onClick={placeOrderHandler}
								>
									Place Order
								</Button>
							</ListGroupItem>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default PlaceOrderScreen;
