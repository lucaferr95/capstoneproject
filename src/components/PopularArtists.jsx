import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavouriteAction, removeFromFavouriteAction } from './Redux/Action';
import { useNavigate, Link } from 'react-router-dom';
import QuoteOfTheDay from './QuoteOfTheDay';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import '../styles/Buttons.css';
import MicRecorder from 'mic-recorder-to-mp3-fixed';
import { addPoints } from "../components/Redux/Action/setPoint";


const PopularArtists = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favourites = useSelector(state => state.fav.list);
  const isLoggedIn = !!localStorage.getItem("token");

  const [popularData, setPopularData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [listening, setListening] = useState(false);
  const [recognizedSong, setRecognizedSong] = useState(null);

  const recorder = new MicRecorder({ bitRate: 192 });
  const [recentlyAwardedId, setRecentlyAwardedId] = useState(null);
 const [showPointsMessage, setShowPointsMessage] = useState(false);
  
  const internationalArtists = ['Taylor Swift', 'Coldplay', 'The Weeknd', 'Adele'];
  const italianArtists = ['Marco Mengoni', 'Mahmood', 'Ultimo', 'Giorgia'];
 


  // Recupero i dati da Deezer
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
          setError("Errore nel caricamento dei dati");
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
        { title: "Artisti internazionali più popolari", data: internationalData },
        { title: "Artisti italiani più popolari", data: italianData },
      ]);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("Errore nel caricamento dei dati");
    }
  };
  fetchAll();
}, []);

// Aggiunta ai preferiti e gestione punti
const handleFavouriteClick = (song) => {
  if (!isLoggedIn) {
    setErrorMsg("Devi essere loggato per aggiungere ai preferiti");
    return;
  }

  const isAlreadyFavourite = favourites.some((fav) => fav.id === song.id);

  if (isAlreadyFavourite) {
    dispatch(removeFromFavouriteAction(song));
  } else {
    dispatch(addToFavouriteAction(song));

    fetch("https://marvellous-suzy-lucaferr-65236e6e.koyeb.app/punti/aggiungi?amount=5", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
})
  .then((res) => {
    if (res.ok) {
      console.log("✅ Punti aggiunti con successo!");
      setRecentlyAwardedId(song.id);   // utile se vuoi mostrare "+5" vicino alla card
      setShowPointsMessage(true);      // mostro alert globale
      setTimeout(() => setShowPointsMessage(false), 3000);
    } else if (res.status === 403) {
      console.warn("⚠️ Accesso negato, token non valido o non autenticato.");
    } else {
      console.error("❌ Errore generico durante l'aggiunta dei punti.");
    }
  })
  .catch((err) => console.error("❌ Errore di rete:", err));


  }
};

// Funzione per riconoscere le canzoni
const startRecognition = async () => {
  try {
    setListening(true);
    await recorder.start();
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const [buffer, blob] = await recorder.stop().getMp3();
    setListening(false);

    const mp3File = new File([blob], "recorded-audio.mp3", { type: "audio/mpeg" });

    const formData = new FormData();
    formData.append("api_token", import.meta.env.VITE_AUDD_API_KEY);
    formData.append("file", mp3File);
    formData.append("return", "apple_music,deezer");

    // Recupero i dati dall'API AudD
    const response = await fetch("https://api.audd.io/", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.status === "success" && data.result) {
      const { artist, title } = data.result;
      setRecognizedSong({ artist, title });
      setTimeout(() => setRecognizedSong(null), 10000); // Scompare dopo 10s
    } else {
      setRecognizedSong(null);
      alert("Brano non riconosciuto. Riprova con volume più alto.");
    }
  } catch (err) {
    console.error("Errore nella registrazione o nel riconoscimento:", err);
    setListening(false);
    alert("Errore nel processo di registrazione. Controlla i permessi del microfono.");
  }
};

return (
  <div style={{ backgroundColor: "#ffffff", padding: "2rem" }}>
    {loading && <p>Loading...</p>}
    {error && <p>{error}</p>}
    <QuoteOfTheDay />

    <div className="d-flex justify-content-center mt-2 mb-4 flex-column align-items-center">
      {recognizedSong && (
        <Alert variant="dark" className="gold-text mt-3 text-center bg-dark">
          Brano riconosciuto: <strong>{recognizedSong.artist}</strong> – <strong>{recognizedSong.title}</strong>
          <div className="mt-2">
            <Button
              className="glow-button bg-dark gold-text"
              onClick={() =>
                navigate(
                  `/lyrics/${encodeURIComponent(recognizedSong.artist)}/${encodeURIComponent(recognizedSong.title)}`
                )
              }
            >
              Vai al testo
            </Button>
          </div>
        </Alert>
      )}

      <Button
        className="btn glow-button p-0 border-0"
        onClick={startRecognition}
        style={{
          borderRadius: "50%",
          width: "100px",
          height: "100px",
          overflow: "hidden",
          backgroundColor: "#000",
        }}
      >
        {/* Logo che rendo cliccabile per l'ascolto di un brano */}
        <img
          src="/assets/logo/logo fuori di testo 2.PNG"
          alt="Logo"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Button>

      {listening ? (
        <small className="text-warning mt-2 bg-black bg-gradient">MOOSECAAAA…</small>
      ) : (
        <small className="gold-text mt-2 glow-button bg-black bg-gradient px-3 py-1 rounded">
          Tocca il logo per identificare una canzone
        </small>
      )}
    </div>

    {/* Messaggio visivo temporaneo se l'utente guadagna punti */}
    {showPointsMessage && (
      <Alert variant="success" className="text-center fw-bold">
        +5 punti ricevuti
      </Alert>
    )}

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
              {artistData.songs.slice(0, 4).map((song, idx) => {
                const isFavourite = favourites.some((fav) => fav.id === song.id);

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
                            navigate(
                              `/lyrics/${encodeURIComponent(song.artist.name)}/${encodeURIComponent(song.title)}`
                            )
                          }
                        >
                          Leggi testo
                        </Button>

                        <Button
                          className={`glow-button w-100 ${isFavourite ? "bg-danger" : "bg-dark"} gold-text`}
                          onClick={() => handleFavouriteClick(song)}
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

                        {recentlyAwardedId === song.id && (
                          <div className="mt-2 gold-text fw-bold text-center">+5 punti ricevuti</div>
                        )}

                        {!isLoggedIn && errorMsg && (
                          <Alert variant="danger" className="mt-2">
                            {errorMsg}
                          </Alert>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </section>
        ))}
      </div>
    ))}
  </div>
);
}
export default PopularArtists;
