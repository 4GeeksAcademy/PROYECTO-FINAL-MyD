import { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Alert,
  Form,
} from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import NavbarComponent from '../components/NavBar';

const Perfil = () => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    //coger datos del user de la API
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        'https://turbo-telegram-pj99w4rj5xvxfv54-5000.app.github.dev/me',
        {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        const savedFavorites = JSON.parse(
          localStorage.getItem('favorites') || '[]'
        );
        setFavorites(savedFavorites);
      } else {
        setError('No se pudo cargar la información del usuario');
      }
    } catch (err) {
      setError('Error de conexión');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <p>Cargando perfil...</p>
      </Container>
    );
  }

  return (
    <>
      <NavbarComponent showFavoritesButton={false} />

      <Container className="my-5">
        {error && <Alert variant="danger">{error}</Alert>}

        <Row>
          <Col md={6}>
            <Card className="shadow-sm mb-4">
              <Card.Header className="bg-info text-white">
                <h5>Mi Perfil</h5>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Nombre de usuario</Form.Label>
                    <Form.Control
                      type="text"
                      value={user?.user_name || ''}
                      disabled
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={user?.email || ''}
                      disabled
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" value="••••••••" disabled />
                  </Form.Group>

                  <Button variant="primary" className="w-100">
                    Editar Perfil
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="shadow-sm">
              <Card.Header className="bg-info text-white">
                <h5>Mis Favoritos</h5>
              </Card.Header>
              <Card.Body style={{ maxHeight: '500px', overflow: 'auto' }}>
                {favorites.length > 0 ? (
                  favorites.map((fav) => (
                    <Card key={fav.id} className="mb-3">
                      <Card.Body className="d-flex align-items-center gap-3">
                        {fav.photo && (
                          <img
                            src={fav.photo}
                            alt={fav.name}
                            style={{
                              width: 60,
                              height: 60,
                              borderRadius: '8px',
                              objectFit: 'cover',
                            }}
                          />
                        )}
                        <div>
                          <h6 className="mb-1">{fav.name}</h6>
                          <small className="text-muted">{fav.addres}</small>
                        </div>
                        <FaStar className="text-warning ms-auto" />
                      </Card.Body>
                    </Card>
                  ))
                ) : (
                  <p className="text-muted text-center">
                    No tienes <strong>Pipicanes</strong>🐾 favoritos aún.
                  </p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <footer className="bg-info text-center py-3 mt-5">
        <Container>PerriFans 🐾</Container>
      </footer>
    </>
  );
};

export default Perfil;
