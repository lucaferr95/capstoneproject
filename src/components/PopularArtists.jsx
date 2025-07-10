import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addToFavouriteAction } from './Redux/Action';
import { useNavigate } from 'react-router-dom';
import QuoteOfTheDay from './QuoteOfTheDay'; 
import { Link } from 'react-router-dom';

const PopularArtists = () => {
  const dispatch = useDispatch();
  const [popularData, setPopularData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const internationalArtists = ['Taylor Swift', 'The Weeknd', 'Drake', 'Adele'];
  const italianArtists = ['Marco Mengoni', 'Mahmood', 'Ultimo', 'Giorgia'];

  const fetchSongsByArtists = async (artists) => {
    return Promise.all(
      artists.map((artist) =>
        fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${artist}`)
          .then((res) => res.json())
          .then((data) => ({
            artist,
            songs: data.data,
          }))
          .catch((err) => {
            console.error(err);
            setError('Errore nel caricamento dei dati');
            return { artist, songs: [] };
          })
      )
    );
  };

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [internationalData, italianData] = await Promise.all([
          fetchSongsByArtists(internationalArtists),
          fetchSongsByArtists(italianArtists),
        ]);
        setPopularData([
          { title: 'Artisti internazionali più popolari', data: internationalData },
          { title: 'Artisti italiani più popolari', data: italianData },
        ]);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError('Errore nel caricamento dei dati');
      }
    };
    fetchAll();
  }, []);

  const handleFavouriteClick = (song) => {
    dispatch(addToFavouriteAction(song));
  };

  return (
    <div style={{ backgroundColor: '#ffffff', padding: '2rem' }}>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {/*Frase del giorno prima delle sezioni */}
      <QuoteOfTheDay />

      {popularData.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-5">
          <div className="d-flex justify-content-center mb-4">
            <Button className="gold-text bg-black bg-gradient fs-4 glow-button">
              {section.title}
            </Button>
          </div>

          {section.data.map((artistData, index) => (
            <section key={index} className="mb-5 text-center">
                      <Link to={`/search?q=${encodeURIComponent(artistData.artist)}`}>
              <Button className="gold-text bg-primary bg-gradient btn-fixed fs-3 glow-button mb-3">
                {artistData.artist}
              </Button>
            </Link>
              <Row className="g-5">
                {artistData.songs.slice(0, 4).map((song, idx) => (
                  <Col md={3} key={idx}>
                    <Card className="bg-primary text-white border-0 gold-text">
                      <Card.Img src={song.album.cover_medium} />
                      <Card.Body>
                        <Card.Title>{song.title}</Card.Title>
                        <Card.Title>
      <Link to={`/search?q=${encodeURIComponent(song.artist.name)}`} className="text-decoration-none gold-text">
      {song.artist.name}
    </Link>
    </Card.Title>
                        <Button
                          className="me-2 mb-2 glow-button gold-text bg-dark"
                          onClick={() =>
                            navigate(
                              `/lyrics/${encodeURIComponent(song.artist.name)}/${encodeURIComponent(song.title)}`
                            )
                          }
                        >
                          Leggi testo
                        </Button>
                        <Button
                          className="glow-button gold-text bg-dark"
                          onClick={() => handleFavouriteClick(song)}
                        >
                          Aggiungi ai preferiti
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </section>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PopularArtists;
