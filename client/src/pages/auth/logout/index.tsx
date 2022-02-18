import React from 'react';
import { Redirect } from 'react-router-dom';

const LogoutPage: React.FC = () => {
  localStorage.clear();
  return <Redirect to="/" />;
};

export default LogoutPage;
