import React from "react";
import { useState } from "react";
import Modal from "./Modal";

const Footer = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="container text-center text-2xl mx-auto my-6">
      <a
        className="mr-0"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        Mentions légales
      </a>
      {modalOpen && <Modal setModalOpen={setModalOpen} />}
    </div>
  );
};

export default Footer;
