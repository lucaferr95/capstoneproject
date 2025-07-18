import { Row, Col, Card } from "react-bootstrap";
import "../styles/Cards.css";

const QuestionCard = ({ question, onAnswer }) => {
  const answers = [question.correct_answer, ...question.incorrect_answers];

  // Mescola le risposte in modo casuale
  const shuffled = [...answers].sort(() => Math.random() - 0.5);

  return (
    <Row className="mt-3 g-4">
      {shuffled.map((ans, idx) => (
        <Col xs={12} md={6} key={idx}>
          <Card
            className="bubble-card text-center shadow-sm h-100 bg-primary"
            role="button"
            onClick={() => onAnswer(ans === question.correct_answer)}
          >
            <Card.Body className="d-flex align-items-center justify-content-center">
              <Card.Text className="gold-text fw-semibold fs-5">
                {ans}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default QuestionCard;
