import React, { useEffect, useState } from "react";
import "../styles/search.css";
import { CiSearch } from "react-icons/ci";
import SearchBarSlider from "../components/SearchBarSlider";
import { server } from "../server.js";
import axios from "axios";


const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchData, setSearchData] = useState([]);

  const changeHandler = (e) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    async function fetch() {
      try {
        const { data } = await axios.post(
          `${server}api/v1/search/${searchInput}`
        );
        console.log(data.results);
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
      {searchInput ? (
        <div class="searchResult">
          {Array.isArray(searchData) &&
            searchData.map(
              (item, index) =>
                index < 6 && (
                  <button class="_37IIF _1rZ-i search-result" data-testid="autosuggest-item">
                    <div class="_2f0cx">
                      <img
                        class="_2f0cx"
                        imageurl={item.image}
                        imageid=""
                        alt="img renderer"
                        src={item.image}
                      ></img>
                    </div>
                    <div class="_23LIV">
                      <div class="RNzoC">
                        <b>{item.name}</b>
                      </div>
                      <div class="_1Z_E6">{item.category}</div>
                    </div>
                  </button>
                )
            )}
         
         <button  class="_37IIF _1rZ-i" data-testid="autosuggest-item" style={{border:"1px solid black"}}>
          { searchData.length>6 &&
          <div><CiSearch/></div>
          }
         </button>
        </div>
      ) : (
        <div className="search-slider">
          <SearchBarSlider />
        </div>
      )}
    </div>
  );
};

export default Search;
