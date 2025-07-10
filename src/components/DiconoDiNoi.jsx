import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";



const DiconoDiNoi = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/feedback") 
      .then(response => {
        if (!response.ok) throw new Error("Errore nel recupero dei feedback");
        return response.json();
      })
      

      .then(data => {
        setComments(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Errore:", error);
        setLoading(false);
      });
  }, []);

  return (
    <Container className="mt-4 bg-black bg-gradient">
      <h2 className="text-center gold-text">Cosa dicono di noi gli utenti</h2>
      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <Row className="mt-4">
          {comments.map((comment) => (
            <Col key={comment.id} md={6} lg={4} className="mb-4">
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>{comment.user?.username || "Anonimo"}</Card.Title>
                  <Card.Text>{comment.comment}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default DiconoDiNoi;
