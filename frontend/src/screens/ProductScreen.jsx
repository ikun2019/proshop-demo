import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
	Row,
	Col,
	Image,
	ListGroup,
	Card,
	Button,
	ListGroupItem,
	FormControl,
} from 'react-bootstrap';
// import axios from 'axios';
import { useGetProductDetailsQuery } from '../store/modules/productsApi';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { addToCart } from '../store/modules/cartSlice';
import { useDispatch } from 'react-redux';
// import Products from '../products';

const ProductScreen = () => {
	const { id: productId } = useParams();
	const [qty, setQty] = useState(1);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// const [product, setProduct] = useState({});

	// useEffect(() => {
	// 	const fetchProduct = async () => {
	// 		const { data } = await axios.get(`/api/products/${productId}`);
	// 		setProduct(data);
	// 	};
	// 	fetchProduct();
	// }, [productId]);
	// const product = Products.find((product) => product._id === productId);
	const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);
	const addToCartHandler = () => {
		dispatch(addToCart({ ...product, qty }));
		navigate('/cart');
	};
	return (
		<>
			<Link to="/" className="btn btn-light my-3">
				Go Back
			</Link>
			{isLoading ? (
				<Loader />
			) : error ? (
				<Message valiant="danger">{error.data?.message || error.error}</Message>
			) : (
				<>
					<Row>
						<Col md={5}>
							<Image src={product.image} alt={product.name} fluid />
						</Col>
						<Col md={4}>
							<ListGroup variant="flush">
								<ListGroupItem>
									<h3>{product.name}</h3>
								</ListGroupItem>
								<ListGroupItem>
									<Rating value={product.rating} text={`${product.numReviews} reviews`} />
								</ListGroupItem>
								<ListGroupItem>Price: ${product.price}</ListGroupItem>
								<ListGroupItem>Description: {product.description}</ListGroupItem>
							</ListGroup>
						</Col>
						<Col md={3}>
							<Card>
								<ListGroup variant="flush">
									<ListGroupItem>
										<Row>
											<Col>Price:</Col>
											<Col>
												<strong>${product.price}</strong>
											</Col>
										</Row>
									</ListGroupItem>
									<ListGroupItem>
										<Row>
											<Col>Status:</Col>
											<Col>
												<strong>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</strong>
											</Col>
										</Row>
									</ListGroupItem>
									{product.countInStock > 0 && (
										<ListGroup.Item>
											<Row>
												<Col>Qty</Col>
												<Col>
													<FormControl
														as="select"
														value={qty}
														onChange={(e) => setQty(Number(e.target.value))}
													>
														{[...Array(product.countInStock).keys()].map((x) => (
															<option key={x + 1} value={x + 1}>
																{x + 1}
															</option>
														))}
													</FormControl>
												</Col>
											</Row>
										</ListGroup.Item>
									)}
									<ListGroupItem>
										<Button
											className="btn-block"
											type="button"
											disabled={product.countInStock === 0}
											onClick={addToCartHandler}
										>
											Add to Cart
										</Button>
									</ListGroupItem>
								</ListGroup>
							</Card>
						</Col>
					</Row>
				</>
			)}
		</>
	);
};

export default ProductScreen;
