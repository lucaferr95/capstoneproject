import { Navbar, Container, Nav, NavDropdown, Form, Row, Col } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import '../styles/Navbar.css';
import '../styles/Buttons.css';

const MyNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Recupera avatar da localStorage o fallback al default
  const avatar = localStorage.getItem("avatar");
  const avatarSrc = avatar && avatar !== "null"
    ? avatar
    : "/assets/avatar/default.png";

  const [searchValue, setSearchValue] = useState('');

  // Verifica se l'utente è autenticato (token presente)
  const isLoggedIn = !!localStorage.getItem("token");

  // 🔎 Funzione per gestire la ricerca
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchValue)}`);
      setSearchValue('');
    }
  };

  // Funzione per il logout
  const handleLogout = () => {
    localStorage.removeItem("token");           // Rimuove token dal localStorage
    localStorage.removeItem("username");        // Rimuove username
    localStorage.removeItem("avatar");          // Rimuove avatar
    navigate("/login");                         // Reindirizza alla login
    dispatch({ type: 'RESET_FAVOURITES', payload: [] }); // Resetta preferiti
  };

  return (
    <Navbar expand="lg" className="bg-black border-bottom border-body py-2" data-bs-theme="dark">
      <Container fluid>
        <Row className="w-100 align-items-center text-center text-lg-start">
          
          {/* Colonna 1: Logo + Titolo */}
          <Col xs={12} lg={3} className="d-flex flex-column flex-lg-row align-items-center gap-1 justify-content-center justify-content-lg-start mb-2 mb-lg-0 g-0">
            <Navbar.Brand as={Link} to="/" className="d-flex flex-column flex-lg-row align-items-center img.logo ms-2">
              <img
                src="/assets/logo/logo fuori di testo 2.PNG"
                alt="logo"
                width="150"
                className="mb-1 mx-2"
              />
              <div className="app-title">
                <span className="script">Fuori di</span>
                <span className="script">testo</span>
              </div>
            </Navbar.Brand>
          </Col>

          {/* Colonna 2: Nav Links */}
          <Col xs={12} lg={6} className="mb-3 mb-lg-0">
  <Nav className="d-flex flex-column flex-lg-row gap-3 justify-content-center align-items-center">
    {/* Home — con bordo solo su desktop */}
    <Nav.Link
      as={Link}
      to="/"
      className={`glow-button bg-black bg-gradient gold-text ${location.pathname === "/" ? "active" : ""} rounded-start-pill d-none d-sm-inline-block`}
    >
      Home
    </Nav.Link>

    {/* Versione mobile di Home senza pill */}
    <Nav.Link
      as={Link}
      to="/"
      className={`glow-button bg-black bg-gradient gold-text ${location.pathname === "/" ? "active" : ""} d-sm-none`}
    >
      Home
    </Nav.Link>

    {/* Novità */}
    <Nav.Link
      as={Link}
      to="/novità"
      className={`glow-button bg-black bg-gradient gold-text ${location.pathname === "/novità" ? "active" : ""}`}
    >
      Novità
    </Nav.Link>

    {/* Testi preferiti */}
    <Nav.Link
      as={Link}
      to="/favourites"
      className={`glow-button bg-black bg-gradient gold-text ${location.pathname === "/favourites" ? "active" : ""}`}
    >
      Testi preferiti
    </Nav.Link>

    {/* Quiz */}
    <Nav.Link
      as={Link}
      to="/quiz"
      className={`glow-button bg-black bg-gradient gold-text ${location.pathname === "/quiz" ? "active" : ""}`}
    >
      Quiz
    </Nav.Link>

    {/* Lascia un commento — desktop con bordo */}
    <Nav.Link
      as={Link}
      to="/lascia-un-commento"
      className={`glow-button bg-black bg-gradient gold-text ${location.pathname === "/lascia-un-commento" ? "active" : ""} rounded-end-pill d-none d-sm-inline-block`}
    >
      Lascia un commento
    </Nav.Link>

    {/* Mobile senza pill */}
    <Nav.Link
      as={Link}
      to="/lascia-un-commento"
      className={`glow-button bg-black bg-gradient gold-text ${location.pathname === "/lascia-un-commento" ? "active" : ""} d-sm-none`}
    >
      Lascia un commento
    </Nav.Link>
  </Nav>
</Col>


          {/* Colonna 3: Search + Avatar + Menu */}
          <Col xs={12} lg={3} className="d-flex flex-column flex-lg-row align-items-center justify-content-center justify-content-lg-end gap-3">
            
            {/* Barra di ricerca */}
            <Form className="d-flex w-100 w-lg-auto" onSubmit={handleSearch}>
              <Form.Control
                type="search"
                placeholder="Cerca brani o artisti"
                className="me-2 rounded glow-button gold-text bg-black bg-gradient"
                aria-label="Search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </Form>

            {/* 👤 Avatar + Dropdown utente */}
            <NavDropdown
              title={
                <img
                  src={avatarSrc}
                  alt="Avatar utente"
                  width="50"
                  height="50"
                  className="rounded-circle border border-light"
                  style={{ objectFit: "cover" }}
                />
              }
              id="profileDropdown"
              align="end"
            >
              <NavDropdown.Item as={Link} to="/profile" className="gold-text">
                Profilo
              </NavDropdown.Item>

              {/* Mostra Login/Registrati solo se l'utente NON è loggato */}
              {!isLoggedIn && (
                <>
                  <NavDropdown.Item as={Link} to="/login" className="gold-text">
                    Login
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/register" className="gold-text">
                    Registrati
                  </NavDropdown.Item>
                </>
              )}

              <NavDropdown.Item href="#" className="gold-text">
                Settings
              </NavDropdown.Item>
              <NavDropdown.Item href="https://www.paypal.com/paypalme/lucaf95" className="gold-text">
                Sostieni il progetto
              </NavDropdown.Item>

              <NavDropdown.Divider />

              {/* Mostra Logout solo se l'utente è loggato */}
              {isLoggedIn && (
                <NavDropdown.Item href="#" className="gold-text" onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              )}
            </NavDropdown>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
