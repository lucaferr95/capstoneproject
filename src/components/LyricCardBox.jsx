const LyricCardBox = ({ text, artist, title, coverUrl, onShare }) => {
  if (!text) return null;

  return (
    <div className="card-preview">
      {coverUrl && <img src={coverUrl} alt="cover" className="card-cover " />}
      <p className="lyric-text gold-text">“{text}”</p>
      <p className="card-meta">{decodeURIComponent(artist)} – {decodeURIComponent(title)}</p>

      <Button onClick={onShare} className="glow-button bg-dark w-100 mt-3 gold-text">
         Condividi su Instagram
      </Button>
    </div>
  );
};
