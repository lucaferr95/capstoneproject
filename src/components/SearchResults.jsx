import React, { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavouriteAction } from './Redux/Action';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { addPoints } from "../components/Redux/Action/setPoint";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [recentlyAwardedId, setRecentlyAwardedId] = useState(null);
  const [showPointsMessage, setShowPointsMessage] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  const favourites = useSelector((state) => state.fav.list);

  //Limite punteggio per aggiunte ai preferiti
  const POINTS_LIMIT = 4;
  const POINTS_AMOUNT = 5;
  const POINTS_DATE_KEY = "favourite_points_date";
  const POINTS_COUNT_KEY = "favourite_points_count";
  
    // Funzione per controllare se l'utente può ancora guadagnare punti(5 punti x max 4 volte al gg)

  const canEarnPoints = () => {
    const today = new Date().toISOString().slice(0, 10);
    const lastDate = localStorage.getItem(POINTS_DATE_KEY);
    let count = parseInt(localStorage.getItem(POINTS_COUNT_KEY)) || 0;

    if (lastDate !== today) {
      localStorage.setItem(POINTS_DATE_KEY, today);
      localStorage.setItem(POINTS_COUNT_KEY, "1");
      return true;
    }

    if (count >= POINTS_LIMIT) {
      return false;
    }

    localStorage.setItem(POINTS_COUNT_KEY, (count + 1).toString());
    return true;
  };

  useEffect(() => {
    if (!query) return;
    
    //recupero dati da deezer
    const fetchResults = async () => {
      try {
        const response = await fetch(
          `https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`
        );
        const data = await response.json();
        setResults(data.data || []);
      } catch (err) {
        console.error("Errore durante la ricerca:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);
  
  // Aggiunta ai preferiti e gestione punti
  const handleFavouriteClick = (song) => {
    setErrorMsg("");

    if (!isLoggedIn) {
      setErrorMsg("Devi essere loggato per aggiungere ai preferiti");
      return;
    }

    const isAlreadyFavourite = favourites.some((fav) => fav.id === song.id);

    if (!isAlreadyFavourite) {
      dispatch(addToFavouriteAction(song));

      if (canEarnPoints()) {
        dispatch(addPoints(POINTS_AMOUNT));
        setRecentlyAwardedId(song.id);
        setShowPointsMessage(true);
        setTimeout(() => setShowPointsMessage(false), 3000);
      } else {
        console.log("Limite giornaliero raggiunto, niente punti aggiunti");
      }
    }
  };

  return (
    <Container className="text-white mt-4 mb-4">
      <Button className="gold-text glow-button bg-dark">
        Risultati per “{query || '...' }”
      </Button>

      {loading ? (
        <Spinner animation="border" />
      ) : (
        // Messaggio visivo temporaneo se l'utente guadagna punti
        <>
        
          {showPointsMessage && (
            <Alert variant="success" className="text-center fw-bold">
              +5 punti ricevuti
            </Alert>
          )}

          <Row className="mt-3 g-5">
            {results.slice(0, 24).map((song, idx) => {
              const isFavourite = favourites.some(fav => fav.id === song.id);

              return (
                <Col md={4} key={idx}>
                  <Card className="bg-primary text-white border-0 gold-text">
                    <Card.Img src={song.album.cover_medium} />
                    <Card.Body>
                      <Card.Title>{song.title}</Card.Title>
                      <Card.Title>
                        <Link
                          to={`/search?q=${encodeURIComponent(song.artist.name)}`}
                          className="text-decoration-none gold-text"
                        >
                          {song.artist.name}
                        </Link>
                      </Card.Title>

                      <div className="d-flex flex-column">
                        <Button
                          className="me-2 mb-2 glow-button gold-text bg-dark"
                          onClick={() =>
                            navigate(`/lyrics/${encodeURIComponent(song.artist.name)}/${encodeURIComponent(song.title)}`)
                          }
                        >
                          Leggi testo
                        </Button>

                        <Button
                          className={`glow-button w-100 ${isFavourite ? 'bg-danger' : 'bg-dark'} gold-text`}
                          onClick={() => handleFavouriteClick(song)}
                        >
                          {isFavourite ? (
                            <>
                              <AiFillHeart className="me-2" />
                              Rimuovi dai preferiti
                            </>
                          ) : (
                            <>
                              <AiOutlineHeart className="me-2" />
                              Aggiungi ai preferiti
                            </>
                          )}
                        </Button>

                        {recentlyAwardedId === song.id && (
                          <div className="mt-2 gold-text fw-bold text-center">+5 punti ricevuti</div>
                        )}

                        {!isLoggedIn && errorMsg && (
                          <Alert variant="danger" className="mt-2">{errorMsg}</Alert>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </>
      )}
    </Container>
  );
};

export default SearchResults;
