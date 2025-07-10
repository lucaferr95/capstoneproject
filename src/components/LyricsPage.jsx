import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addToFavouriteAction } from './Redux/Action';



const LyricsPage = () => {
  const { artist, title } = useParams();
  const navigate = useNavigate();
  const [lyrics, setLyrics] = useState('');
  const [coverUrl, setCoverUrl] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchLyrics = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/lyrics?artist=${artist}&title=${title}`);
        const data = await response.json();
        setLyrics(data.lyrics || '❌ Testo non disponibile');
      } catch (err) {
        console.error('Errore nel caricamento del testo:', err);
        setLyrics('❌ Errore nel recupero del testo');
      }
    };

    const fetchCover = async () => {
      try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${artist} ${title}`);
        const data = await response.json();
        const song = data.data?.[0];
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
        <Button variant="dark" onClick={() => navigate(-1)} className="mb-4 gold-text">
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
              <Button
      className="glow-button gold-text bg-dark w-100 mt-3"
      onClick={() =>
        dispatch(addToFavouriteAction({
          title: decodeURIComponent(title),
          artist: { name: decodeURIComponent(artist) },
          album: { cover_medium: coverUrl || '' }
        }))
      }
    >
      Aggiungi ai preferiti
    </Button>
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
