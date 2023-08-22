import React, { useState, useEffect } from "react";
// import { useParams } from 'react-router-dom';
import Loader from "react-loader-spinner";

import "./index.css";

const castApiStateConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  loading: "LOADING",
};

function Cast(props) {
  const { id } = props;
  const [castState, setCastState] = useState(castApiStateConstants.initial);
  const [castDetails, setCastDetails] = useState({});

  useEffect(() => {
    GetCastDetails();
  }, [id]);

  const GetCastDetails = async () => {
    setCastState(castApiStateConstants.loading);
    const movie_id = id;
    const Api_key = "c45a857c193f6302f2b5061c3b85e743";

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${Api_key}&language=en-US`
      );
      const data = await response.json();

      const formattedData = data.cast.map((each) => ({
        charecterName: each.character,
        originalName: each.original_name,
        profileUrl: each.profile_path,
        id: each.id,
      }));
      // console.log(formattedData)
      setCastDetails(formattedData);
      setCastState(castApiStateConstants.success);
    } catch (error) {
      console.error("Error fetching movie details: ", error);
      setCastState(castApiStateConstants.failure);
    }
  };

  const getCastLoaderView = () => (
    <div className="Home-loader-container">
      <Loader type="TailSpin" color="white" size={30} />
    </div>
  );

  const getCastFailureView = () => <p className="col">FAILURE</p>;

  const getCastSuccessView = () => (
    <>
      {castDetails.map((each) => (
        <li key={each.id} className="cast-li">
          <img
            src={`https://image.tmdb.org/t/p/w500${each.profileUrl}`}
            alt="movieImage"
            className="cast-img"
          />
          <p className="char-name">{each.originalName}</p>
          <p className="char-name">charecter: {each.charecterName}</p>
        </li>
      ))}
    </>
  );

  const getCastSwitchedResults = () => {
    switch (castState) {
      case castApiStateConstants.loading:
        return getCastLoaderView();
      case castApiStateConstants.success:
        return getCastSuccessView();
      case castApiStateConstants.failure:
        return getCastFailureView();
      default:
        return null;
    }
  };

  return <ul className="cast-ul">{getCastSwitchedResults()}</ul>;
}

export default Cast;
