import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import '../styles/Login.css';





// Hook riutilizzato per effetto scrittura
const useTypingEffect = (text, speed = 40) => {
  const [displayedText, setDisplayedText] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const welcomeText = `Già registrato? Accedi pure.
  Ti dò il permesso...
   (Almeno per oggi ehehe)`;
  const typedMessage = useTypingEffect(welcomeText, 40);

  // Gestione invio form di login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error('Credenziali non valide');

      const token = await response.text();
      localStorage.setItem('token', token);
      localStorage.setItem('username', data.username); // Salva username al login

      // Recupera preferiti dell’utente e aggiorna Redux
      const userFavs = JSON.parse(localStorage.getItem(`favourites_${data.username}`)) || [];
      dispatch({ type: 'RESET_FAVOURITES', payload: userFavs });

      navigate('/');
    } catch (err) {
      setError('Login fallito: ' + err.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="banner gold-text">Capstone Project by Luca Ferrara</div>

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
              <h2 className="gold-text">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <input
                    type="text"
                    required
                    placeholder=" "
                    value={data.username}
                    onChange={(e) => setData({ ...data, username: e.target.value })}
                  />
                  <label>Username</label>
                </div>

                <div className="input-group">
                  <input
                    type="password"
                    required
                    placeholder=" "
                    value={data.password}
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                  />
                  <label>Password</label>
                </div>

                <button type="submit" className="gold-text mb-2">Login</button>
                {error && <div className="error">{error}</div>}

                <p>
                  <Link to="/register" className="gold-text">
                    Non hai un account? Registrati
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

export default Login;
