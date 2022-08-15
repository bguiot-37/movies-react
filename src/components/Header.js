import React from "react";
import Navigation from "./Navigation";

const Header = () => {
  return (
    <div className="container mx-auto mt-[20px] ">
      <Navigation />
      <h1 className="mt-32 mb-2 text-8xl font-font_1 text-color_1 drop-shadow-md text-center tracking-wide">
        React Movies
      </h1>
    </div>
  );
};

export default Header;
