import { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";


const FeedbackForm = () => {
  const [comment, setComment] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Assumi che il JWT sia salvato nel localStorage
      },
      body: JSON.stringify({ comment }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Errore nell'invio del feedback");
        return res.json();
      })
      .then(() => {
        setSuccess(true);
        localStorage.setItem("refreshFeedback", "true");
        setComment("");
      })
      .catch(() => {
        setErrorMsg("Devi essere loggato per inviare un commento");
      });
  };

  return (
    <Container className="mt-4 mb-4 feedback bg-black bg-gradient p-3 gold-text p-5 mt-0">
      <h3 className="gold-text text-center">Lascia un commento</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="comment">
          <Form.Label>La tua onesta recensione</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Scrivi cosa pensi dell'app..."
            required
          />
        </Form.Group>
        <Button className="mt-3 btn-fixed gold-text" type="submit" variant="dark">
          Invia
        </Button>
      </Form>
      {success && (
        <Alert variant="success" className="mt-3">
          Feedback inviato con successo!
        </Alert>
      )}
      {errorMsg && (
        <Alert variant="danger" className="mt-3">
          {errorMsg}
        </Alert>
      )}
    </Container>
  );
};

export default FeedbackForm;
