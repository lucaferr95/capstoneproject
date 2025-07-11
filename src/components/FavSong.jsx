import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromFavouriteAction } from './Redux/Action';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs'; 
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import '../styles/Buttons.css';




const Favourites = () => {
  const favourites = useSelector(state => state.fav.list);
  const dispatch = useDispatch();
  const isLoggedIn = !!localStorage.getItem("token");

const handleAddFavourite = (song) => {
  if (!isLoggedIn) {
    alert("Devi essere loggato per aggiungere ai preferiti.");
    return;
  }
  dispatch(addToFavouriteAction(song));
};


  const handleRemove = (song) => {
    dispatch(removeFromFavouriteAction(song));
  };
useEffect(() => {
  const username = localStorage.getItem("username");
  if (username) {
    localStorage.setItem(`favourites_${username}`, JSON.stringify(favourites));
  }
}, [favourites]);



  return (
    <Container className="text-white mt-0 mb-5">
      <h1>I tuoi preferiti</h1>
      {favourites.length === 0 ? (
        <p>Non hai aggiunto nessun brano ai preferiti ancora.</p>
      ) : (
        <Row className="g-3">
          {favourites.map((song, index) => (
            <Col key={index} md={4}>
              <Card className="bg-primary text-white border-0 gold-text">
  <Card.Img src={song.album.cover_medium} />
  <Card.Body>
  <Card.Title>{song.title}</Card.Title>
  <Card.Title>
  <Link to={`/search?q=${encodeURIComponent(song.artist.name)}`} className="text-decoration-none gold-text">
  {song.artist.name}
</Link>

</Card.Title>

  <div className="d-flex flex-column">
    <Link
      to={`/lyrics/${encodeURIComponent(song.artist.name)}/${encodeURIComponent(song.title)}`}
      className="mb-2"
    >
      <Button className="glow-button gold-text bg-dark w-100">
        Leggi testo
      </Button>
    </Link>

    <Button
      className="glow-button w-100 gold-text"
      variant="danger"
      onClick={() => handleRemove(song)}
    >
      Rimuovi dai preferiti
    </Button>
  </div>
</Card.Body>

</Card>

            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Favourites;
