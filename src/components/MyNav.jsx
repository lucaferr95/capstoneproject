import { Navbar, Container, Nav, NavDropdown, Form, Row, Col } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "../App.css";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const MyNavbar = () => {
  const location = useLocation();
  const avatar = useSelector(state => state.user?.avatarUrl) || "/assets/avatar/default.png";
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  
  const handleSearch = (e) => {
  e.preventDefault();
  if (searchValue.trim()) {
    navigate(`/search?q=${encodeURIComponent(searchValue)}`);
    setSearchValue('');
  }
};
  return (
    <Navbar expand="lg" className="bg-black border-bottom border-body py-2" data-bs-theme="dark">
      <Container fluid>
        <Row className="w-100 align-items-center text-center text-lg-start">
          {/* Col 1: Logo + Titolo */}
          <Col xs={12} lg={3} className="d-flex flex-column flex-lg-row align-items-center gap-1 gap-lg-1 justify-content-center justify-content-lg-start mb-2 mb-lg-0">
            <Navbar.Brand as={Link} to="/" className="d-flex flex-column flex-lg-row align-items-center">
              <img
                src="/assets/logo/logo fuori di testo.png"
                alt="logo"
                width="150"
                height="auto"
                className="mb-1"
              />
              <span className="eater gold-text" style={{ fontSize: '1.7rem' }}>
                FUORI DI TESTO
              </span>
            </Navbar.Brand>
          </Col>

          {/* Col 2: Nav Links */}
          <Col xs={12} lg={6} className="mb-3 mb-lg-0">
            <Nav className="d-flex flex-column flex-lg-row gap-3 justify-content-center align-items-center">
              <Nav.Link
                as={Link}
                to="/"
                className={`glow-button rounded-start-pill ${location.pathname === '/' ? 'active' : ''} gold-text`}
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/novità"
                className={`glow-button roun ${location.pathname === '/novità' ? 'active' : ''} gold-text`}
              >
                Novità
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/favourites"
                className={`glow-button  ${location.pathname === '/favourites' ? 'active' : ''} gold-text`}
              >
                Testi preferiti
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/"
                className={`glow-button  ${location.pathname === '/novità' ? 'active' : ''} gold-text`}
              >
                quiz
              </Nav.Link>
               <Nav.Link
                as={Link}
                to="/"
                className={`glow-button rounded-end-pill ${location.pathname === '/novità' ? 'active' : ''} gold-text`}
              >
                Lascia un commento
              </Nav.Link>
            </Nav>
          </Col>

          {/* Col 3: Search + Avatar */}
          <Col xs={12} lg={3} className="d-flex flex-column flex-lg-row align-items-center justify-content-center justify-content-lg-end gap-3">
            {/* Search */}
            <Form className="d-flex w-100 w-lg-auto" onSubmit={handleSearch}>
  <Form.Control
    type="search"
    placeholder="Cerca testi o artisti"
    className="me-2 rounded glow-button gold-text"
    aria-label="Search"
    value={searchValue}
    onChange={(e) => setSearchValue(e.target.value)}
  />
</Form>


            {/* Avatar + Dropdown (solo desktop) */}
            <NavDropdown
              title={
                <img
                  src={avatar}
                  alt="Avatar utente"
                  width="50"
                  height="50"
                  className="rounded-circle border border-light"
                  style={{ objectFit: 'cover' }}
                />
              }
              id="profileDropdown"
              align="end"
            >
              <NavDropdown.Item as={Link} to="/profilo" className="gold-text">Profilo</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/login" className="gold-text">Login</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/register" className="gold-text">Registrati</NavDropdown.Item>

              <NavDropdown.Item href="#" className="gold-text">Settings</NavDropdown.Item>
              <NavDropdown.Item href="https://www.paypal.com/paypalme/lucaf95" className="gold-text">
                Sostieni il progetto
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#" className="gold-text">Logout</NavDropdown.Item>
            </NavDropdown>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
