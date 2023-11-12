import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Form, FormControl, FormGroup, FormLabel, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import { useLoginMutation } from '../store/modules/usersApiSlice';
import { setCredentials } from '../store/modules/authSlice';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

const LoginScreen = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();
	const navigate = useNavigate();

	// const [login, { isLoading }] = useLoginMutation();

	const { userInfo } = useSelector((store) => store.auth);
	const { search } = useLocation();
	const sp = new URLSearchParams(search);
	const redirect = sp.get('redirect') || '/';

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			// const response = await login({ email, password }).unwrap();
			const response = await axios.post('/api/users/login', {
				email,
				password,
			});
			dispatch(setCredentials({ ...response }));
			console.log(response);
			navigate(redirect);
		} catch (err) {
			toast.error(err?.data?.message || err.error);
		}
	};

	useEffect(() => {
		if (userInfo) {
			navigate(redirect);
		}
	}, [userInfo, redirect, navigate]);

	return (
		<FormContainer>
			<h1>Sign In</h1>
			<Form onSubmit={submitHandler}>
				<FormGroup controlId="email" className="my-3">
					<FormLabel>Email Address</FormLabel>
					<FormControl
						type="email"
						placeholder="Enter Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					></FormControl>
				</FormGroup>

				<FormGroup controlId="password" className="my-3">
					<FormLabel>Passwrod</FormLabel>
					<FormControl
						type="password"
						placeholder="Enter Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					></FormControl>
				</FormGroup>
				<Button type="submit" variant="primary" className="mt-2">
					Sign In
				</Button>
				{/* {isLoading && <Loader />} */}
			</Form>
			<Row className="py-3">
				<Col>
					New Customer?
					<Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};

export default LoginScreen;
