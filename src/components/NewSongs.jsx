import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToFavouriteAction } from "./Redux/Action";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import "../styles/Buttons.css";
import { setPointsForUser } from "../components/Redux/Action/setPoint";

const NewSongs = () => {
  const [songsData, setSongsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showPointsMessage, setShowPointsMessage] = useState(false);
  const [recentlyAwardedId, setRecentlyAwardedId] = useState(null);
  const [limitReachedId, setLimitReachedId] = useState(null);

  const token = localStorage.getItem("token");
  const payload = token ? JSON.parse(atob(token.split(".")[1])) : null;
  const userId = payload?.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favourites = useSelector((state) => state.fav.list);
  const isLoggedIn = !!token;

// Recupera punti e aggiunte di oggi
 
  useEffect(() => {
    const fetchData = async () => {
      const artists = ["Annalisa", "Achille Lauro", "Pinguini Tattici Nucleari", "Serena Brancale"];
      try {
        const fetchPromises = artists.map((artist) =>
          fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${artist}`)
            .then((res) => res.json())
            .then((data) => ({ artist, songs: data.data }))
            .catch(() => ({ artist, songs: [] }))
        );
        const allData = await Promise.all(fetchPromises);
        setSongsData(allData);
        setLoading(false);
      } catch {
        setError("Errore nel caricamento dei dati");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

   const pointsFromRedux = useSelector(
     (state) => state.pointReducer?.pointsByUser?.[userId] || 0
   );
   
  const handleFavouriteClick = (song) => {
  const today = new Date().toISOString().split("T")[0];
  const additionsToday = parseInt(localStorage.getItem(`additions_${userId}_${today}`)) || 0;

  if (!isLoggedIn) {
    setErrorMsg("Devi essere loggato per aggiungere ai preferiti");
    return;
  }

  const isAlreadyFavourite = favourites.some((fav) => fav.id === song.id);
  if (isAlreadyFavourite) return;

  // ✅ Aggiungi SEMPRE ai preferiti
  dispatch(addToFavouriteAction(song));

  // ✅ Se non hai superato il limite, assegna punti
  if (additionsToday < 4) {
    const newPoints = pointsFromRedux + 5;
    const newAdditions = additionsToday + 1;

    dispatch(setPointsForUser(userId, newPoints));
    localStorage.setItem(`points_${userId}`, newPoints.toString());
    localStorage.setItem(`additions_${userId}_${today}`, newAdditions.toString());

    setRecentlyAwardedId(song.id);
    setShowPointsMessage(true);
    setTimeout(() => setShowPointsMessage(false), 3000);
  } else {
    // ✅ Nessun punto, ma mostra messaggio di limite raggiunto
    setLimitReachedId(song.id);
  }
};

   

  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh", padding: "2rem" }}>
      <div className="d-flex justify-content-center mb-4">
        <Button className="gold-text bg-black bg-gradient fs-4 glow-button">Nuove Uscite</Button>
      </div>

      {showPointsMessage && (
        <Alert variant="success" className="text-center fw-bold">
          +5 punti ricevuti
        </Alert>
      )}

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
                          navigate(`/lyrics/${encodeURIComponent(song.artist.name)}/${encodeURIComponent(song.title)}`)
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

                      {recentlyAwardedId === song.id && (
                        <div className="mt-2 gold-text fw-bold text-center">+5 punti ricevuti</div>
                      )}
                       {limitReachedId === song.id && (
                                                <Alert variant="warning" className="text-center fw-bold mt-2">
                                                  Hai già raggiunto il limite giornaliero di punti per l'aggiunta ai preferiti
                                                </Alert>
                                              )}

                      {!isLoggedIn && errorMsg && (
                        <Alert variant="danger" className="mt-2">{errorMsg}</Alert>
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
  );
};

export default NewSongs;
