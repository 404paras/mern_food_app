import React, { useEffect, useState } from "react";
import "../styles/search.css";
import { CiSearch } from "react-icons/ci";
import SearchBarSlider from "../components/SearchBarSlider";
import { server } from "../server.js";
import axios from "axios";
import AllCards from "../components/AllCards.js";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [btnClicked, setBtnClicked] = useState(false);

  const changeHandler = (e) => {
    setBtnClicked(false);
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    async function fetch() {
      try {
        const { data } = await axios.post(
          `${server}api/v1/search/${searchInput}`
        );
        
        setSearchData(data.results);
        
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }
    if (searchInput !== "") {
      fetch();
     
    }
  }, [searchInput]);
  

  return (
    <div className="search">
      <div className="search-bar">
        <input
          type="text"
          name="search"
          placeholder="Search for food and restaurants"
          value={searchInput}
          onChange={changeHandler}
        />
        <div className="svg_search">
          <CiSearch />
        </div>
      </div>
      
      {btnClicked && searchData? (
        <AllCards 
        heading={`Showing Results for ${searchInput}`}
        data={searchData} 
        fontSize={"0.6rem"}
        />
      ) : searchInput ? (
        <div class="searchResult">
          {Array.isArray(searchData) &&
            searchData.map(
              (item, index) =>
                index < 6 && (
                  <button
                    className="_37IIF _1rZ-i search-result"
                    data-testid="autosuggest-item"
                  >
                    <div className="_2f0cx">
                      <img
                        className="_2f0cx"
                        imageurl={item.image}
                        imageid=""
                        alt="img renderer"
                        src={item.image}
                      ></img>
                    </div>
                    <div className="_23LIV">
                      <div className="RNzoC">
                        <b>{item.name}</b>
                      </div>
                      <div className="_1Z_E6">{item.category.join(" ")}</div>
                    </div>
                  </button>
                )
            )}
         
          {searchData.length > 6 && (
            <button className="morebtn">
              <div className="morebtn">
                <div
                  className="search-result morebtnstyle"
                  onClick={() => setBtnClicked(true)}
                >
                  <CiSearch /> {"  "}
                  <span>See more results</span>
                </div>
              </div>
            </button>
          )}
        </div>
      ) : (
        <div className="search-slider ">
          <SearchBarSlider />
        </div>
      )}
    </div>
  );
};

export default Search;
