import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoot = () => {
	const { userInfo } = useSelector((store) => store.auth);
	return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoot;
