import { useState, useEffect, useRef } from "react";
import { Container, Row, Col, ListGroup, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Profile = () => {
  // Recupera il token JWT dal localStorage per autenticazione
  const token = localStorage.getItem("token");
  const [avatar, setAvatar] = useState(localStorage.getItem("avatar"));

    // Reference per il campo input file (usato per avatar)
  const avatarInputRef = useRef();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    artist: "",
    quote: "",
    album: "",
    tracks: "",
    avatar: ""
  });

  // Recupera informazioni utente (nome, username, avatar)  useEffect(() => {
  useEffect(() => {
  fetch("http://localhost:8080/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data => {
      setFormData(prev => ({
        ...prev,
        name: data.nome ?? "",
        username: data.username ?? "",
        avatar: data.avatar ?? ""
      }));
    })
    .catch(err => console.error("Errore nel recupero utente:", err));
}, []);


  // Recupera i dati musicali
  useEffect(() => {
    fetch("http://localhost:8080/profile/me", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setFormData(prev => ({
          ...prev,
          artist: data.artist ?? "",
          quote: data.quote ?? "",
          album: data.album ?? "",
          tracks: data.tracks ?? ""
        }));
      })
      .catch(error => {
        console.error("Errore nel recupero profilo:", error);
      });
  }, []);

  const handleChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value ?? ""
    }));
  };
    // Salva profilo musicale nel backend e localStorage
  const handleSaveProfile = () => {
    const profileData = {
      artist: formData.artist,
      quote: formData.quote,
      album: formData.album,
      tracks: formData.tracks
    };

    fetch("http://localhost:8080/profile/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(profileData)
    })
      .then(res => {
        if (!res.ok) throw new Error(`Errore salvataggio ${res.status}`);
        return res.json();
      })
      .then(() => {
        localStorage.setItem("profileData", JSON.stringify(formData));
        localStorage.setItem("username", formData.username);
        alert("Modifiche salvate!");
      })
      .catch(err => {
        console.error("Errore durante il salvataggio:", err);
      });
  };
    // Invia immagine avatar al backend e aggiorna stato + localStorage

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const form = new FormData();
    form.append("file", file);
    console.log("Token per upload:", token);


    fetch("http://localhost:8080/users/me/avatar", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: form
    })
      .then(res => {
        if (!res.ok) throw new Error(`Errore avatar ${res.status}`);
        return res.text();
      })
      .then(url => {
        setFormData(prev => ({
          ...prev,
          avatar: url
        }));
        localStorage.setItem("avatar", url);
        setAvatar(url); //al cambiamento di avatar nel profilo, si aggiorna quello nella navbar

      })
      .catch(err => console.error("Errore avatar:", err));
  };

  return (
    
    <Container className="mt-3 mb-3 feedback bg-black bg-gradient p-5 gold-text">
      <h3 className="gold-text text-center mb-4">Il tuo profilo</h3> 
      {/*Sezione avatar + tasto per cambiare foto */}
      <Row className="justify-content-center mb-4"> 
        <Col md="auto" className="text-center">
          <img
            src={formData.avatar || "/assets/avatar/default.png"}
            alt="Profile"
            className="profile-img img-fluid rounded-circle w-25 h-auto mb-3"
          />
          <Button
            variant="outline-warning"
            className="w-25 rounded-5 bg-black bg-gradient gold-text glow-button ms-2"
            onClick={() => avatarInputRef.current.click()}
          >
            Cambia <br /> foto
          </Button>
          <Form.Control
            type="file"
            accept="image/*"
            className="d-none"
            ref={avatarInputRef}
            onChange={handleAvatarUpload}
          />
        </Col>
      </Row>
     

      <Row className="justify-content-center align-items-start">

         {/*col sinistra con form preferenze */}

        <Col md={6}>
          <h5 className="gold-text mb-4 text-center">Imposta le tue preferenze</h5>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="gold-text">Il tuo nome</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={handleChange("name")}
                placeholder="Inserisci il tuo nome"
                className="bg-dark text-warning border-warning"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="gold-text">Username</Form.Label>
              <Form.Control
                type="text"
                value={formData.username}
                onChange={handleChange("username")}
                placeholder="Inserisci il tuo username"
                className="bg-dark text-warning border-warning"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="gold-text">Artisti preferiti</Form.Label>
              <Form.Control
                type="text"
                value={formData.artist}
                onChange={handleChange("artist")}
                placeholder="Es. Mahmood, Mengoni"
                className="bg-dark text-warning border-warning"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="gold-text">Brani preferiti</Form.Label>
              <Form.Control
                type="text"
                value={formData.tracks}
                onChange={handleChange("tracks")}
                placeholder="Es. Blinding Lights, Il cielo è sempre più blu"
                className="bg-dark text-warning border-warning"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="gold-text">Frase musicale</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={formData.quote}
                onChange={handleChange("quote")}
                placeholder="Una frase che ti rappresenta"
                className="bg-dark text-warning border-warning"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="gold-text">Dischi da acquistare</Form.Label>
              <Form.Control
                type="text"
                value={formData.album}
                onChange={handleChange("album")}
                placeholder="Es. AM – Arctic Monkeys, El Mal Querer"
                className="bg-dark text-warning border-warning"
              />
            </Form.Group>

            <Button variant="warning" className="text-dark fw-bold mb-5" onClick={handleSaveProfile}>
              Salva modifiche
            </Button>
          </Form>
        </Col>

        <Col md={5} className="me-3">

         {/*col destra con scheda profilo */}

          <h5 className="gold-text mb-5 text-center">Scheda profilo</h5>
          <ListGroup className="w-100 rounded-0 mb-5 ms-3 profile-menu">
            <ListGroup.Item className="profile-item">
              <span className="label">Il tuo nome:</span>
              <span className="value ms-2">{formData.name || "—"}</span>
            </ListGroup.Item>

            <ListGroup.Item className="profile-item">
              <span className="label">Username:</span>
              <span className="value ms-2">{formData.username || "—"}</span>
            </ListGroup.Item>

            <ListGroup.Item className="profile-item">
              <span className="label">Artisti preferiti:</span>
              {formData.artist ? (
                formData.artist.split(",").map((name, index) => (
                  <Link
                    key={index}
                    to={`/search?q=${encodeURIComponent(name.trim())}`}
                    className="gold-text text-decoration-none ms-2 me-2"
                  >
                    {name.trim()}
                  </Link>
                ))
              ) : (
                <span className="value ms-2">—</span>
              )}
            </ListGroup.Item>

            <ListGroup.Item className="profile-item">
              <span className="label">Brani preferiti:</span>
              {formData.tracks ? (
                formData.tracks.split(",").map((title, index) => (
                  <Link
                    key={index}
                    to={`/search?q=${encodeURIComponent(title.trim())}`}
                    className="gold-text text-decoration-none ms-2 me-2"
                  >
                    {title.trim()}
                  </Link>
                ))
              ) : (
                      <span className="value ms-2">—</span>
              )}
            </ListGroup.Item>

            <ListGroup.Item className="profile-item">
              <span className="label">Frase musicale:</span>
              <span className="value ms-2">{formData.quote || "—"}</span>
            </ListGroup.Item>

            <ListGroup.Item className="profile-item">
              <span className="label">Dischi da acquistare:</span>
              <span className="value ms-2">{formData.album || "—"}</span>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
