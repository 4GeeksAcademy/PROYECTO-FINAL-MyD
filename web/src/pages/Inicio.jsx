import { useState, useContext } from 'react';
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Button,
  Row,
  Col,
  Image,
  Modal,
} from 'react-bootstrap';
import './Inicio.css';
import { Login } from './Login.jsx';
import { UserContext } from '../context/UserContext.jsx';

const Inicio = () => {
  const [showLogin, setShowLogin] = useState(false);
  const handleClose = () => setShowLogin(false);
  const handleShow = () => setShowLogin(true);

  const { user, logout } = useContext(UserContext);

  return (
    <>
      {/*Encabezado */}
      <header className="df-header">
        <Navbar expand="lg" className="df-navbar" variant="light">
          <Container fluid>
            <Navbar.Brand className="df-brand">PerriFans</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto align-items-center">
                <NavDropdown
                  title="Explore"
                  id="explore-dropdown"
                  align="end"
                  menuVariant="dark"
                  className="df-dropdown"
                >
                  <NavDropdown.Item href="#">
                    {' '}
                    Parques naturales{' '}
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#">Pipicanes</NavDropdown.Item>
                </NavDropdown>

                {user ? (
                  <>
                    <span className="me-2">Hola, {user.username}</span>
                    <Button className="df-nav-btn ms-2" onClick={logout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button className="df-nav-btn ms-2">Sing up</Button>
                    <Button className="df-nav-btn ms-2" onClick={handleShow}>
                      Login
                    </Button>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      {/* Hero section */}
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

      {/* Gallery */}
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

      <Modal show={showLogin} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Iniciar sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login onClose={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Inicio;
