import { useState } from 'react';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import { UserContext } from './UserContext';
import { postLogin, postLogout, postRegister } from '../services/api/auth';

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const data = await postLogin(email, password);
      setUser(data.user);
      if (data.token) localStorage.setItem('token', data.token);
      navigate('/');
      return true;
    } catch (err) {
      console.error('❌ Error en login:', err);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await postLogout();
      setUser(null);
      localStorage.removeItem('token');
      navigate('/login');
    } catch (err) {
      console.error('❌ Error en logout:', err);
    }
  };

  const register = async (username, email, password) => {
    try {
      await postRegister(username, email, password);
      await login(email, password);
    } catch (err) {
      console.error('❌ Error al registrarse:', err);
      throw err;
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout, register }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
