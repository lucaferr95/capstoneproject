import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";

const DiconoDiNoi = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/feedback");
        const data = await res.json();
        setComments(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        console.log("Feedback ricevuti:", data);

        setLoading(false);

        // pulizia flag
        localStorage.removeItem("refreshFeedback");
      } catch (error) {
        console.error("Errore nel caricamento feedback:", error);
        setLoading(false);
      }
    };

    // se è stato appena inviato un feedback, aggiorna
    if (localStorage.getItem("refreshFeedback") === "true") {
      fetchFeedback();
    } else {
      fetchFeedback();
    }
  }, []);

  return (
    <Container className="mt-4 py-2 px-5 bg-black bg-gradient mb-4">
      <h2 className="text-center gold-text pt-3">Cosa dicono di noi gli utenti</h2>
      {loading ? (
        <div className="text-center my-2">
          <Spinner animation="border" />
        </div>
      ) : (
        <Row className="mt-4 g-4">
          {comments.map((comment) => (
            <Col key={comment.id} md={6} lg={4} className="mb-4 pb-4">
              <Card className="shadow-sm bg-primary bg-gradient rounded-start bubble-card">
                <Card.Body>
                  <Card.Title className="gold-text">
                    {comment.user?.username || "Anonimo"}{" "}
                    <span className="text-white small fst-italic ms-1">
                      ({new Date(comment.createdAt).toLocaleDateString("it-IT")})
                    </span>
                  </Card.Title>
                  <Card.Text className="gold-text fs-6">
                    {comment.comment}
                  </Card.Text>
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
