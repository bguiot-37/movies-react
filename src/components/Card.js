import React from "react";
import { Link, useLocation } from "react-router-dom";
import GenreFinder from "./GenreFinder";
import { dateMaJ } from "../assets/methods/methods";
import { collection, addDoc, where, query, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useUserAuth } from "../context/UserAuthContext";

const Card = ({ movie }) => {
  const location = useLocation();
  const { user } = useUserAuth();
  const moviesCollectionRef = collection(db, "movies");

  const AddMovie = async (arg) => {
    let result;
    const q = query(
      moviesCollectionRef,
      where("userEmail", "==", user.email),
      where("movie_id", "==", arg.id)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      result = doc.data().movie_id;
    });

    if (result) {
      alert("Ce film est déjà dans vos favoris!");
    } else {
      try {
        await addDoc(moviesCollectionRef, {
          userEmail: user.email,
          movie_id: arg.id,
          title: arg.title,
          poster: arg.poster_path,
        });
        alert(`${arg.title} ajouté à vos favoris!`);
      } catch (err) {
        console.error("Error adding document: ", err);
      }
    }
  };

  return (
    <div className="flex-[1_0_25%] min-w-[260px] max-w-[280px] h-[680px] bg-black rounded-[35px] m-[5px] px-[15px] pt-[26px] pb-[30px] relative overflow-hidden after:content-[''] after:absolute after:h-[90px] after:w-full after:l-[50%] after:translate-x-2/4 after:b-0 after:rounded-[0_0_30px_30px] after:bg-gradientFrom::after:bg-gradientTo">
      <Link
        to={
          location.pathname === "/movies"
            ? `/movies/${movie.id}`
            : location.pathname === "/now-playing"
            ? `/now-playing/${movie.id}`
            : `/upcoming/${movie.id}`
        }
      >
        <img
          src={
            movie.poster_path
              ? "https://image.tmdb.org/t/p/w500" + movie.poster_path
              : "./img/poster.jpg"
          }
          alt="affiche du film"
          className="w-[80%] h-[254px] object-cover object-top block my-0 mx-auto rounded-[50px] shadow-[0_8px_1px_rgba(255, 255, 255, 0.1)-0px_16px_1px_rgba(255,255,255,0.05)]"
        />
      </Link>
      <h2 className="mt-[24px] mb-0 mx-0 tracking-[1px] leading-5">
        {movie.title}
      </h2>
      {movie.release_date ? (
        <h5 className="color-color_3 tracking-[1px] text-[1.2rem] font-light">
          Sorti le : {dateMaJ(movie.release_date)}
        </h5>
      ) : (
        "n.c"
      )}
      <h4 className="tracking-[1px] text-[1.2rem] mt-[-4px]">
        {movie.vote_average}/10 <span className="text-[0.7rem]">&#8727;</span>
      </h4>
      <ul className="my-[6px] mx-0 flex flex-wrap">
        {movie.genre_ids
          ? GenreFinder(movie.genre_ids)
          : movie.genres.map((genre, index) => (
              <li
                key={index}
                className="bg-color_2 rounded-[18px] py-0 px-[7px] m-[0_4px_4px_0] text-[1.1rem]"
              >
                {genre.name}
              </li>
            ))}
      </ul>
      {movie.overview ? <h3>Synopsis</h3> : "...Pas de synopsis..."}
      <p className="color-color_3 text-[1.3rem] leading-6 max-h-[calc(1.5rem*3)] line-clamp-3">
        {movie.overview}
      </p>
      <div className="flex justify-center items-center">
        <button
          className="text-[1.2rem] text-white font-medium px-1 pt-3 hover:border-b-4 hover:border-b-color_1"
          onClick={() => {
            AddMovie(movie);
          }}
        >
          <span className="pr-2">&#43;</span>
          Ajouter aux favoris
        </button>
      </div>
    </div>
  );
};

export default Card;
