import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './lyrics.css'; // Stili VS Code

function LyricsViewer() {
  const [artist, setArtist] = useState('');
  const [title, setTitle] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [lines, setLines] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isKaraoke, setIsKaraoke] = useState(false);

  const fetchLyrics = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/lyrics', {
        params: { artist, title },
      });
      const text = response.data.lyrics;
      setLyrics(text);
      setLines(text.split('\n'));
      setActiveIndex(0);
      setIsKaraoke(true);
    } catch (error) {
      console.error(error);
      setLyrics('Errore nel recupero del testo');
      setIsKaraoke(false);
    }
  };

  // Effetto avanzamento automatico karaoke
  useEffect(() => {
    if (!isKaraoke || lines.length === 0) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev < lines.length - 1 ? prev + 1 : prev));
    }, 2200); // Cambia riga ogni 2.2 sec

    return () => clearInterval(interval);
  }, [isKaraoke, lines]);

  return (
    <div style={{ maxWidth: '700px', margin: '3rem auto' }}>
      <div style={{ background: '#333', padding: '0.5rem 1rem', color: '#ccc', borderRadius: '6px 6px 0 0', fontFamily: 'Fira Code' }}>
        🎧 lyrics.txt
      </div>
      <div className="lyrics-container">
        <input className="lyrics-input" value={artist} onChange={(e) => setArtist(e.target.value)} placeholder="Artista" />
        <input className="lyrics-input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titolo canzone" />
        <button className="lyrics-btn" onClick={fetchLyrics}>Avvia Karaoke</button>

        {isKaraoke && (
          <div className="karaoke-area">
            {lines.map((line, i) => (
              <div key={i} className={`karaoke-line ${i === activeIndex ? 'active' : ''}`}>
                {line}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default LyricsViewer;
