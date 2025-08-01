import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavouriteAction } from './Redux/Action';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FaInstagram } from 'react-icons/fa';
import LyricCardPreview from './LyricCardPreview';
import html2canvas from 'html2canvas';
import '../styles/LyricsPage.css';
import '../styles/CardShare.css';
import { setPointsForUser } from '../components/Redux/Action/setPoint';

const LyricsPage = () => {
  const { artist, title } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.fav.list);

  const [lyrics, setLyrics] = useState('');
  const [coverUrl, setCoverUrl] = useState(null);
  const [songData, setSongData] = useState(null);
  const [highlightedText, setHighlightedText] = useState('');
  const [recentlyAwardedId, setRecentlyAwardedId] = useState(null);
  const [showPointsMessage, setShowPointsMessage] = useState(false);
  const [limitReachedId, setLimitReachedId] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const API_URL = "https://marvellous-suzy-lucaferr-65236e6e.koyeb.app"; 
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;
  const payload = token ? JSON.parse(atob(token.split(".")[1])) : null;
  const userId = payload?.id;

  const handleGenerateCard = () => {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText) {
      setHighlightedText(selectedText);
    }
  };

  const exportCardAsImage = () => {
    const cardElement = document.getElementById('card-to-export');
    if (!cardElement) return;

    html2canvas(cardElement, { useCORS: true }).then((canvas) => {
      const link = document.createElement('a');
      link.download = `Quote_${title.replace(/\s+/g, '_')}.png`;
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  const isFavourite = songData && favourites.some((fav) => fav.id === songData.id);

  const handleFavouriteClick = (song) => {
    const today = new Date().toISOString().split("T")[0];
    const storedPoints = localStorage.getItem(`points_${userId}`) || "0";
    const currentPoints = parseInt(storedPoints);
    const additionsToday = parseInt(localStorage.getItem(`additions_${userId}_${today}`)) || 0;

    if (!isLoggedIn) {
      setErrorMsg("Devi essere loggato per aggiungere ai preferiti");
      return;
    }

    const isAlreadyFavourite = favourites.some((fav) => fav.id === song.id);
    if (isAlreadyFavourite) return;

    if (additionsToday >= 4) {
      setLimitReachedId(song.id);
      return;
    }

    dispatch(addToFavouriteAction(song));
    setRecentlyAwardedId(song.id);

    const newPoints = currentPoints + 5;
    const newAdditions = additionsToday + 1;

    dispatch(setPointsForUser(userId, newPoints));
    localStorage.setItem(`points_${userId}`, newPoints.toString());
    localStorage.setItem(`additions_${userId}_${today}`, newAdditions.toString());

    setShowPointsMessage(true);
    setTimeout(() => setShowPointsMessage(false), 3000);
  };

  useEffect(() => {
    const fetchLyrics = async () => {
      try {
        const response = await fetch(`${API_URL}/api/lyrics?artist=${artist}&title=${title}`);
        const data = await response.json();
        setLyrics(data.lyrics || 'Testo non disponibile');
      } catch (err) {
        console.error('Errore nel caricamento del testo:', err);
        setLyrics('Errore nel recupero del testo');
      }
    };

    const fetchCover = async () => {
      try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${artist} ${title}`);
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
        <Button variant="dark" onClick={() => navigate(-1)} className="mb-4 gold-text">
          ← Torna indietro
        </Button>

        <Row>
          <Col md={8} className="lyrics-column">
            <div className="lyrics-box gold-text">
              <h3 className="lyrics-title">
                {decodeURIComponent(artist)} – {decodeURIComponent(title)}
              </h3>

              <div>
                {lyrics ? (
                  <div className="karaoke-area gold-text">
                    {lyrics.split('\n').map((line, index) => (
                      <p key={index} className="karaoke-line">{line}</p>
                    ))}
                  </div>
                ) : (
                  <Spinner animation="border" />
                )}
              </div>

              <LyricCardPreview
                line={highlightedText}
                artist={artist}
                title={title}
                coverUrl={coverUrl}
                exportCardAsImage={exportCardAsImage}
              />
            </div>
          </Col>

          <Col md={4}>
            <div className="w-100">
              {coverUrl ? (
                <img src={coverUrl} alt="Album Cover" className="lyrics-cover mb-3" />
              ) : (
                <div className="lyrics-cover-placeholder" />
              )}

              {songData && (
                <>
                  <Button
                    className={`glow-button w-100 mb-3 ${isFavourite ? 'bg-danger' : 'bg-dark'} gold-text`}
                    onClick={() => handleFavouriteClick(songData)}
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

                  {recentlyAwardedId === songData.id && (
                    <div className="mt-2 gold-text fw-bold text-center">+5 punti ricevuti</div>
                  )}

                  {limitReachedId === songData.id && (
                    <Alert variant="warning" className="text-center fw-bold mt-2">
                      Hai già raggiunto il limite giornaliero di punti per l'aggiunta ai preferiti
                    </Alert>
                  )}
                </>
              )}

              {!isLoggedIn && errorMsg && (
                <Alert variant="danger" className="mt-2">{errorMsg}</Alert>
              )}

              <Button
                onClick={handleGenerateCard}
                className="glow-button bg-dark w-100 mt-2 d-flex justify-content-center align-items-center instagram-btn gold-text"
              >
                <FaInstagram className="mt-3 me-4 gold-text" size={20} />
                Seleziona frasi e <br />
                condividile nelle stories
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LyricsPage;
