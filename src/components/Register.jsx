import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';



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

  const welcomeText = `Beenvenuto/a utente da Luca (o dalla sua essenza digitale)
nella magnifica app creata da me medesimo (o dalla mia essenza reale).
Sei pronto a registrarti?`;
  const typedMessage = useTypingEffect(welcomeText, 40); // valore piu alto= velocita piu lenta

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/auth/register', {
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
              <h2 className='gold-text'>Registrati</h2>
              <form onSubmit={handleSubmit}>
                {['nome', 'cognome', 'username', 'email', 'password'].map((field) => (
                  <div className="input-group" key={field}>
                    <input
                      type={field === 'email' ? 'email' : field === 'password' ? 'password' : 'text'}
                      required
                      placeholder=" "
                      value={data[field]}
                      onChange={(e) => setData({ ...data, [field]: e.target.value })}
                    />
                    <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  </div>
                ))}

                <button type="submit" className='gold-text mb-2'>Registrati</button>

                <p>
                  <Link to="/login" className='gold-text'>Già registrato? Vai al Log In</Link>
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
