import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addToFavouriteAction } from './Redux/Action';
import { Button } from 'react-bootstrap';



const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();


  useEffect(() => {
    if (!query) return;
    const fetchResults = async () => {
      try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`);
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

  return (
    <Container className="text-white mt-4 mb-4">
      <button className="gold-text glow-button bg-dark">Risultati per “{query}”</button>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Row className="mt-3 g-5">
          {results.slice(0, 24).map((song, idx) => (
            <Col md={4} key={idx}>
              <Card className="bg-primary text-white border-0 gold-text">
  <Card.Img src={song.album.cover_medium} />
  <Card.Body>
    <Card.Title>{song.title}</Card.Title>
    <Card.Title>
      <Link to={`/search?q=${encodeURIComponent(song.artist.name)}`} className="text-decoration-none gold-text">
      {song.artist.name}
    </Link>
    </Card.Title>

    <div className="d-flex flex-column">
      <Link
        to={`/lyrics/${encodeURIComponent(song.artist.name)}/${encodeURIComponent(song.title)}`}
        className="mb-2"
      >
        <Button className="glow-button gold-text bg-dark w-100">
          Leggi testo
        </Button>
      </Link>

      <Button
        className="glow-button bg-dark gold-text w-100"
        onClick={() => dispatch(addToFavouriteAction(song))}
      >
        Aggiungi ai preferiti
      </Button>
    </div>
  </Card.Body>
</Card>

            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default SearchResults;
