//***************************** */
// Page liste des films en vrac
//***************************** */

import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Form from "../components/Form";
import Results from "../components/Results";
import Footer from "../components/Footer";

const Movies = () => {
  const API_Key = process.env.REACT_APP_API_KEY_TMDB;

  const [moviesData, setMoviesData] = useState([]);
  const [search, setSearch] = useState("code");

  // méthode pour capter les données de l'API
  const fetchData = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_Key}&query=${search}&language=fr-FR`
    );
    return setMoviesData(response.data.results);
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  return (
    <div className="container mx-auto">
      <Header />
      <Form setSearch={setSearch} />
      <h3
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Résultats pour : <em style={{ marginLeft: "3px" }}>{search}</em>
      </h3>
      <Results moviesData={moviesData} />
      <Footer />
    </div>
  );
};

export default Movies;
