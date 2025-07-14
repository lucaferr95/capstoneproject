import React from 'react';
import { Link } from 'react-router-dom';
import dailyQuotes from "../data/quotes.json"
const todayIndex = new Date().getDate() % dailyQuotes.length;
const quote = dailyQuotes[todayIndex];
//recupero le frasi delle canzoni dal file JSON che ho creato
const QuoteOfTheDay = () => (
  <div className="quote-box px-3 py-2 rounded mb-4 bg-black bg-gradient" style={{
    
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
