import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner, Button, Alert } from "react-bootstrap";

const Backoffice = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchFeedbacks = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/feedback", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!res.ok) throw new Error("Autenticazione fallita o errore nella fetch.");
      const data = await res.json();
      setFeedbackList(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Vuoi davvero eliminare questo feedback?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:8080/api/feedback/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        },
      });

      if (!res.ok) throw new Error("Errore nella cancellazione");

      setFeedbackList((prev) => prev.filter((fb) => fb.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleDeleteBoth = async (id) => {
  const confirm = window.confirm("Vuoi davvero eliminare il feedback e il suo autore?");
  if (!confirm) return;

  try {
    const res = await fetch(`http://localhost:8080/api/feedback/${id}/with-user`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      },
    });

    if (!res.ok) throw new Error("Errore nella cancellazione doppia");

    setFeedbackList((prev) => prev.filter((fb) => fb.id !== id));
  } catch (err) {
    alert(err.message);
  }
};


  return (
    <Container className="mt-4 px-4 py-3 rounded-4 bg-black bg-gradient border border-warning">
      <h2 className="text-center gold-text pt-2">Gestione Feedback Admin</h2>

      {loading ? (
        <div className="text-center my-3"><Spinner animation="border" /></div>
      ) : errorMsg ? (
        <Alert variant="danger">{errorMsg}</Alert>
      ) : feedbackList.length === 0 ? (
        <p className="text-center text-light">Nessun feedback disponibile.</p>
      ) : (
        <Row className="mt-4 g-4 justify-content-center">
          {feedbackList.map((fb) => (
            <Col key={fb.id} md={6} lg={5} xl={4}>
              <Card className="bg-primary bg-gradient rounded-4 border-0 shadow bubble-card">
                <Card.Body>
                  <Card.Title className="gold-text">
                    {fb.user?.username || "Anonimo"}{" "}
                    <span className="text-white small fst-italic ms-2">
                      ({new Date(fb.createdAt).toLocaleDateString("it-IT")})
                    </span>
                  </Card.Title>
                  <Card.Text className="gold-text fs-6 ">{fb.comment}</Card.Text>
                  <div className="text-end">
                    <Button variant="outline-light gold-text bg-gradient glow-button bg-danger mb-2" size="sm" onClick={() => handleDelete(fb.id)}>
                      Elimina
                    </Button>
                    <Button
  variant="outline-warning gold-text gbg-gradient glow-button bg-danger"
  size="sm"
  className="mt-2"
  onClick={() => handleDeleteBoth(fb.id)}
>
  Elimina commento + utente
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

export default Backoffice;
