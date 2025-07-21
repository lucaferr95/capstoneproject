import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./components/store";

import MyNav from "./components/MyNav";
import MyFooter from "./components/MyFooter";
import PopularArtists from "./components/PopularArtists";
import NewSongs from "./components/NewSongs";
import Favourites from "./components/FavSong";
import LyricsPage from "./components/LyricsPage";
import SearchResults from "./components/SearchResults";
import Login from "./components/Login";
import Register from "./components/Register.jsx";
import NotFound from "./components/NotFound.jsx";
import DiconoDiNoi from "./components/DiconoDiNoi.jsx";
import FeedbackForm from "./components/FeedbackForm.jsx";
import Profile from "./components/Profile.jsx";
import Backoffice from "./components/Backoffice.jsx";
import QuizRules from "./components/QuizRules.jsx";
import DailyQuiz from "./components/DailyQuiz.jsx";
import BadgePage from "./components/BadgePage.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import "./styles/Buttons.css";

// Rotta protetta per l’admin
const AdminRoute = ({ children }) => {
  const role = localStorage.getItem("role");
  return role === "ADMIN" ? children : <Navigate to="/not-authorized" />;
};

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

              <Route path="/regole" element={<QuizRules />} />
              <Route path="/Daylyquiz" element={<DailyQuiz />} />
              <Route path="/badge" element={<BadgePage />} />
              <Route path="/profile" element={<Profile />} />

              <Route
                path="/backoffice"
                element={
                  <AdminRoute>
                    <Backoffice />
                  </AdminRoute>
                }
              />

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
