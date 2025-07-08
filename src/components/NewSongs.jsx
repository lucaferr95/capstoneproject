import React, { useState, useEffect } from 'react';
import { Carousel, Row, Col, Card, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';  // Importa useDispatch
import { addToFavouriteAction } from './Redux/Action';

const NewSongs = () => {
  const [songsData, setSongsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const dispatch = useDispatch();  // Usa dispatch per inviare l'azione

  const fetchData = async () => {
    const artists = ['MarcoMengoni', 'Anitta', 'AnaMena', 'Annalisa'];

    const fetchPromises = artists.map(artist => {
      return fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${artist}`)
        .then(response => response.json())
        .then(data => ({
          artist,
          songs: data.data,
        }))
        .catch(err => {
          console.error(err);
          setError('Errore nel caricamento dei dati');
        });
    });

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
    dispatch(addToFavouriteAction(song)); // Aggiungi alla lista dei preferiti
  };

  const renderCarousels = () => {
    return songsData.map((artistData, index) => (
      <section key={index} className="mb-4">
        <h4 className='pt-4 text-center'>NUOVE USCITE</h4>
        <h4 className="text-white">{artistData.artist}</h4>
        <Carousel interval={3000} controls={true} indicators={true}> {/* Imposta l'intervallo per il carosello */}
          <Carousel.Item>
            <Row className="g-3">
              {artistData.songs.slice(0, 4).map((song, idx) => (
                <Col md={3} key={idx}>
                  <Card className="bg-dark text-white border-0">
                    <Card.Img src={song.album.cover} alt={song.title} />
                    <Card.Body>
                      <Card.Title>{song.title}</Card.Title>
                      <Button 
                        className="glow-button"
                        onClick={() => handleFavouriteClick(song)} 
                      >
                        Aggiungi ai preferiti
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        </Carousel>
      </section>
    ));
  };

  return (
    <div className="text-white bg-black">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {renderCarousels()}
    </div>
  );
};

export default NewSongs;
