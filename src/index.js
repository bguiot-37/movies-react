import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UserAuthContextProvider } from "./context/UserAuthContext";
// import "./styles/index.css";
import "./styles/tailwind.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserAuthContextProvider>
      <App />
    </UserAuthContextProvider>
  </React.StrictMode>
);
