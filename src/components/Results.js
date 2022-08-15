import React from "react";
import Card from "./Card";

const Results = ({ moviesData }) => {
  return (
    <div className="result">
      {moviesData
        .slice(0, 100)
        .sort((min, max) => {
          return max.vote_average - min.vote_average;
        })
        .map((movie) => (
          <Card key={movie.id} movie={movie} />
        ))}
    </div>
  );
};

export default Results;
