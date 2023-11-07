import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
// import axios from 'axios';
import { useGetProductsQuery } from '../store/modules/productsApi';

import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';

const HomeScreen = () => {
	// const [products, setProducts] = useState([]);

	// useEffect(() => {
	// 	const fetchProducts = async () => {
	// 		try {
	// 			const { data } = await axios.get('/api/products');
	// 			setProducts(data);
	// 		} catch (error) {
	// 			console.error(error);
	// 			setProducts([]);
	// 		}
	// 	};
	// 	fetchProducts();
	// }, []);
	const { data: products, isLoading, isError: error } = useGetProductsQuery();

	return (
		<>
			{isLoading ? (
				<Loader />
			) : error ? (
				<Message valiant="danger">{error.data?.message || error.error}</Message>
			) : (
				<>
					<h1>Latest Products</h1>
					<Row>
						{products.map((product) => (
							<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
								<Product product={product} />
							</Col>
						))}
					</Row>
				</>
			)}
		</>
	);
};

export default HomeScreen;
