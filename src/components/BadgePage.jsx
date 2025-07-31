import React, { useEffect, useState } from "react";
import "../styles/BadgePage.css";
import { useSelector, useDispatch } from "react-redux";
import { setPointsForUser } from "../components/Redux/Action/setPoint";

const BadgePage = () => {
  const dispatch = useDispatch();
  const [unlockedBadge, setUnlockedBadge] = useState(null);
 const API_URL = "https://marvellous-suzy-lucaferr-65236e6e.koyeb.app"; 
  // Recupero userId dal token JWT
  const token = localStorage.getItem("token");
  const payload = token ? JSON.parse(atob(token.split(".")[1])) : null;
  const userId = payload?.id || localStorage.getItem("userId");

  // Lettura punti da Redux
  const points = useSelector(
    (state) => state.pointReducer?.pointsByUser?.[userId] || 0
  );

  // Lista badge
  const badges = [
    { id: 1, title: "INDIE ICON", artist: "Billie Eilish", avatar: "https://www.shutterstock.com/image-vector/bangkokthailandfebuary-19-2020-billie-eilish-600nw-1649641786.jpg", requiredPoints: 100 },
    { id: 2, title: "SOUL GENIUS", artist: "Stevie Wonder", avatar: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/stevie-wonder-cartoon-portrait-1-ahmad-nusyirwan.jpg", requiredPoints: 200 },
    { id: 3, title: "ITALIAN SOUL", artist: "Marco Mengoni", avatar: "https://76f185c142.cbaul-cdnwnd.com/698cf1e94d0857d70c5be55dd1e353bb/200000062-abe56abe57/Opera_senza_titolo%20%286%29.webp?ph=76f185c142", requiredPoints: 300 },
    { id: 4, title: "MAESTRO DELLE PAROLE", artist: "Lucio Dalla", avatar: "https://www.liviamassaccesi.it/wp-content/uploads/2022/03/LiviaMassaccesi_ritratti_Cantautori_Dalla.jpg", requiredPoints: 400 },
    { id: 5, title: "VOCAL DIVA", artist: "Ariana Grande", avatar: "https://76f185c142.cbaul-cdnwnd.com/698cf1e94d0857d70c5be55dd1e353bb/200000025-09a7909a7c/Opera_senza_titolo%283%29.webp?ph=76f185c142", requiredPoints: 500 },
    { id: 6, title: "ITALIAN QUEEN", artist: "Mina", avatar: "https://ih1.redbubble.net/image.4969328773.4185/flat,750x,075,f-pad,750x1000,f8f8f8.webp", requiredPoints: 600 },
    { id: 7, title: "STAGE EXPLOSION", artist: "Maneskin", avatar: "https://i.pinimg.com/736x/66/09/fe/6609fe32694e63c4546172c2b7bb2514.jpg", requiredPoints: 700 },
    { id: 8, title: "RAP ROYALTY", artist: "Eminem", avatar: "https://external-preview.redd.it/qtRuG-5bT4gB_5o8a_XaT84lnRXMtFfyP-ytx9e6dnw.jpg?auto=webp&s=55a269f4e172fd85a52977560c9d4208202b61da", requiredPoints: 800 },
    { id: 9, title: "LEGEND OF ROCK", artist: "Queen", avatar: "https://thumbs.dreamstime.com/b/freddie-mercury-dalla-regina-136521089.jpg", requiredPoints: 900 },
    { id: 10, title: "KING OF POP", artist: "Michael Jackson", avatar: "https://cdn-icons-png.freepik.com/512/195/195137.png", requiredPoints: 1000 }
  ];

  // Badge sbloccati
  const unlockedBadges = badges.map((b) => ({
    ...b,
    unlocked: points >= b.requiredPoints
  }))
  // Salva i punti sempre nel localStorage aggiornato
  useEffect(() => {
    localStorage.setItem(`points_${userId}`, points.toString());
  }, [userId, points]);
  //Chiamata fetch per backend
  useEffect(() => {
  const token = localStorage.getItem("token");
  console.log("TOKEN INVIATO AL BACKEND:", token);

  fetch(`${API_URL}/punti/totali`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then(res => {
    if (!res.ok) throw new Error("Token non valido o accesso negato");
    return res.json();
  })
  .then(data => {
    console.log("Totale punti:", data);
  })
  .catch(err => console.error("Errore punti:", err));
}, [dispatch, userId]);


  // Badge appena sbloccato = popup visivo
  useEffect(() => {
    const previousPoints = parseInt(localStorage.getItem(`points_${userId}`) || "0");

    const justUnlocked = badges.find(
      (b) => points >= b.requiredPoints && previousPoints < b.requiredPoints
    );

    if (justUnlocked) {
      setUnlockedBadge(justUnlocked);
      setTimeout(() => setUnlockedBadge(null), 5000);
    }
  }, [badges, points]);

  return (
    <div className="badge-section bg-black bg-gradient px-4 py-5 my-3 position-relative">
      {unlockedBadge && (
        <div className="badge-popup-overlay">
          <div className="badge-popup-card animate-unlock">
            <img src={unlockedBadge.avatar} alt={unlockedBadge.artist} />
            <h3>{unlockedBadge.title}</h3>
            <p>{unlockedBadge.artist}</p>
            <span>Badge Sbloccato!</span>
          </div>
        </div>
      )}

      <h2 className="text-center mb-4">I MIEI BADGE</h2>

      <div className="points-indicator mb-4">
        <label>Punti accumulati: {points} / 1000</label>
        <progress value={points} max="1000"></progress>
      </div>

      <div className="badge-grid">
        {unlockedBadges.map((b) => (
          <div key={b.id} className={`badge-card ${b.unlocked ? "active" : "locked"}`}>
            <div className="badge-medal position-relative">
              <img
                src={b.avatar}
                alt={b.artist}
                className={b.unlocked ? "" : "blurred"}
              />
              {!b.unlocked && (
                <div className="lock-overlay">
                  <span>🔒</span>
                </div>
              )}
            </div>
            <h4 className="badge-title">{b.title}</h4>
            <p className="badge-artist mb-1">{b.artist}</p>
            <small className="badge-progress text-light">
              {points} / {b.requiredPoints} punti
            </small>
          </div>
        ))}
      </div>

      <div className="earn-points text-center mt-5">
        <h5>Guadagna Punti</h5>
        <h6>
          + 5 punti per ogni brano aggiunto ai preferiti (max 4 volte al giorno)<br />
          + 5 punti per ogni risposta corretta del quiz
        </h6>
        <button
          className="bg-black btn-fixed bg-gradient gold-text glow-button mt-3"
          onClick={() => window.location.href = "/Daylyquiz"}
        >
          Vai al Quiz
        </button>
      </div>
    </div>
  );
};

export default BadgePage;
