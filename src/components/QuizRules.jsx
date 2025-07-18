import {Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const QuizRules = ()=> {
 const navigate = useNavigate();

  return (
    
    <Container className="mt-5 feedback bg-black bg-gradient p-3 gold-text p-5 mb-5 ">
      <h3 className="gold-text text-center mb-3">REGOLE DEL QUIZ</h3>
      <h4 className="gold-text text-center mb-3">Gioca e accumula punti</h4>
     <p className="gold-text text-start ms-5 ps-5">Ogni giorno in questa sezione potrei partecipare al nostro quiz giornaliero. </p>
        <p className="gold-text text-start ms-5 ps-5"> Il quiz è composto da 4 domande con 4 risposte multiple.</p>
       <p className="gold-text text-start ms-5 ps-5"> Per ogni risposta corretta accumulerai 5 punti per un massimo di 20 punti. </p>
        <p className="gold-text text-start ms-5 ps-5"> I punti accumulati saranno visibili nella sezione "badge" dove potrai sbloccare i badge degli artisti più amati. </p>
      <p className="gold-text text-center">    ENJOY!
     </p>
      <div className="d-flex justify-content-center">
  <Button
    onClick={() => navigate('/Daylyquiz')}
    className="gold-text btn-fixed glow-button bg-black"
  >
    VAI AL QUIZ!
  </Button>
</div>

    </Container>
  );
};

export default QuizRules;
