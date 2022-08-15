//***************************** */
// Page détaillée d'1 film
//***************************** */

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { dateMaJ } from "../assets/methods/methods";
import Header from "../components/Header";

const Movie = () => {
  const navigate = useNavigate();

  let { movieId } = useParams();
  const [movieData, setMovieData] = useState([]);
  const [actorData, setActorData] = useState([]);

  const API_Key = process.env.REACT_APP_API_KEY_TMDB;

  // méthode pour capter les détails d'1 film
  const fetchDataMovie = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_Key}&language=fr-FR`
    );
    return setMovieData(response.data);
  };

  useEffect(() => {
    fetchDataMovie();
  }, []);

  // méthode pour capter des infos sur les acteurs du film
  const fetchDataActors = async () => {
    const response = await axios.get(
      `http://api.themoviedb.org/3/movie/${movieId}/casts?api_key=${API_Key}`
    );
    return setActorData(response.data.cast);
  };

  useEffect(() => {
    fetchDataActors();
  }, []);

  // méthode pour retourner à la page précédente
  const returnBtn = () => {
    navigate(-1);
  };

  return (
    <div className=" relative container mx-auto">
      <Header />
      <button
        onClick={returnBtn}
        className="px-3 py-1.5 bg-color_1 hover:bg-color_3 text-white font-semibold text-1.5 font-font_2 rounded-xl absolute right-0"
      >
        Retour
      </button>
      <img
        src={
          movieData.poster_path
            ? "https://image.tmdb.org/t/p/w500" + movieData.poster_path
            : "./img/poster.jpg"
        }
        alt="affiche film"
        className="max-w-[500px] max-h-[750px] object-cover object-top block my-5 mx-auto rounded-[50px] shadow-[0_8px_1px_rgba(255, 255, 255, 0.1)-0px_16px_1px_rgba(255,255,255,0.05)]"
      />
      <h2 className="mt-[48px] mb-[24px] mx-0 tracking-[1px] leading-5 text-4xl">
        {movieData.title}
      </h2>
      <h3>
        {movieData.vote_average}/10 <span>&#8727;</span>
      </h3>
      {movieData.release_date ? (
        <h3>Sorti le : {dateMaJ(movieData.release_date)}</h3>
      ) : (
        ""
      )}
      <h3>Genres</h3>
      <ul>
        {movieData.genres &&
          movieData.genres.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
      </ul>
      <h3>Production</h3>
      <ul>
        {movieData.production_countries &&
          movieData.production_countries.slice(0, 3).map((item, index) => (
            <li className="text-white" key={index}>
              {item.name}
            </li>
          ))}
      </ul>
      {movieData.overview ? <h3>Synopsis</h3> : "...Pas de synopsis..."}
      <p className="text-2xl pl-2 text-white font-light leading-6 mb-2">
        {movieData.overview}
      </p>
      <div>
        <h3>Casting</h3>
        <ul className="flex flex-wrap justify-center">
          {actorData.length !== 0
            ? actorData.slice(0, 8).map((actor) => (
                <li
                  key={actor.name}
                  className="flex justify-center items-center flex-col"
                >
                  <img
                    src={
                      actor.profile_path
                        ? "https://image.tmdb.org/t/p/w92" + actor.profile_path
                        : "./img/poster.jpg"
                    }
                    alt={actor.name}
                    className="w-auto h-[254px] object-cover object-top block my-0 mx-auto rounded-[50px] shadow-[0_8px_1px_rgba(255, 255, 255, 0.1)-0px_16px_1px_rgba(255,255,255,0.05)]"
                  />
                  <p className="text-2xl text-white font-light leading-6">
                    {actor.name}
                  </p>
                </li>
              ))
            : "pas d'infos"}
        </ul>
      </div>
    </div>
  );
};

export default Movie;
