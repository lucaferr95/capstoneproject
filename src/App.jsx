import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyNav from './components/MyNav';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MyFooter from './components/MyFooter';
import MyHome from './components/Home';
import NewSongs from './components/NewSongs';
import { Provider } from 'react-redux';  // Importa il Provider
import store from './components/store'; // Importa lo store
import Favourites from './components/FavSong';
const App = () => {
  return (
    <Provider store={store}>  {/* Avvolgi tutta l'app con il Provider */}
      <BrowserRouter>
        <MyNav />
        <Routes>
          <Route path='/' element={<MyHome />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/novità" element={<NewSongs />} />
        </Routes>
        <MyFooter />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
