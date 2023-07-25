import React from 'react';
import { Route } from 'react-router-dom';
import { useUserContext } from '../context/user_context';
import { Home } from '.';

const PrivateRoute = ({ children, ...rest }) => {
  const { isAuthenticated } = useUserContext();
  return <Route {...rest}>{isAuthenticated ? children : <Home />}</Route>;
};
export default PrivateRoute;
