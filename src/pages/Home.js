// *************************
// Page "accueil"
// *************************

import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ImageSlider from "../components/ImageSlider";
import { useUserAuth } from "../context/UserAuthContext";

const Home = () => {
  const { user } = useUserAuth();

  return (
    <div className="container mx-auto px-4">
      <Header />
      <p className="font-font_2 text-white text-6xl my-3 italic font-medium">
        Bonjour <span className="font-medium">{user?.displayName},</span>{" "}
        bienvenue sur la plateforme de films ...
      </p>
      <ImageSlider />
      <Footer />
    </div>
  );
};

export default Home;
