// *************************
// Page "mon compte"
// *************************

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useUserAuth } from "../context/UserAuthContext";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

const Account = () => {
  const navigate = useNavigate();
  const { user, delUser, updatePwd } = useUserAuth();

  const [open, setOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [movies, setMovies] = useState([]);

  const handleDelete = async () => {
    try {
      await delUser(user);
      navigate("/");
      alert("Votre compte est supprimé!");
    } catch (err) {
      console.log(err.message);
    }
  };

  const SubmitNewPassword = async () => {
    try {
      await updatePwd(user, newPassword);
      setOpen(false);
      alert("Votre nouveau mot de passe est enregistré!");
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteMovie = async (id) => {
    await deleteDoc(doc(db, "movies", id));
  };

  const getFavoritesMovies = () => {
    onSnapshot(
      query(collection(db, "movies"), where("userEmail", "==", user?.email)),
      (snapshot) =>
        setMovies(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  };

  useEffect(() => {
    if (user) {
      getFavoritesMovies();
    }
  }, []);

  return (
    <div className="container mx-auto px-4">
      <Header />
      <div className="min-h-[80vh] flex flex-col justify-center">
        <h2 className="mb-6">Paramètres de compte</h2>
        <h3>
          Pseudo:<span className="ml-3">{user?.displayName}</span>
        </h3>
        <h3>
          Email:<span className="ml-3">{user?.email}</span>
        </h3>
        <h3>
          Modifier le mot de passe:
          <span
            className="ml-3 cursor-pointer underline hover:underline-offset-2 hover:text-color_1 rounded-xl px-2"
            onClick={() => setOpen(true)}
          >
            modifier
          </span>
        </h3>
        {open && (
          <div className="flex justify-start mx-6">
            <input
              className="w-[16rem] rounded-md placeholder:text-2xl placeholder:italic text-3xl font-medium text-black"
              type="password"
              placeholder="Nouveau mot de passe"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              className="p-2 mx-2 text-2xl font-normal hover:font-bold text-white hover:text-color_1 "
              onClick={() => setOpen(false)}
            >
              Annuler
            </button>
            <button
              className="p-2 mx-2 text-2xl font-normal hover:font-bold text-white hover:text-color_1"
              onClick={SubmitNewPassword}
            >
              Valider
            </button>
          </div>
        )}
        <h3 className="mt-6">
          Supprimer mon compte:
          <span
            className="ml-3 cursor-pointer underline hover:underline-offset-2 hover:text-color_1 rounded-xl px-2"
            onClick={handleDelete}
          >
            supprimer
          </span>
        </h3>
        <div className="mt-10 px-2 md:px-4 border-solid border-white border-2 rounded-md">
          <h2 className="text-center">Mes coups de coeur</h2>
          <ul className="block mt-4">
            {movies.map((movie) => (
              <li
                key={movie.title}
                className="mx-0.5 md:mx-4 flex justify-between items-center"
              >
                <img
                  src={
                    movie.poster
                      ? "https://image.tmdb.org/t/p/w45" + movie.poster
                      : "./img/poster.jpg"
                  }
                  alt="affiche du film"
                  className="h-auto object-cover object-top my-0 mx-0 rounded-md"
                />
                <h4>{movie.title}</h4>
                <button
                  className="cursor-pointer"
                  onClick={() => {
                    deleteMovie(movie.id);
                  }}
                >
                  &#10540;
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Account;
