import React, { useState, useEffect } from "react";
import axios from "axios";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const ImageSlider = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [Autoplay()]);
  useEffect(() => {
    if (emblaApi) {
      // connexion embla api ok
    }
  }, [emblaApi]);

  const API_Key = process.env.REACT_APP_API_KEY_TMDB;

  const [slides, setSlides] = useState([]);

  // méthode pour capter les données de l'API
  const fetchData = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_Key}&language=fr-FR&page=1`
    );

    return setSlides(response.data.results);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {slides.slice(0, 6).map((movie) => (
          <div
            className="relative flex-[0_0_100%] w-full md:w-[500px] h-auto"
            key={movie.id}
          >
            <img
              src={
                movie.poster_path
                  ? "https://image.tmdb.org/t/p/original" + movie.poster_path
                  : "./img/poster.jpg"
              }
              alt=""
              className="w-[500px] h-auto mx-auto"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
