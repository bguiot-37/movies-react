import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { logIn } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await logIn(email, password);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="mt-12 flex flex-col justify-center items-center">
      <h1 className="mt-8 mb-8 text-8xl lg:text-10xl font-font_1 text-color_1 drop-shadow-md text-center tracking-wide">
        React Movies
      </h1>
      <h2>Connexion</h2>
      <h3>Maintenant on se connecte...</h3>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center"
      >
        <div className="flex flex-col justify-center items-center mt-1 mb-4 w-full">
          <label
            htmlFor="email"
            className=" text-white text-2xl font-medium font-font_1 "
          >
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="px-1.5 py-2 w-full text-black text-xl font-medium font-font_1 rounded-md"
            type="email"
            id="email"
            required
          />
        </div>

        <div className="flex flex-col justify-center items-center mt-1 mb-4 w-full">
          <label
            htmlFor="password"
            className=" text-white text-2xl font-medium font-font_1"
          >
            Mot de passe
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="px-1.5 py-2 w-full text-black text-xl font-medium font-font_1 rounded-md"
            type="password"
            id="password"
            required
          />
        </div>

        <input
          type="submit"
          value="Valider"
          className="px-1.5 py-2 my-4 w-full text-black bg-white hover:bg-color_1 text-2xl font-medium font-font_1 rounded-md cursor-pointer"
        />

        <span className="text-2xl font-font_1 font-semibold text-alert">
          {error && "Mail et/ou mot de passe incorrect(s)"}
        </span>
      </form>
      <p className="font-font_1 text-white text-2xl my-8 ">
        Pas encore de compte ?
        <Link to="/signup" className="no-underline">
          <span className="font-semibold cursor-pointer px-1.5 py-0.75 rounded-md">
            Inscris toi
          </span>
        </Link>
      </p>
    </div>
  );
};

export default Signin;
