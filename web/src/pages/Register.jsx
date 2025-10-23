import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { postRegister } from '../api/auth.js';

export const Register = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [user_name, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const data = await postRegister({ email, user_name, password });

      setMessage(
        data.message || 'Registro exitoso. Ahora puedes iniciar sesión.'
      );
      setEmail('');
      setUserName('');
      setPassword('');

      if (onClose) onClose();
    } catch (err) {
      setError(
        err.message || 'Error en el registro. Por favor, intenta de nuevo.'
      );
      console.error(err.message || 'Error al registrar usuario');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      {message && <Alert variant="success">{message}</Alert>}

      <Form.Group controlId="formBasicUsername">
        <Form.Label>Nombre de usuario</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingresa tu nombre de usuario"
          value={user_name}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formBasicEmail" className="mt-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Ingresa tu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword" className="mt-3">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-4">
        Registrarse
      </Button>
    </Form>
  );
};

Register.propTypes = {
  onClose: PropTypes.func,
};
