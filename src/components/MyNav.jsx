import { Navbar, Container, Nav, NavDropdown, Form, Row, Col } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "../styles/Navbar.css";
import "../styles/Buttons.css";

const MyNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const avatar = localStorage.getItem("avatar");
  const avatarSrc =
    avatar && avatar !== "null" ? avatar : "/assets/avatar/default.png";

  const [searchValue, setSearchValue] = useState("");
  const [role, setRole] = useState(localStorage.getItem("role"));
  const isLoggedIn = !!localStorage.getItem("token");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchValue)}`);
      setSearchValue("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("avatar");
    navigate("/login");
    dispatch({ type: "RESET_FAVOURITES", payload: [] });
  };

  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    setRole(savedRole);
  }, [location]);

  return (
    <Navbar expand="lg" className="bg-black border-bottom border-body py-2" data-bs-theme="dark">
      <Container fluid>
        <Row className="w-100 align-items-center text-center text-lg-start">
          <Col
            xs={12}
            lg={3}
            className="d-flex flex-column flex-lg-row align-items-center gap-1 justify-content-center justify-content-lg-start mb-2 mb-lg-0 g-0"
          >
            <Navbar.Brand
              as={Link}
              to="/"
              className="d-flex flex-column flex-lg-row align-items-center img.logo ms-2"
            >
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

          <Col xs={12} lg={6} className="mb-3 mb-lg-0">
            <Nav className="d-flex flex-column flex-lg-row gap-3 justify-content-center align-items-center">
              <Nav.Link
                as={Link}
                to="/"
                className={`glow-button bg-black bg-gradient gold-text ${
                  location.pathname === "/" ? "active" : ""
                } rounded-start-pill d-none d-sm-inline-block`}
              >
                Home
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/"
                className={`glow-button bg-black bg-gradient gold-text ${
                  location.pathname === "/" ? "active" : ""
                } d-sm-none`}
              >
                Home
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/novità"
                className={`glow-button bg-black bg-gradient gold-text ${
                  location.pathname === "/novità" ? "active" : ""
                }`}
              >
                Nuove uscite
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/favourites"
                className={`glow-button bg-black bg-gradient gold-text ${
                  location.pathname === "/favourites" ? "active" : ""
                }`}
              >
                Brani preferiti
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/regole"
                className={`glow-button bg-black bg-gradient gold-text ${
                  location.pathname === "/quiz" ? "active" : ""
                }`}
              >
                Quiz
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/lascia-un-commento"
                className={`glow-button bg-black bg-gradient gold-text ${
                  location.pathname === "/lascia-un-commento" ? "active" : ""
                } rounded-end-pill d-none d-sm-inline-block`}
              >
                Lascia un commento
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/lascia-un-commento"
                className={`glow-button bg-black bg-gradient gold-text ${
                  location.pathname === "/lascia-un-commento" ? "active" : ""
                } d-sm-none`}
              >
                Lascia un commento
              </Nav.Link>
            </Nav>
          </Col>

          <Col
            xs={12}
            lg={3}
            className="d-flex flex-column flex-lg-row align-items-center justify-content-center justify-content-lg-end gap-3"
          >
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

              {isLoggedIn && (
                <>
                  <NavDropdown.Item as={Link} to="/profile" className="gold-text">
                    Profilo
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/badge" className="gold-text">
                    Badge
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href="https://www.paypal.com/paypalme/lucaf95"
                    className="gold-text"
                  >
                    Sostieni il progetto
                  </NavDropdown.Item>
                  {role === "ADMIN" && (
                    <NavDropdown.Item as={Link} to="/backoffice" className="gold-text">
                      Backoffice
                    </NavDropdown.Item>
                  )}
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#" className="gold-text" onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
