import { useState, useCallback } from "react";

const SearchBar = ({ updateSearch, clearSearch }) => {
  const [searchString, setSearchString] = useState("");

  const clear = useCallback(() => {
    setSearchString("");
    clearSearch("");
  }, []);

  return (
    <div className="search-bar">
      <input
        value={searchString}
        type="text"
        id="search"
        onChange={(e) => setSearchString(e.target.value)}
      />
      <button onClick={() => updateSearch(searchString.toLowerCase())}>
        Search
      </button>
      <button onClick={clear}>Clear Search</button>
    </div>
  );
};

export default SearchBar;
