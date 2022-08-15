import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Upcoming from "./pages/Upcoming";
import Now from "./pages/Now";
import Movie from "./pages/Movie";
import Movies from "./pages/Movies";
import Main from "./pages/Main";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";
import ProtectedRoutes from "./pages/ProtectedRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/signin" element={<Signin />} />
        <Route exact path="/signup" element={<Signup />} />

        {/* Routes privées */}

        <Route
          exact
          path="/home"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />
        <Route
          exact
          path="/movies/:movieId"
          element={
            <ProtectedRoutes>
              <Movie />
            </ProtectedRoutes>
          }
        />
        <Route
          exact
          path="/movies"
          element={
            <ProtectedRoutes>
              <Movies />
            </ProtectedRoutes>
          }
        />

        <Route
          exact
          path="/now-playing/:movieId"
          element={
            <ProtectedRoutes>
              <Movie />
            </ProtectedRoutes>
          }
        />
        <Route
          exact
          path="/now-playing"
          element={
            <ProtectedRoutes>
              <Now />
            </ProtectedRoutes>
          }
        />
        <Route
          exact
          path="/upcoming/:movieId"
          element={
            <ProtectedRoutes>
              <Movie />
            </ProtectedRoutes>
          }
        />
        <Route
          exact
          path="/upcoming"
          element={
            <ProtectedRoutes>
              <Upcoming />
            </ProtectedRoutes>
          }
        />
        <Route
          exact
          path="/account"
          element={
            <ProtectedRoutes>
              <Account />
            </ProtectedRoutes>
          }
        />
        <Route
          path="*"
          element={
            <ProtectedRoutes>
              <NotFound />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
