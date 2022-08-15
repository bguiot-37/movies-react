import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container mx-auto relative top-4 text-2xl flex items-center justify-between py-8">
      <nav>
        {/* MOBILE-MENU */}
        <section className="MOBILE-MENU flex md:hidden">
          <div
            className="HAMBURGER-ICON space-y-2 absolute top-0 right-0 px-8 py-8"
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <span className="block h-0.5 w-8 animate-pulse bg-white"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-white"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-white"></span>
          </div>

          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
            <div
              className="absolute top-0 right-0 px-8 py-8"
              onClick={() => setIsNavOpen(false)}
            >
              <svg
                className="h-8 w-8 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <ul className="flex flex-col items-center justify-between min-h-[250px]">
              <NavLink to="/home" className="my-8 uppercase ">
                Accueil
              </NavLink>
              <NavLink to="/movies" className="my-8 uppercase text-color_2">
                En vrac...
              </NavLink>
              <NavLink
                to="/now-playing"
                className="my-8 uppercase text-color_2"
              >
                À l'affiche
              </NavLink>
              <NavLink to="/upcoming" className="my-8 uppercase text-color_2">
                À venir
              </NavLink>
              <NavLink to="/account" className="my-8 uppercase text-color_2">
                Mon compte
              </NavLink>
              <NavLink
                to="/"
                className="my-8 uppercase text-color_2"
                onClick={handleLogout}
              >
                Déconnexion
              </NavLink>
            </ul>
          </div>
        </section>

        {/* DESKTOP-MENU */}
        <ul className="DESKTOP-MENU hidden md:flex space-x-8">
          <div className="md:flex md:justify-between md:absolute md:left-0">
            <NavLink
              to="/home"
              className={(nav) => (nav.isActive ? "nav-active" : "")}
            >
              Accueil
            </NavLink>
            <NavLink
              to="/movies"
              className={(nav) => (nav.isActive ? "nav-active" : "")}
            >
              En vrac...
            </NavLink>
            <NavLink
              to="/now-playing"
              className={(nav) => (nav.isActive ? "nav-active" : "")}
            >
              À l'affiche
            </NavLink>
            <NavLink
              to="/upcoming"
              className={(nav) => (nav.isActive ? "nav-active" : "")}
            >
              À venir
            </NavLink>
          </div>
          <div className="md:absolute md:right-0 md:flex md:justify-between">
            <NavLink
              to="/account"
              className={(nav) => (nav.isActive ? "nav-active" : "")}
            >
              Mon compte
            </NavLink>
            <NavLink
              to="/"
              className={(nav) => (nav.isActive ? "nav-active" : "")}
              onClick={handleLogout}
            >
              Déconnexion
            </NavLink>
          </div>
        </ul>
      </nav>
      <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        // background-color: rgb(100, 100, 100);
        background-color:#212040;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}</style>
    </div>
  );
}
