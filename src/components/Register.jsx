import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
const API_URL = process.env.REACT_APP_API_URL;
console.log("ENV API:", process.env.REACT_APP_API_URL);

// Hook per effetto scrittura
const useTypingEffect = (text, speed = 40) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return displayedText;
};

const Register = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    nome: '',
    cognome: '',
    username: '',
    email: '',
    password: ''
  });

  const fields = [
    { key: 'nome', label: 'Nome' },
    { key: 'cognome', label: 'Cognome' },
    { key: 'username', label: 'Username (min 4 caratteri)' },
    { key: 'email', label: 'Email' },
    { key: 'password', label: 'Password (min 4 caratteri)' }
  ];

  const welcomeText = `Beenvenuto/a utente da Luca (o dalla sua essenza digitale)
nella magnifica app creata da me medesimo (o dalla mia essenza reale).
Sei pronto a registrarti?`;

  const typedMessage = useTypingEffect(welcomeText, 40);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert('Registrazione completata con successo!');
        navigate('/login');
      } else {
        const err = await response.json();
        alert('Errore: ' + (err.message || 'Registrazione fallita'));
      }
    } catch (error) {
      alert('Errore di rete: ' + error.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="banner">Capstone Project by Luca Ferrara</div>

      <Container>
        <Row className="justify-content-center align-items-center">
          <Col md={5} className="text-center mb-4 mb-md-0">
            <div className="avatar-container flex-column align-items-center">
              <div className="speech-bubble">{typedMessage}</div>
              <img
                src="/assets/avatar/Avatar-luca-transparent.png"
                alt="Avatar Luca"
                className="avatar-img"
              />
            </div>
          </Col>

          <Col md={6}>
            <div className="form-container">
              <h2 className="gold-text">Registrati</h2>
              <form onSubmit={handleSubmit}>
                {fields.map(({ key, label }) => (
                  <div className="input-group" key={key}>
                    <input
                      type={
                        key === 'email'
                          ? 'email'
                          : key === 'password'
                          ? 'password'
                          : 'text'
                      }
                      required
                      placeholder=" "
                      value={data[key] || ''}
                      onChange={(e) => setData({ ...data, [key]: e.target.value })}
                    />
                    <label>{label}</label>
                  </div>
                ))}

                <button type="submit" className="gold-text mb-2">
                  Registrati
                </button>

                <p>
                  <Link to="/login" className="gold-text">
                    Già registrato? Vai al Log In
                  </Link>
                </p>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
