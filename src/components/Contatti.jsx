import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";

const Contatti = () => {
  const [comment, setComment] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ comment, type: "contatto" }),

      });

      if (!res.ok) throw new Error("Non autorizzato");

      await res.json();
      setSuccess(true);
      setComment("");
      localStorage.setItem("refreshFeedback", "true");
    } catch (err) {
      setErrorMsg(" Devi essere loggato per inviare un messaggio.");
    }
  };

  return (
    <Container className="mt-4 mb-5 bg-black bg-gradient py-4 px-3 gold-text">
      <h2 className="text-center mb-4 gold-text">Contattaci</h2>
      <p className="text-center fs-5">
        Hai dubbi, idee o problemi da segnalare? <br />
        Lascia qui il tuo messaggio — lo leggeremo con attenzione.
      </p>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="comment">
          <Form.Label>Il tuo messaggio</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Scrivi qualcosa..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </Form.Group>

        <Button
          className="mt-3 btn-fixed gold-text glow-button"
          type="submit"
          variant="dark"
        >
          Invia
        </Button>
      </Form>

      {success && (
        <Alert variant="success" className="mt-3">
          Messaggio ricevuto! Ti risponderemo appena possibile.
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

export default Contatti;
