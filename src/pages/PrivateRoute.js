import React from 'react';
import { Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

const PrivateRoute = ({ children, ...rest }) => {
  const { isAuthenticated } = useAuth0();
  return (
    <Route
      {...rest}
      render={() => (isAuthenticated ? children : <Redirect to='/'></Redirect>)}
    ></Route>
  );
};
export default PrivateRoute;
