import { Container, Row, Col, Card, Carousel, Button } from 'react-bootstrap';

const MyHome = () => {
  return (
    <Container fluid className="text-white px-4 mt-0 bg-dark bg-gradient">
      {/* Sezione: Novità */}
      <section className="mb-5">
        <h2 className="mb-3 ms-3">Novità</h2>
        <Row>
            <Col md= {6}>
            <h4>NUOVA STAZIONE RADIO</h4>
            <p>Rilassati, al resto pensiamo noi. Ascolta Apple Music Chill</p>
            </Col>
            <Col md= {6}>
            <h4>NUOVA STAZIONE RADIO</h4>
            <p>Ecco la nuova casa della musica latina</p>
            </Col>
        </Row>
        <Row className="g-3">
          <Col xs={6} md={6}>
            <Card className="bg-dark text-white border-0">
              <Card.Img
                src="public\assets\images\1a.png" 
                alt="Chill"
              />
             
            </Card>
          </Col>
          <Col xs={6} md={6}>
            <Card className="bg-dark text-white border-0">
              <Card.Img
                src="public\assets\images\1b.png" 
                alt="Musica Uno"
              />
            
            </Card>
          </Col>
        </Row>
      </section>

      {/* Sezione: Nuovi episodi radio */}
     {/* Sezione: Nuovi episodi radio */}
<section className="mt-5">
  <h4 className="mb-3">Nuovi episodi radio</h4>
  <Carousel indicators={false}>
    <Carousel.Item>
      <Row className="g-3">
        <Col md={3}>
          <img src="/assets/images/2a.png" alt="Episodio 1" className="img-fluid rounded" />
        </Col>
        <Col md={3}>
          <img src="/assets/images/2b.png" alt="Episodio 2" className="img-fluid rounded" />
        </Col>
        <Col md={3}>
          <img src="/assets/images/2c.png" alt="Episodio 3" className="img-fluid rounded" />
        </Col>
        <Col md={3}>
          <img src="/assets/images/2d.png" alt="Episodio 4" className="img-fluid rounded" />
        </Col>
      </Row>
    </Carousel.Item>

    <Carousel.Item>
      <Row className="g-3">
        <Col md={3}>
          <img src="/assets/images/2e.png" alt="Episodio 5" className="img-fluid rounded" />
        </Col>
        <Col md={3}>
          <img src="/assets/images/2f.png" alt="Episodio 6" className="img-fluid rounded" />
        </Col>
        <Col md={3}>
          <img src="/assets/images/2a.png" alt="Episodio 7" className="img-fluid rounded" />
        </Col>
        <Col md={3}>
          <img src="/assets/images/2d.png" alt="Episodio 8" className="img-fluid rounded" />
        </Col>
      </Row>
    </Carousel.Item>
  </Carousel>
</section>
{/* Sezione: Altro da esplorare */}
<section className="mt-5 pb-5">
        <h4 className="mb-4">Altro da esplorare</h4>
        <Row className="g-3">
          <Col xs={4} md={4}>
            <Button className="w-100 text-start glow-button rounded-pill">Esplora per genere</Button>
          </Col>
          <Col xs={12} md={4}>
            <Button className="w-100 text-start glow-button rounded-pill">Worldwide</Button>
          </Col>
          <Col xs={12} md={4}>
            <Button className="w-100 text-start glow-button rounded-pill">Video musicali</Button>
          </Col>

          <Col xs={12} md={4}>
            <Button className="w-100 text-start glow-button rounded-pill">Decenni</Button>
          </Col>
          <Col xs={12} md={4}>
            <Button className="w-100 text-start glow-button rounded-pill">Classifiche</Button>
          </Col>
          <Col xs={12} md={4}>
            <Button className="w-100 text-start glow-button rounded-pill">Nuovi artisti</Button>
          </Col>

          <Col xs={12} md={4}>
            <Button className="w-100 text-start glow-button rounded-pill">Attività e stati d’animo</Button>
          </Col>
          <Col xs={12} md={4}>
            <Button className="w-100 text-start glow-button rounded-pill">Audio spaziale</Button>
          </Col>
          <Col xs={12} md={4}>
            <Button className="w-100 text-start glow-button rounded-pill">Hit del passato</Button>
          </Col>
        </Row>
      </section>
    </Container>
    

  );
  
};

export default MyHome;
