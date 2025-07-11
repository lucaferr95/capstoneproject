import { Button, Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'


const NotFound = () => {
  const navigate = useNavigate()

  return (
    
    <Container fluid className="text-center mt-0 bg-primary h-100 py-5 gold-text">
      <h2 className='text-white'>Dove pensavi di andare, bro?</h2>
   
<img
  src="https://pbs.twimg.com/tweet_video_thumb/DQjlHWeWAAEL4wL.jpg"
  alt="Errore"
  className="img-fluid my-3"
  style={{ maxWidth: '500px' }}
/>
<p>Vuoi tornare in <Link to="/" className='gold-text'>HOME </Link>? <br /> (Lesto, prima che Gigio si incazzi)</p>

    
      <p>
      <Button
  variant="dark"
  onClick={() => navigate('/')}
  className="gold-text btn-fixed"
>
  BACK HOME
</Button>


      </p>
   </Container>
  )
}

export default NotFound