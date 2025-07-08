import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromFavouriteAction } from './Redux/Action';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs'; 
import { Link } from 'react-router-dom';

const Favourites = () => {
  const favourites = useSelector(state => state.fav.list);
  const dispatch = useDispatch();

  const handleRemove = (song) => {
    dispatch(removeFromFavouriteAction(song));
  };

  return (
    <Container className="text-white">
      <h1>I tuoi preferiti</h1>
      {favourites.length === 0 ? (
        <p>Non hai aggiunto nessun brano ai preferiti ancora.</p>
      ) : (
        <Row className="g-3">
          {favourites.map((song, index) => (
            <Col key={index} md={4}>
              <Card className="bg-dark text-white border-0">
                <Card.Img variant="top" src={song.album.cover} alt={song.title} />
                <Card.Body>
                  <Card.Title>{song.title}</Card.Title>
                  <Card.Text>{song.artist.name}</Card.Text>
                  <Button
                    className="glow-button"
                    variant="danger"
                    onClick={() => handleRemove(song)}
                  >
                    Rimuovi
                  </Button>
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
