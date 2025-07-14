import React, { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavouriteAction, removeFromFavouriteAction } from './Redux/Action';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const isLoggedIn = !!localStorage.getItem("token");
  const navigate = useNavigate();
  const favourites = useSelector(state => state.fav.list);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      try {
        const response = await fetch(
          `https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`
        );
        const data = await response.json();
        setResults(data.data || []);
      } catch (err) {
        console.error('Errore durante la ricerca:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  const handleFavouriteClick = (song) => {
      setErrorMsg('');
  
      if (!isLoggedIn) {
        setErrorMsg("Devi essere loggato per aggiungere ai preferiti");
        return;
      }
  
      const isAlreadyFavourite = favourites.some(fav => fav.id === song.id);
      if (isAlreadyFavourite) {
        dispatch(removeFromFavouriteAction(song));
      } else {
        dispatch(addToFavouriteAction(song));
      }
    };

  return (
    <Container className="text-white mt-4 mb-4">
      <Button className="gold-text glow-button bg-dark">
        Risultati per “{query}”
      </Button>

      {loading ? (
        <Spinner animation="border" />
      ) : (
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
                      {!isLoggedIn && errorMsg && (
                        <Alert variant="danger" className="mt-2">
                          {errorMsg}
                        </Alert>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </Container>
  );
};

export default SearchResults;
