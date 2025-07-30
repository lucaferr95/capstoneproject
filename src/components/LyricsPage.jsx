import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToFavouriteAction,
  removeFromFavouriteAction,
} from './Redux/Action';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FaInstagram } from 'react-icons/fa';
import LyricCardPreview from './LyricCardPreview';
import html2canvas from 'html2canvas';
import '../styles/LyricsPage.css';
import '../styles/CardShare.css';

const LyricsPage = () => {
  const { artist, title } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.fav.list);

  const [lyrics, setLyrics] = useState('');
  const [coverUrl, setCoverUrl] = useState(null);
  const [songData, setSongData] = useState(null);
  const [highlightedText, setHighlightedText] = useState('');
  const API_URL = "https://marvellous-suzy-lucaferr-65236e6e.koyeb.app"; 
  const handleGenerateCard = () => {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText) {
      setHighlightedText(selectedText);
    }
  };

  const exportCardAsImage = () => {
    const cardElement = document.getElementById('card-to-export');
    if (!cardElement) return;

    const img = cardElement.querySelector('img');
    if (img && !img.complete) {
      img.onload = () => {
        html2canvas(cardElement, { useCORS: true }).then((canvas) => {
          const link = document.createElement('a');
          link.download = `Quote_${title.replace(/\s+/g, '_')}.png`;
          link.href = canvas.toDataURL();
          link.click();
        });
      };
      return;
    }

    html2canvas(cardElement, { useCORS: true }).then((canvas) => {
      const link = document.createElement('a');
      link.download = `Quote_${title.replace(/\s+/g, '_')}.png`;
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  const isFavourite =
    songData && favourites.some((fav) => fav.id === songData.id);

  const handleFavouriteClick = () => {
    if (!songData) return;
    const exists = favourites.some((fav) => fav.id === songData.id);
    exists
      ? dispatch(removeFromFavouriteAction(songData))
      : dispatch(addToFavouriteAction(songData));
  };

  useEffect(() => {
    const fetchLyrics = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/lyrics?artist=${artist}&title=${title}`
        );
        const data = await response.json();
        setLyrics(data.lyrics || 'Testo non disponibile');
      } catch (err) {
        console.error('Errore nel caricamento del testo:', err);
        setLyrics('Errore nel recupero del testo');
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
                      <p key={index} className="karaoke-line">
                        {line}
                      </p>
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
                <img
                  src={coverUrl}
                  alt="Album Cover"
                  className="lyrics-cover mb-3"
                />
              ) : (
                <div className="lyrics-cover-placeholder" />
              )}

              {songData && (
                <Button
                  className={`glow-button w-100 mb-3 ${
                    isFavourite ? 'bg-danger' : 'bg-dark'
                  } gold-text`}
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
