import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";

const PrivacyPage = () => {
  return (
    <Container className="mt-5 feedback bg-black bg-gradient p-3 gold-text p-5 mb-5 ">
      <Row className="justify-content-center">
        <Col md={10} className="text-center">
          <h2 className="mb-4">Fuori di Testo & Privacy</h2>

          <p className="fs-5">
            Talvolta le parole vanno oltre il verso e il ritornello.
            <br />
            Fuori di testo è lo spazio per riflessioni, pensieri e scelte personali.
          </p>

          <hr className="my-4" />

          <h4> Informativa privacy</h4>
          <p>
            Questa app raccoglie solo le informazioni necessarie per offrirti un’esperienza personalizzata.
            Nessun dato viene condiviso con terze parti senza il tuo consenso.
          </p>
          <p>
            I tuoi commenti, preferenze e punteggi restano protetti dietro il sipario del rispetto.
          </p>

          <hr className="my-4" />

          <h4>Perché “fuori di testo”?</h4>
          <p>
            Perché ogni utente è più di ciò che ascolta. È ciò che pensa, scrive e lascia dietro sé.
            <br />
            Questo spazio è dedicato a te.
          </p>

           <Button
    onClick={() => navigate('/')}
    className="gold-text btn-fixed glow-button bg-black"
  >
    TORNA ALLA HOME!
  </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default PrivacyPage;
