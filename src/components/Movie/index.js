import React, { useState, useEffect } from "react";
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';
import Header from "../Header";
import Cast from "../Cast"
import Loader from "react-loader-spinner";

import "./index.css";

const movieApiStateConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
};

function Movie(props) {
  const [movieState, setMovieState] = useState(movieApiStateConstants.initial);
  const [movieDetails, setMovieDetails] = useState({});
  
  const { id } = useParams();

  useEffect(() => {
    GetMovieDetails();
  }, [id]);

  const GetMovieDetails = async () => {
    setMovieState(movieApiStateConstants.loading);
    const movie_id = id;
    const Api_key="c45a857c193f6302f2b5061c3b85e743"
    
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${Api_key}&language=en-US`);
      const data = await response.json();

      const formattedData = {
        backgroundUrl: data.backdrop_path,
        genre: data.genres.map(each => each.name).join(", "),
        title: data.original_title,
        overview: data.overview,
        posterUrl: data.poster_path,
        releaseDate: data.release_date,
        runTime: data.runtime,
        rating: data.vote_average,
      };

      setMovieDetails(formattedData);
      setMovieState(movieApiStateConstants.success);
      
    } catch (error) {
      console.error("Error fetching movie details: ", error);
      setMovieState(movieApiStateConstants.failure);
    }
  };

  const getMovieLoaderView = () => (
    <div className="Home-loader-container">
      <Loader type="TailSpin" color="white" size={30} />
    </div>
  );

  const getMovieFailureView = () => <p className="col">FAILURE</p>;

  const getMovieSuccessView = () =>{
    
    const coverUrl = "https://image.tmdb.org/t/p/w500" + movieDetails.backgroundUrl
    const posterUrl = "https://image.tmdb.org/t/p/w500" + movieDetails.posterUrl
    const releaseDate = movieDetails.releaseDate
    const date = new Date(releaseDate);
    const formattedDate = format(date, "EEE MMM dd yyyy");

    // console.log(formattedDate)
    // console.log(date)
    // console.log(movieDetails)

    return(
      <>
      <div className="movie-details-cont">
          <div className="details-box">
            <div className="img-det-cont">
              <img src={posterUrl} alt="movieImage" className="poster" />
              <div className="all-details-cont">
                <h1 className="movie-title" >{movieDetails.title}</h1>
                <p className="movie-ratings">Rating: {movieDetails.rating}</p>
                <p className="duration" >{movieDetails.runTime}mins {movieDetails.genre}</p>
                <p className="duration"> Release Date: {formattedDate}</p>
              </div>
            </div>
            <h1 className="over-heading">OVERVIEW</h1>
            <p className="overview">{movieDetails.overview}</p>
          </div>
          <img src={coverUrl} alt="coverPhoto" className="cover-image" />
      </div>
      <h1 className="over-heading">CAST</h1>
      <Cast id={id} />
      </>
    )
  }


  const getSwitchedResults = () => {
    switch (movieState) {
      case movieApiStateConstants.loading:
        return getMovieLoaderView();
      case movieApiStateConstants.success:
        return getMovieSuccessView();
      case movieApiStateConstants.failure:
        return getMovieFailureView();
      default:
        return null;
    }
  };

  return (
    <div className="movie-bg-cont">
      <Header />
      <div className="movie-cont">
          {getSwitchedResults()}
      </div>
    </div>
  );
}

export default Movie;
