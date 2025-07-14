import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavouriteAction, removeFromFavouriteAction } from './Redux/Action';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import '../styles/Buttons.css';

const NewSongs = () => {
  const [songsData, setSongsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favourites = useSelector(state => state.fav.list);

  useEffect(() => {
    const fetchData = async () => {
      const artists = ['Annalisa', 'Achille Lauro', 'Lazza', 'Serena Brancale'];

      try {
        const fetchPromises = artists.map(artist =>
          fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${artist}`)
            .then(res => res.json())
            .then(data => ({ artist, songs: data.data }))
            .catch(() => ({ artist, songs: [] }))
        );

        const allData = await Promise.all(fetchPromises);
        setSongsData(allData);
        setLoading(false);
      } catch {
        setError('Errore nel caricamento dei dati');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFavouriteClick = (song) => {
    const isAlreadyFavourite = favourites.some(fav => fav.id === song.id);
    if (isAlreadyFavourite) {
      dispatch(removeFromFavouriteAction(song));
    } else {
      dispatch(addToFavouriteAction(song));
    }
  };

  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh", padding: "2rem" }}>
      <div className="d-flex justify-content-center mb-4">
        <Button className="gold-text bg-black bg-gradient fs-4 glow-button">Nuove Uscite</Button>
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
            {artistData.songs.slice(0, 4).map((song, idx) => {
              const isFavourite = favourites.some(fav => fav.id === song.id);

              return (
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
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </section>
      ))}
    </div>
  );
};

export default NewSongs;
