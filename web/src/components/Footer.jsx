import { Container, Row, Col } from 'react-bootstrap';
/*import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';*/

export const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: '#F8F9FA',
        padding: '40px 0',
        marginTop: '50px',
      }}
    >
      <Container
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <Row className="text-center text-md-start">
          <Col md={4} className="mb-3">
            <h5>PerriFans 🐾</h5>
            <p>Tu guía para lugares dog-friendly. ¡Disfruta con tu peludx!</p>
          </Col>

          <Col md={4} className="mb-3">
            <h6>Enlaces útiles</h6>
            <ul className="list-unstyled">
              <li>
                <a href="/">Inicio</a>
              </li>
              <li>
                <a href="/adondeir">Adonde ir</a>
              </li>
              <li>
                <a href="/contacto">Contacto</a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
