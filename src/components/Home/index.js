import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";

import Header from "../Header";

import "./index.css";
import { SearchContext } from "../../searchContext";

const apiStateConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  loading: "LOADING",
  failure: "FAILURE",
};

function Home() {
  const [moviesList, setMoviesList] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStateConstants.initial);

  const { searchValue } = useContext(SearchContext);

  useEffect(() => {
    getMovies();
  }, [searchValue]);

  const getMovies = async () => {
    setApiStatus(apiStateConstants.loading);

    const Api_key = "c45a857c193f6302f2b5061c3b85e743";

    const url =
      searchValue === ""
        ? `https://api.themoviedb.org/3/movie/popular?api_key=${Api_key}&language=en-US&page=1`
        : `https://api.themoviedb.org/3/search/movie?api_key=${Api_key}&language=en-US&query=${searchValue}&page=1`;

    try {
      const response = await fetch(url);

      if (response.ok === true) {
        const fetchedData = await response.json();

        const formattedData = fetchedData.results.map((each) => ({
          id: each.id,
          imgUrl: each.poster_path,
          title: each.title,
          rating: each.vote_average,
        }));

        setMoviesList(formattedData);
        setApiStatus(apiStateConstants.success);
      }
    } catch (error) {
      console.error("Error fetching movies: ", error);
      setApiStatus(apiStateConstants.failure);
    }
  };

  const getHomeLoaderView = () => (
    <div className="Home-loader-container">
      <Loader type="TailSpin" color="white" size={30} />
    </div>
  );

  const getHomeFailureView = () => <p>FAILURE</p>;

  const getHomeSuccessView = () => (
    <ul className="home-cont">
      {moviesList.map((each) => (
        <Link key={each.id} className="link-el" to={`/movie/${each.id}`}>
          <li className="li-el">
            <img
              src={`https://image.tmdb.org/t/p/w500${each.imgUrl}`}
              alt="movieImage"
              className="movie-img"
            />
            <p className="title">{each.title}</p>
            <p className="rating">Rating {each.rating}</p>
          </li>
        </Link>
      ))}
    </ul>
  );

  const getSwitchedResults = () => {
    switch (apiStatus) {
      case apiStateConstants.loading:
        return getHomeLoaderView();
      case apiStateConstants.success:
        return getHomeSuccessView();
      case apiStateConstants.failure:
        return getHomeFailureView();
      default:
        return null;
    }
  };

  return (
    <div className="bg-home-cont">
      <Header />
      {getSwitchedResults()}
    </div>
  );
}

export default Home;
