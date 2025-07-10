import React from 'react';
import { Link } from 'react-router-dom';

//scelgo 10 frasi di canzoni che cambiano ogni giorno nella home
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
,
  {
  text: "It's a beautiful day, don't let it get away.",
  artist: "U2",
  title: "Beautiful Day"
},
{
  text: "I will survive, oh as long as I know how to love I know I'll stay alive.",
  artist: "Gloria Gaynor",
  title: "I Will Survive"
},
{
  text: "Imagine all the people living life in peace.",
  artist: "John Lennon",
  title: "Imagine"
},
{
  text: "La vita è un brivido che vola via, è tutto un equilibrio sopra la follia.",
  artist: "Vasco Rossi",
  title: "Sally"
},
{
  text: "Ogni tanto penso a te, e mi manca il tuo respiro.",
  artist: "Laura Pausini",
  title: "Strani amori"
}
,
{
  text: "È stato meglio lasciarci che non esserci mai incontrati.",
  artist: "Fabrizio De André",
  title: "Amore che vieni, amore che vai"
},
{
  text: "Perché tu sei un essere speciale, ed io avrò cura di te.",
  artist: "Franco Battiato",
  title: "La cura"
},
{
  text: "Cause baby, you're gonna be the one that saves me.",
  artist: "Oasis",
  title: "Wonderwall"
},
{
  text: "Sono solo parole, e restano parole.",
  artist: "Noemi",
  title: "Sono solo parole"
},
{
  text: "E se domani io non potessi rivedere te…",
  artist: "Mina",
  title: "E se domani"
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
