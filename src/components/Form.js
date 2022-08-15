import React from "react";

const Form = ({ setSearch }) => {
  const submitForm = (e) => {
    e.preventDefault();
  };
  return (
    <form
      className="w-80 my-0 mx-auto flex flex-col justify-center items-center"
      onSubmit={submitForm}
    >
      <input
        type="text"
        placeholder="Entrez un titre de film"
        id="search-input"
        onChange={(e) => setSearch(e.target.value)}
        className="px-2.5 py-0.5 rounded-t-lg border-none text-3xl text-color_3 block my-0 mx-auto w-full outline-none text-center"
      />
      <input
        type="submit"
        value="Rechercher"
        className="cursor-pointer px-2.5 py-0.5 rounded-b-lg border-none text-3xl text-white bg-color_1 block my-0 mx-auto w-full outline-none text-center"
      />
    </form>
  );
};

export default Form;
