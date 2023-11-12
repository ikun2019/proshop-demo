import React from 'react';
import axios from 'axios';
import { Navbar, Nav, Container, NavbarCollapse, Badge, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { deleteCredentials } from '../store/modules/authSlice';

const Header = () => {
	const { cartItems } = useSelector((store) => store.cart);
	const { userInfo } = useSelector((store) => store.auth);
	console.log(userInfo);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const logoutHandler = async () => {
		try {
			const response = await axios.post('/api/users/logout', {});
			dispatch(deleteCredentials());
			navigate('/');
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<header>
			<Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
				<Container>
					<LinkContainer to="/">
						<Navbar.Brand>
							<img src={logo} alt="ProShop" />
							ProShop
						</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<NavbarCollapse id="basic-navbar-nav">
						<Nav className="ms-auto">
							<LinkContainer to="/cart">
								<Nav.Link>
									<FaShoppingCart />
									Cart
									{cartItems.length > 0 && (
										<Badge pill bg="success" style={{ marginLeft: '5px' }}>
											{cartItems.reduce((a, c) => a + c.qty, 0)}
										</Badge>
									)}
								</Nav.Link>
							</LinkContainer>
							{userInfo ? (
								<NavDropdown title={userInfo.name} id="username">
									<LinkContainer to="/profile">
										<NavDropdown.Item>Profile</NavDropdown.Item>
									</LinkContainer>
									<NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
								</NavDropdown>
							) : (
								<LinkContainer to="/login">
									<Nav.Link>
										<FaUser />
										Sign In
									</Nav.Link>
								</LinkContainer>
							)}
						</Nav>
					</NavbarCollapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
