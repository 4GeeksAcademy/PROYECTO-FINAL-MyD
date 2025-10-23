import { useState, useRef } from 'react';
import {
  Navbar,
  Nav,
  Container,
  Button,
  Row,
  Col,
  Card,
  Form,
  InputGroup,
  Spinner,
} from 'react-bootstrap';
import { FaSearch, FaUser } from 'react-icons/fa';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Adondeir = () => {
  const [query, setQuery] = useState('');
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);

  const mapRef = useRef(null);

  const defaultCenter = { lat: 40.416775, lng: -3.70379 }; // Madrid

  // Buscar lugares
  const handleSearch = () => {
    if (!query) return;
    setLoading(true);

    if (!mapRef.current) {
      console.error('Mapa aún no está listo');
      setLoading(false);
      return;
    }

    const service = new window.google.maps.places.PlacesService(mapRef.current);

    const request = {
      query,
      location: defaultCenter,
      radius: 5000,
    };

    service.textSearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const mapped = results.map((place) => ({
          id: place.place_id,
          name: place.name,
          address: place.formatted_address,
          location: place.geometry?.location,
          photo:
            place.photos && place.photos.length > 0
              ? place.photos[0].getUrl({ maxWidth: 200 })
              : null,
        }));
        setPlaces(mapped);
      } else {
        setPlaces([]);
      }
      setLoading(false);
    });
  };

  // Centrar mapa en lugar
  const goToPlace = (location) => {
    if (mapRef.current && location) {
      mapRef.current.panTo(location);
      mapRef.current.setZoom(15);
    }
  };

  return (
    <>
      {/* Header */}
      <Navbar bg="info" expand="lg" className="px-3">
        <Container fluid>
          <Navbar.Brand>PerriFans</Navbar.Brand>
          <Nav className="ms-auto align-items-center gap-2">
            <Button variant="outline-dark">
              <FaUser />
            </Button>
          </Nav>
        </Container>
      </Navbar>

      {/* Barra de búsqueda */}
      <Container fluid className="bg-light py-3">
        <InputGroup>
          <Form.Control
            placeholder="¿A dónde quieres ir?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button variant="primary" onClick={handleSearch} disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : <FaSearch />}
          </Button>
        </InputGroup>
      </Container>

      {/* Contenido principal */}
      <Container fluid className="my-4">
        <Row>
          {/* Columna izquierda: resultados */}
          <Col md={4} style={{ maxHeight: '600px', overflowY: 'auto' }}>
            <h5>Resultados</h5>
            {places.map((place) => (
              <Card
                key={place.id}
                className="mb-3 shadow-sm"
                style={{ cursor: 'pointer' }}
                onClick={() => goToPlace(place.location)}
              >
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <div>
                    <Card.Title style={{ marginBottom: 4 }}>
                      {place.name}
                    </Card.Title>
                    <small className="text-muted">{place.address}</small>
                    <div
                      style={{
                        backgroundColor: '#c5e1a5',
                        height: '80px',
                        width: '150px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        marginTop: '6px',
                      }}
                    >
                      {place.photo ? (
                        <img
                          src={place.photo}
                          alt={place.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      ) : (
                        'Sin imagen'
                      )}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ))}
            {places.length === 0 && (
              <p className="text-muted mt-3">
                Busca un lugar para ver resultados
              </p>
            )}
          </Col>

          {/* Columna derecha: mapa */}
          <Col md={8}>
            <div style={{ height: '600px', width: '100%' }}>
              <LoadScript
                googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                libraries={['places']}
              >
                <GoogleMap
                  center={defaultCenter}
                  zoom={13}
                  mapContainerStyle={{ width: '100%', height: '100%' }}
                  onLoad={(map) => (mapRef.current = map)}
                >
                  {places.map((place) => (
                    <Marker
                      key={place.id}
                      position={{
                        lat: place.location?.lat(),
                        lng: place.location?.lng(),
                      }}
                    />
                  ))}
                </GoogleMap>
              </LoadScript>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <footer className="bg-info text-center py-3">
        <Container>PerriFans 🐾</Container>
      </footer>
    </>
  );
};

export default Adondeir;
