import React from "react"
import { Redirect } from 'react-router-dom';
import { useParams } from "react-router";


const AuthorizeUser = () => {

  const params: Record<string, any> = useParams()

  const { token } = params;

  localStorage.setItem('token', token);
  
  return (
    <Redirect to={'/dashboard'}/>
  )
}

export default AuthorizeUser
