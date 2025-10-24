import { useState, useContext } from 'react';
import {
  Navbar,
  Nav,
  Container,
  Button,
  Row,
  Col,
  Image,
  Modal,
  Card,
} from 'react-bootstrap';
import './Inicio.css';
import { Login } from './Login.jsx';
import { UserContext } from '../context/UserContext.jsx';
import { Register } from './Register.jsx';

export const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isReloading, setIsReloading] = useState(false);

  const handleReload = () => {
    setIsReloading(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setIsReloading(false), 800);
  };

  const handleShowLogin = () => setShowLogin(true);
  const handleCloseLogin = () => setShowLogin(false);

  const handleShowRegister = () => setShowRegister(true);
  const handleCloseRegister = () => setShowRegister(false);

  const { user, logout } = useContext(UserContext);

  return (
    <>
      <header className="df-header">
        <Navbar expand="lg" className="df-navbar" variant="light">
          <Container fluid>
            <Navbar.Brand
              onClick={handleReload}
              className="df-brand"
              style={{ cursor: 'pointer' }}
            >
              {' '}
              PerriFans
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto align-items-center">
                {user ? (
                  <>
                    <span className="me-2">Hola, {user.user_name}</span>
                    <Button className="df-nav-btn ms-2" onClick={logout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      className="df-nav-btn ms-2"
                      onClick={handleShowRegister}
                    >
                      Sing up
                    </Button>

                    <Button
                      className="df-nav-btn ms-2"
                      onClick={handleShowLogin}
                    >
                      Login
                    </Button>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      <main className="df-main text-center">
        <Container>
          <h1 className="df-title">PerriFans</h1>
          <p className="df-lead">
            <strong>PerriFans</strong> es la guía que necesitas para disfrutar
            al máximo con tu perro. Descubre parques, pipicanes y rincones
            pensados para ellos, cerca de ti o en cualquier lugar que visites.
            Porque salir con tu mejor amigo de cuatro patas debería ser siempre
            fácil y divertido.
          </p>
          <Button className="df-cta" href="/adondeir">
            ¡Llévame ahí!
          </Button>
        </Container>
      </main>

      <section className="df-gallery">
        <Container fluid>
          <Row className="g-0">
            <Col md={4}>
              <Image
                src="/images/dog1.jpg"
                alt="Perro entrenando en parque agility"
                fluid
              />
            </Col>
            <Col md={4}>
              <Image src="/images/dog2.jpg" alt="Perro con pelota roja" fluid />
            </Col>
            <Col md={4}>
              <Image
                src="/images/dog3.jpg"
                alt="Perro mordiendo un aro"
                fluid
              />
            </Col>
          </Row>
        </Container>
      </section>

      <Modal show={showLogin} onHide={handleCloseLogin} centered>
        <Modal.Header closeButton>
          <Modal.Title>Iniciar sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login onClose={handleCloseLogin} />
        </Modal.Body>
      </Modal>

      <Modal show={showRegister} onHide={handleCloseRegister} centered>
        <Modal.Header closeButton>
          <Modal.Title>Registrarse</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Register onClose={handleCloseRegister} />
        </Modal.Body>
      </Modal>

      <section className="df-features py-5">
        <Container>
          <Row className="text-center">
            <Col md={4} className="mb-4">
              <div className="feature-icon mb-3">📸</div>
              <h4>Comparte experiencias</h4>
              <p>
                Sube fotos y reseñas de tus visitas para ayudar a otros
                perrifans.
              </p>
            </Col>

            <Col md={4} className="mb-4">
              <div className="feature-icon mb-3">⭐</div>
              <h4>Guarda Favoritos</h4>
              <p>
                Crea tu lista personal de lugares favoritos para visitas
                futuras.
              </p>
            </Col>

            <Col md={4} className="mb-4">
              <div className="feature-icon mb-3">💬</div>
              <h4>Soporte y ayuda</h4>
              <p>
                Nuestro equipo está aquí para ayudarte con cualquier duda o
                problema.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="df-testimonials py-5">
        <Container>
          <h2 className="text-center mb-5">
            Lo que dicen nuestros usuarios 🐾
          </h2>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="testimonial-card H-100 shadow-sm">
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    <div className="testimonial-avatar me-3">🐶</div>
                    <div>
                      <h5 className="mb-0">María G.</h5>
                      <small className="text-muted">Madrid</small>
                    </div>
                  </div>
                  <p className="testimonial-text">
                    Gracias a PerriFans, he descubierto parques increíbles cerca
                    de casa. ¡Mi perro está encantado! 🐕‍ ¡Súper recomendado!
                  </p>
                  <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4} className="mb-4">
              <Card className="testimonial-card H-100 shadow-sm">
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    <div className="testimonial-avatar me-3">🐶</div>
                    <div>
                      <h5 className="mb-0">Pedro A.</h5>
                      <small className="text-muted">Valencia</small>
                    </div>
                  </div>
                  <p className="testimonial-text">
                    La mejor web para encontrar lugares dog-friendly. ¡He
                    descubierto sitios geniales para pasear con mi perra!🐩
                  </p>
                  <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4} className="mb-4">
              <Card className="testimonial-card H-100 shadow-sm">
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    <div className="testimonial-avatar me-3">🐶</div>
                    <div>
                      <h5 className="mb-0">Luci M.</h5>
                      <small className="text-muted">Valencia</small>
                    </div>
                  </div>
                  <p className="testimonial-text">
                    PerriFans ha hecho que mis salidas con mi perro sean mucho
                    más divertidas. ¡Ahora siempre sé a dónde ir! 🐕‍🦺
                  </p>
                  <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <footer className="df-footer text-center" style={{ cursor: 'pointer' }}>
        <Container onClick={handleReload}>PerriFans 🐾</Container>
      </footer>

      {isReloading && (
        <div className="reload-overlay">
          <div className="reload-spinner"></div>
        </div>
      )}
    </>
  );
};

export default Home;
