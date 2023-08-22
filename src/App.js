import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Movie from "./components/Movie";
import { SearchContext } from "./searchContext";
import { useState } from "react";
import Header from "./components/Header";

import "./App.css";

const App = () => {
  const [searchInput, setSearchInput] = useState("");

  const onSearchChanged = (value) => {
    setSearchInput(value);
  };

  return (
    <SearchContext.Provider
      value={{ searchValue: searchInput, onSearchChanged }}
    >
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<Movie />} />
      </Routes>
    </SearchContext.Provider>
  );
};

export default App;
