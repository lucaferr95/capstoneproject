import React from 'react';
import { Link } from 'react-router-dom';

const dailyQuotes = [
  {
    text: "Ti proteggerò dalle paure delle ipocondrie.",
    artist: "Franco Battiato",
    title: "La cura"
  },
  {
    text: "Tu sei la mia luce e splendi dentro l’anima.",
    artist: "Marco Mengoni",
    title: "Luce"
  },
  {
    text: "Che sei l'anima, sei la mia metà.",
    artist: "Marracash feat. Madame",
    title: "L'anima"
  },
  {
    text: "VIVERE! Anche se sei morto dentro.",
    artist: "Vasco Rossi",
    title: "Vivere"
  },
  {
    text: "Now the day bleeds into nightfall.",
    artist: "Lewis Capaldi",
    title: "Someone You Loved"
  },
  {
    text: "Il sorriso dei giganti sulla tua bocca sta in un angolo, ed è puro... incanto.",
    artist: "Tiziano Ferro",
    title: "Incanto"
  },
  {
    text: "All I ask is if this is my last night with you.",
    artist: "Adele",
    title: "All I Ask"
  },
  {
    text: "Can anybody find me somebody to love?",
    artist: "Queen",
    title: "Somebody to Love"
  },
  {
    text: "You are not alone, I am here with you.",
    artist: "Michael Jackson",
    title: "You Are Not Alone"
  },
  {
    text: "Tu, che sei diversa almeno tu nell'universo.",
    artist: "Mia Martini",
    title: "Almeno tu nell'universo"
  }
];

const todayIndex = new Date().getDate() % dailyQuotes.length;
const quote = dailyQuotes[todayIndex];

const QuoteOfTheDay = () => (
  <div className="quote-box px-3 py-2 rounded mb-4" style={{
    backgroundColor: '#0b0c0f',
    borderLeft: '4px solid #ffd700'
  }}>
    <small className="gold-text">🎤 Frase del giorno</small>
    <p className="mb-1 fst-italic text-white" style={{ fontSize: '0.95rem' }}>
      “{quote.text}”
    </p>
    <Link
      to={`/lyrics/${encodeURIComponent(quote.artist)}/${encodeURIComponent(quote.title)}`}
      className="text-decoration-none"
    >
      <small className="gold-text">– {quote.artist}</small>
    </Link>
  </div>
);

export default QuoteOfTheDay;
