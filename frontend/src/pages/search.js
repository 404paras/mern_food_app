import React, { useState } from 'react';
import '../styles/search.css';
import { CiSearch } from "react-icons/ci";
import SearchBarSlider from '../components/SearchBarSlider';

const Search = () => {
  const [searchInput, setSearchInput] = useState('');

  const changeHandler = (e) => {
    setSearchInput(e.target.value);
  };

  const searchHandler = ()=>{
    console.log(searchInput)
    setSearchInput('')
  }

  return (
    <div className='search'>
      <div className="search-bar">
        <input
          type="text"
          name="search"
          placeholder='Search for food and restaurants'
          value={searchInput}
          onChange={changeHandler}
        />
        <button onClick={searchHandler}><CiSearch/>&nbsp; Search</button>
      </div>
      <div className="search-slider">
        <SearchBarSlider />
      </div>
    </div>
  );
};

export default Search;
