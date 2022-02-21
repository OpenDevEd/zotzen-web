import React from 'react';
import { Redirect, useParams } from 'react-router-dom';

const AuthorizeUser: React.FC = () => {
  const params: Record<string, any> = useParams();
  const { token } = params;

  localStorage.setItem('token', token);

  return (
    <Redirect to="/dashboard" />
  );
};

export default AuthorizeUser;
