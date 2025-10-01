import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export const Login = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Login con:', email, password);

    if (onClose) onClose();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicEmail">
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

      <Button className="mt-3 w-100" type="submit">
        Ingresar
      </Button>
    </Form>
  );
};

Login.propTypes = {
  onClose: PropTypes.func,
};
