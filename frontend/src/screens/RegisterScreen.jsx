import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import FormContainer from '../components/FormContainer';
import { setCredentials } from '../store/modules/authSlice';
import { Button, Form, FormControl, FormGroup, FormLabel, Row, Col } from 'react-bootstrap';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const RegisterScreen = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { search } = useLocation();
	const sp = new URLSearchParams(search);
	const redirect = sp.get('redirect') || '/';

	const { userInfo } = useSelector((store) => store.auth);

	useEffect(() => {
		if (userInfo) {
			navigate(redirect);
		}
	}, [userInfo, redirect, navigate]);

	const submitHandler = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			toast.error('Passwords do not match');
			return;
		} else {
			try {
				const response = await axios.post('/api/users', {
					name,
					email,
					password,
				});
				dispatch(setCredentials({ ...response }));
				navigate(redirect);
			} catch (err) {
				toast.error(err?.data?.message || err.error);
			}
		}
	};

	return (
		<FormContainer>
			<h1>Sign Up</h1>

			<Form onSubmit={submitHandler}>
				<FormGroup controlId="name" className="my-3">
					<FormLabel>Name</FormLabel>
					<FormControl
						type="text"
						placeholder="Enter Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					></FormControl>
				</FormGroup>

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
				<FormGroup controlId="confirmPassword" className="my-3">
					<FormLabel>Confirm Passwrod</FormLabel>
					<FormControl
						type="password"
						placeholder="Confirm Password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					></FormControl>
				</FormGroup>
				<Button type="submit" variant="primary" className="mt-2">
					Register
				</Button>
			</Form>
			<Row className="py-3">
				<Col>
					Already have an account?
					<Link to={redirect ? `/register?redirect=${redirect}` : '/login'}>Login</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};

export default RegisterScreen;
