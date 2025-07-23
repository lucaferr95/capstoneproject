import {Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Chisiamo = ()=> {
 const navigate = useNavigate();

  return (
    
    <Container className="mt-5 feedback bg-black bg-gradient p-3 gold-text p-5 mb-5 ">
      <h3 className="gold-text text-center mb-3">FUORI DI TESTO</h3>
      <h4 className="gold-text text-center mb-3">Chi siamo</h4>
     <p className="gold-text text-center">Fuori di testo è un'app pensata per tutti gli appassionati di musica. </p>
        <p className="gold-text text-center"> L'app permette di cercare i propri brani preferiti e di leggere i testi.</p>
       <p className="gold-text text-center"> Inoltre puoi giocare con il nostro quiz giornaliero e accumulare punti. </p>
        <p className="gold-text text-center"> L'idea nasce per il progetto finale di un corso per sviluppatori (EPICODE) </p>
      <p className="gold-text text-center">    GRAZIE PER IL TUO SUPPORTO!
     </p>
      <div className="d-flex justify-content-center">
  <Button
    onClick={() => navigate('/')}
    className="gold-text btn-fixed glow-button bg-black"
  >
    TORNA ALLA HOME!
  </Button>
</div>

    </Container>
  );
};

export default Chisiamo;
