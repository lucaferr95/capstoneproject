import { Navbar, Container, Nav, NavDropdown, Form } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "../App.css";
import { useSelector } from 'react-redux';

const MyNavbar = () => {
  const location = useLocation();
  const avatar = useSelector(state => state.user?.avatarUrl) || "/assets/avatar/default.png";

  return (
    <Navbar expand="lg" className="bg-black border-bottom border-body py-2" data-bs-theme="dark">
      <Container fluid className="d-flex align-items-center justify-content-between">
        {/* LOGO + TESTO */}
        <Navbar.Brand as={Link} to="/" className="d-flex flex-column flex-lg-row align-items-center gap-1 gap-lg-3">
          <img
            src="/assets/logo/logo fuori di testo.png"
            alt="logo"
            width="150"
            height="auto"
            className="mb-0"
          />
          <span className="eater gold-text text-center text-lg-start">
            FUORI DI TESTO
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse
          id="main-navbar"
          className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center"
        >
          {/* AVATAR MOBILE */}
          <div className="d-block d-lg-none text-center my-3">
            <img
              src={avatar}
              alt="Avatar utente"
              width="60"
              height="60"
              className="rounded-circle border border-light"
              style={{ objectFit: 'cover' }}
            />
          </div>

          {/* MENU */}
          <Nav className="d-flex flex-column flex-lg-row gap-3 align-items-center">
            <Nav.Link
              as={Link}
              to="/"
              className={`glow-button text-center ${location.pathname === '/' ? 'active' : ''} gold-text`}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/novità"
              className={`glow-button text-center ${location.pathname === '/novità' ? 'active' : ''} gold-text`}
            >
              Novità
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/favourites"
              className={`glow-button text-center ${location.pathname === '/favourites' ? 'active' : ''} gold-text`}
            >
              Brani preferiti
            </Nav.Link>
          </Nav>

          {/* SEARCH + AVATAR DESKTOP */}
          <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Cerca testi o artisti"
                className="me-2 rounded glow-button gold-text"
                aria-label="Search"
              />
            </Form>

            <NavDropdown
              title={
                <img
                  src={avatar}
                  alt="Avatar utente"
                  width="50"
                  height="50"
                  className="rounded-circle border border-light d-none d-lg-block"
                  style={{ objectFit: 'cover' }}
                />
              }
              id="profileDropdown"
              align="end"
              className="me-2"
            >
              <NavDropdown.Item as={Link} to="/profilo" className="gold-text">Profilo</NavDropdown.Item>
              <NavDropdown.Item href="#" className="gold-text">Settings</NavDropdown.Item>
              <NavDropdown.Item href="https://www.paypal.com/paypalme/lucaf95" className="gold-text">Sostieni il progetto</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#" className="gold-text">Logout</NavDropdown.Item>
            </NavDropdown>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
