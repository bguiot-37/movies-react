// *************************
// landing page connexion à l'app
// *************************

import React from "react";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div className="container mx-auto px-4 flex flex-col justify-center items-center">
      <h1 className="mt-[20%] mb-8 text-8xl lg:text-10xl font-font_1 text-color_1 drop-shadow-md text-center tracking-wide">
        React Movies
      </h1>
      <div className="flex justify-between w-[80%] md:w-[40%] text-4xl font-font_1 text-white">
        <button>
          <Link to="/signin"> Se connecter</Link>
        </button>
        <button>
          <Link to="/signup"> S'inscrire</Link>
        </button>
      </div>
    </div>
  );
};

export default Main;
