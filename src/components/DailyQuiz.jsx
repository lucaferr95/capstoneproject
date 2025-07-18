import { useEffect, useState } from "react";
import { Container, Spinner, Alert } from "react-bootstrap";
import QuestionCard from "./QuestionCard";
import Timer from "./Timer";
import ResultScreen from "./ResultScreen";
import questionsData from "../data/questions.json";
import "../styles/Cards.css"; // importa gli stili bubble-card

const DailyQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [finished, setFinished] = useState(false);
  const [alreadyDone, setAlreadyDone] = useState(false);
  const todayKey = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    const stored = localStorage.getItem(`quiz_${todayKey}`);

    if (stored) {
      const parsed = JSON.parse(stored);
      setQuestions(parsed.questions);
      setScore(parsed.score || 0);
      setFinished(parsed.finished || false);
      setCurrent(parsed.current || 0);
      if (parsed.finished) setAlreadyDone(true);
    } else {
      const seed = [...todayKey].reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const shuffled = [...questionsData].sort((a, b) => Math.sin(seed + a.id) - Math.sin(seed + b.id));
      const selected = shuffled.slice(0, 4);
      setQuestions(selected);
    }

    setLoading(false);
  }, []);

  const handleAnswer = (isCorrect) => {
    const updatedScore = isCorrect ? score + 5 : score;
    const updatedCurrent = current + 1;

    if (updatedCurrent < questions.length) {
      setCurrent(updatedCurrent);
      setScore(updatedScore);
      localStorage.setItem(
        `quiz_${todayKey}`,
        JSON.stringify({ questions, current: updatedCurrent, score: updatedScore, finished: false })
      );
    } else {
      setScore(updatedScore);
      setFinished(true);
      localStorage.setItem(
        `quiz_${todayKey}`,
        JSON.stringify({ questions, current: updatedCurrent, score: updatedScore, finished: true })
      );
    }
  };

  return (
    <Container className="mt-4 py-4 mb-4 px-5 bg-black bg-gradient rounded-4">
      <h2 className="text-center gold-text mb-4">Quiz Giornaliero</h2>
      {loading ? (
        <div className="text-center my-3"><Spinner animation="border" /></div>
      ) : alreadyDone ? (
        <Alert variant="warning" className="text-center gold-text bg-dark border-0">
          Hai già completato il quiz di oggi. Torna domani per una nuova sfida.
        </Alert>
      ) : finished ? (
        <ResultScreen score={score} />
      ) : (
        <>
          <Timer duration={30} onTimeout={() => handleAnswer(false)} />
          <h3 className="text-center gold-text fs-5 mb-3">
            {questions[current].question}
          </h3>
          <QuestionCard
            question={questions[current]}
            onAnswer={handleAnswer}
          />
        </>
      )}
    </Container>
  );
};

export default DailyQuiz;
