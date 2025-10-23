import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export const Login = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await fetch(
        'https://turbo-telegram-pj99w4rj5xvxfv54-5000.app.github.dev/login',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log('✅ Login exitoso:', data);
        console.log(
          '🔑 Access token guardado:',
          sessionStorage.getItem('csrf_access_token')
        );
        setMessage('¡Bienvenidx de nuevo! 🐾');

        // Esperar 1 segundo antes de redirigir
        setTimeout(() => {
          if (onClose) onClose();
          navigate('/adondeirconf');
        }, 1000);
      } else {
        // Mostrar error del servidor
        setError(data.error || 'Credenciales incorrectas');
      }
    } catch (error) {
      console.error('❌ Error en el login:', error);
      setError('Error de conexión. Por favor, intenta de nuevo.');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      {message && <Alert variant="success">{message}</Alert>}

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
