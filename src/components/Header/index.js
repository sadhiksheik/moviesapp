import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { SearchContext } from "../../searchContext";

import "./index.css";

const Header = () => {
  const [search, setSearch] = useState("");
  const [isToggled, setIsToggled] = useState(false);

  const {onSearchChanged} = useContext(SearchContext)

  const handleSearchInput = (event) => {
    setSearch(event.target.value);
  };

  const onButtonClicked = () =>{
    
    onSearchChanged(search)
  }

  const onHamburgerClicked = () =>{
    setIsToggled(prevIsToggled => !prevIsToggled);
  }

  return (
    <>
    <div className="header-cont">
    <Link  className="home-link" to="/">
      <p className="header-para">MovieDb</p>
      </Link>
      <div className="filters-cont">
        <div className="filters-box">
          <button className="filters">Popular</button>
          <button className="filters">Top Rated</button>
          <button className="filters">Upcoming</button>
        </div>
        <div className="search-cont">
          <input
            onChange={handleSearchInput}
            value={search}
            className="search-input"
            type="search"
          />
          <button onClick={onButtonClicked} className="search-btn">Search</button>
        </div>
      </div>

      <GiHamburgerMenu onClick={onHamburgerClicked} size={20} className="hamberger" />
    </div>
    {isToggled && <div className="small-flters-cont">
      <button className="filters">Popular</button>
      <button className="filters">Top Rated</button>
      <button className="filters">Upcoming</button>
    </div>}
</>
  );
};
export default Header;
