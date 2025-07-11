import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addToFavouriteAction } from './Redux/Action';
import { Link } from 'react-router-dom';
import '../styles/Buttons.css';

const NewSongs = () => {
  const [songsData, setSongsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const fetchData = async () => {
    const artists = ['Alfa', 'Achille Lauro', 'Annalisa', 'Serena Brancale'];

    const fetchPromises = artists.map(artist =>
      fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${artist}`)
        .then(res => res.json())
        .then(data => ({
          artist,
          songs: data.data,
        }))
        .catch(err => {
          console.error(err);
          setError('Errore nel caricamento dei dati');
          return { artist, songs: [] };
        })
    );

    try {
      const allData = await Promise.all(fetchPromises);
      setSongsData(allData);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError('Errore nel caricamento dei dati');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFavouriteClick = (song) => {
    dispatch(addToFavouriteAction(song));
  };

  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh", padding: "2rem" }}>
      <div className="d-flex justify-content-center mb-4">
        <Button className="gold-text bg-black bg-gradient fs-4 glow-button">
          Nuove Uscite
        </Button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {songsData.map((artistData, index) => (
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
                      <Link
                        to={`/search?q=${encodeURIComponent(song.artist.name)}`}
                        className="text-decoration-none gold-text"
                      >
                        {song.artist.name}
                      </Link>
                    </Card.Title>
                    <Button
                      className="me-2 mb-2 glow-button gold-text bg-dark"
                      onClick={() => console.log("Leggi testo per", song.title)}
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
  );
};

export default NewSongs;
