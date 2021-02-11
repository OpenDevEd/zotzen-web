import React from "react"
import { Redirect } from 'react-router-dom';
import { useParams } from "react-router";
import { UnknownObject } from '../../../utils/types';


const AuthorizeUser = () => {

  const params: UnknownObject = useParams()

  const { token } = params;

  localStorage.setItem('token', token);
  
  return (
    <Redirect to={'/dashboard'}/>
  )
}

export default AuthorizeUser
