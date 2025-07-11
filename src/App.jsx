import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyNav from './components/MyNav';
import MyFooter from './components/MyFooter';
import PopularArtists from './components/PopularArtists';
import NewSongs from './components/NewSongs';
import Favourites from './components/FavSong';
import LyricsPage from './components/LyricsPage';

import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/App.css';
import './styles/Buttons.css';


import { Provider } from 'react-redux';
import store from './components/store';
import SearchResults from './components/SearchResults';
import Login from './components/Login';
import Register from './components/Register.jsx';
import NotFound from './components/NotFound.jsx';
import DiconoDiNoi from './components/DiconoDiNoi.jsx';
import FeedbackForm from './components/FeedbackForm.jsx';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <main className="d-flex flex-column min-vh-100">
          <MyNav />

          <div className="flex-grow-1">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route path="/" element={<PopularArtists />} />
              <Route path="/lyrics/:artist/:title/*" element={<LyricsPage />} />
              <Route path="/favourites" element={<Favourites />} />
              <Route path="/novità" element={<NewSongs />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/dicono-di-noi" element={<DiconoDiNoi />} />
              <Route path="/lascia-un-commento" element={<FeedbackForm />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>

          <MyFooter />
        </main>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
