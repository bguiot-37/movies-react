//***************************** */
// Page liste des films à venir
//***************************** */

import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Results from "../components/Results";
import Footer from "../components/Footer";

const Upcoming = () => {
  const API_Key = process.env.REACT_APP_API_KEY_TMDB;

  const [moviesData, setMoviesData] = useState([]);

  // méthode pour capter les films à l'affiche de l'API (méthode Get Now Playing)
  const fetchData = async () => {
    const response = await axios.get(
      ` https://api.themoviedb.org/3/movie/upcoming?api_key=${API_Key}&language=fr-FR&region=FR`
    );
    return setMoviesData(response.data.results);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto">
      <Header />
      <Results moviesData={moviesData} />
      <Footer />
    </div>
  );
};

export default Upcoming;
