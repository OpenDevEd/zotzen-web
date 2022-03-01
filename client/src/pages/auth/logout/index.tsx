import React from 'react';
import { Navigate } from 'react-router-dom';

const LogoutPage: React.FC = () => {
  localStorage.clear();
  return <Navigate to="/" />;
};

export default LogoutPage;
