import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/Cards.css";

const ResultScreen = ({ score }) => {
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-center align-items-center">
      <Card className="shadow-sm bubble-card bg-primary bg-gradient w-50 text-center mb-4">
        <Card.Body>
          <Card.Title className="gold-text fs-4 fw-bold mb-3">
            Complimenti!
          </Card.Title>
          <Card.Text className="gold-text fs-5 mb-3">
            Hai totalizzato {score} punti su 20
          </Card.Text>
          <Button
            onClick={() => navigate('/')}
            className="btn-fixed bg-black glow-button gold-text"
          >
            Torna alla Home
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ResultScreen;
