import React, { useEffect, useState } from "react";
import "../styles/search.css";
import { CiSearch } from "react-icons/ci";
import SearchBarSlider from "../components/SearchBarSlider.js";
import { server } from "../server.js";
import axios from "axios";
import SearchCard from "../components/searchCards.js"; // Assuming there's a component named SearchCard


const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [btnClicked, setBtnClicked] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  

  const changeHandler = (e) => {
    setBtnClicked(false);
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.post(
          `${server}api/v1/search/${searchInput}`
        );
        setSearchData(data.results);
       
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };
    if (searchInput !== "") {
      fetchData();
    }
    console.log(selectedId);
  }, [searchInput, selectedId]);


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

      {btnClicked ? (
        <div>
          {selectedId !== "" ? (
            <>
              <div className="selectedSearchCard">
                {searchData
                  .filter((item) => item._id === selectedId)
                  .map((item) => (
                    <SearchCard
                      key={item._id}
                      id={selectedId}
                      image={item.image}
                      name={item.name}
                      price={item.price}
                      desc={item.description}
                      width={"100%"}
                      category={item.category}
                    />
                  ))}
              </div>
              <div
                className="searchHeading"
                style={{ margin: "1rem", fontWeight: 700 }}
              >
                More items you may like!!
              </div>
              <div className="searchInfo">
                {searchData
                  .filter((item) => item._id !== selectedId)
                  .map((item, index) => (
                    <SearchCard
                      key={index}
                      id={item._id}
                     
                      image={item.image}
                      name={item.name}
                      price={item.price}
                      desc={item.description}
                      category={item.category}
                    />
                  ))}
              </div>
            </>
          ) : (
            <>
              <div
                className="searchHeading"
                style={{ margin: "1rem", fontWeight: 700 }}
              >{`Showing results for ${searchInput}`}</div>
              <div className="searchInfo">
                {searchData.map((item, index) => (
                  <SearchCard
                    key={index}
                    image={item.image}
                    name={item.name}
                    id={item._id}
                    price={item.price}
                    category={item.category}
                    desc={item.description}
                    heading={`Showing results for ${searchInput}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      ) : searchInput ? (
        <div className="searchResult">
          {Array.isArray(searchData) &&
            searchData.map(
              (item, index) =>
                index < 6 && (
                  <button
                    key={item._id}
                    className="_37IIF _1rZ-i search-result"
                    data-testid="autosuggest-item"
                    onClick={() => {
                      setBtnClicked(true);
                      setSelectedId(item._id);
                    }}
                  >
                    <div className="_2f0cx">
                      <img
                        className="_2f0cx"
                        imageurl={item.image}
                        imageid=""
                        alt="img renderer"
                        src={item.image}
                      />
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
                  onClick={() => {
                    setBtnClicked(true);
                    setSelectedId("");
                  }}
                >
                  <CiSearch /> <span>See more results</span>
                </div>
              </div>
            </button>
          )}
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
