import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavouriteAction, removeFromFavouriteAction } from './Redux/Action';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import '../styles/LyricsPage.css'

const LyricsPage = () => {
  const { artist, title } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const favourites = useSelector(state => state.fav.list);

  const [lyrics, setLyrics] = useState('');
  const [coverUrl, setCoverUrl] = useState(null);
  const [songData, setSongData] = useState(null);

  // Controlla se il brano corrente è tra i preferiti
  const isFavourite = songData && favourites.some(fav => fav.id === songData.id);

  // Toggle preferiti: aggiunge o rimuove il brano
  const handleFavouriteClick = () => {
    if (!songData) return;

    const isAlreadyFavourite = favourites.some(fav => fav.id === songData.id);

    if (isAlreadyFavourite) {
      dispatch(removeFromFavouriteAction(songData));
    } else {
      dispatch(addToFavouriteAction(songData));
    }
  };

  useEffect(() => {
    const fetchLyrics = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/lyrics?artist=${artist}&title=${title}`
        );
        const data = await response.json();
        setLyrics(data.lyrics || '❌ Testo non disponibile');
      } catch (err) {
        console.error('Errore nel caricamento del testo:', err);
        setLyrics('❌ Errore nel recupero del testo');
      }
    };

    const fetchCover = async () => {
      try {
        const response = await fetch(
          `https://striveschool-api.herokuapp.com/api/deezer/search?q=${artist} ${title}`
        );
        const data = await response.json();
        const song = data.data?.[0];
        setSongData(song);

        if (song?.album?.cover_xl) {
          setCoverUrl(song.album.cover_xl);
        }
      } catch (err) {
        console.error('Errore nel recupero della cover:', err);
      }
    };

    fetchLyrics();
    fetchCover();
  }, [artist, title]);

  return (
    <div className="lyrics-page">
      <Container fluid>
        <Button
          variant="dark"
          onClick={() => navigate(-1)}
          className="mb-4 gold-text"
        >
          ← Torna indietro
        </Button>

        <Row className="h-100">
          <Col md={8} className="lyrics-column">
            <div className="lyrics-box gold-text">
              <h3 className="lyrics-title">
                {decodeURIComponent(artist)} – {decodeURIComponent(title)}
              </h3>
              {lyrics ? <pre>{lyrics}</pre> : <Spinner animation="border" />}
            </div>
          </Col>

          <Col md={4} className="d-flex justify-content-center align-items-start">
            {coverUrl ? (
              <div className="w-100">
                <img
                  src={coverUrl}
                  alt="Album Cover"
                  className="lyrics-cover"
                />

                {songData && (
                  <Button
                    className={`glow-button w-100 ${isFavourite ? 'bg-danger' : 'bg-dark'} gold-text`}
                    onClick={handleFavouriteClick}
                  >
                    {isFavourite ? (
                      <>
                        <AiFillHeart className="me-2" /> Rimuovi dai preferiti
                      </>
                    ) : (
                      <>
                        <AiOutlineHeart className="me-2" /> Aggiungi ai preferiti
                      </>
                    )}
                  </Button>
                )}
              </div>
            ) : (
              <div className="lyrics-cover-placeholder w-100" />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LyricsPage;
