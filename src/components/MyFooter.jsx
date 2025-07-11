import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import '../styles/Footer.css'


const MyFooter = () => {
  return (
    <footer className="bg-black border-bottom border-body" data-bs-theme="dark w-100 text-white py-4 mt-5">
      <Container>
        {/* Lingua */}
        <Row className="mb-3 pt-3 mt-1">
          <Col className="text-center">
            <small>Italia | English (UK)</small>
          </Col>
        </Row>

        {/* Link */}
        <Row className="mb-2 text-center text-white gy-2">
          <Col xs={12} md="auto" className='gold-text'>
            <small>© 2025 Fuori di testo Inc. Tutti i diritti riservati.</small>
          </Col>
        </Row>

        <Row className="text-center gy-2 small text-white">
          <Col xs={12} md="auto" className='text-white'>
            <a href="#" className="text-white text-decoration-none">Condizioni dei servizi internet</a>
          </Col>
          <Col xs={12} md="auto">
            <a href="#" className="text-white text-decoration-none">Fuori di testo e privacy</a>
          </Col>
          <Col xs={12} md="auto">
            <a href="#" className="text-white text-decoration-none">Avviso sui cookie</a>
          </Col>
          <Col xs={12} md="auto">
            <a href="#" className="text-white text-decoration-none">Supporto</a>
          </Col>
          <Col xs={12} md="auto">
           <Nav.Link as={Link} to="/dicono-di-noi">Dicono di noi</Nav.Link>

          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default MyFooter;
