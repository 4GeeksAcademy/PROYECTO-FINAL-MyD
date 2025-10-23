import { useContext } from 'react';
import { Navigate } from 'react-router';
import { UserContext } from '../../context/UserContext';
import { isEmpty } from 'lodash';
import Home from '../../pages/Home';

export const GuardedRoute = () => {
  const { user } = useContext(UserContext);
  return !isEmpty(user) ? <Home /> : <Navigate to="/login" />;
};
