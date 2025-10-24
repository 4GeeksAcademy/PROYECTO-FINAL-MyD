import { Navbar, Nav, Container, Button, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaHeart } from 'react-icons/fa';
import PropTypes from 'prop-types';

const NavbarComponent = ({ showFavoritesButton = false, onShowFavorites }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Cerrando sesión...');
    navigate('/');
  };

  return (
    <Navbar bg="info" expand="lg" className="px-3">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" style={{ cursor: 'pointer' }}>
          PerriFans 🐾
        </Navbar.Brand>
        <Nav className="ms-auto align-items-center gap-2">
          {showFavoritesButton && (
            <Button variant="outline-dark" onClick={onShowFavorites}>
              <FaHeart /> Favoritos
            </Button>
          )}

          <Dropdown align="end">
            <Dropdown.Toggle variant="outline-dark" id="dropdown-user">
              <FaUser />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => navigate('/perfil')}>
                Perfil
              </Dropdown.Item>

              <Dropdown.Item onClick={onShowFavorites}>Favoritos</Dropdown.Item>

              <Dropdown.Divider />

              <Dropdown.Item onClick={handleLogout}>
                Cerrae sesión
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

NavbarComponent.propTypes = {
  showFavoritesButton: PropTypes.bool,
  onShowFavorites: PropTypes.func,
};

export default NavbarComponent;
