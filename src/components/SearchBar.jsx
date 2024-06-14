import { useState, useCallback } from "react";
import { MdSearch } from "react-icons/md";
import { FaRegWindowClose } from "react-icons/fa";

const SearchBar = ({ updateSearch, clearSearch }) => {
  const [searchString, setSearchString] = useState("");

  const clear = useCallback(() => {
    setSearchString("");
    clearSearch("");
    updateSearch("");
  }, [clearSearch, updateSearch]);

  return (
    <div className="search-bar">
      <input
        value={searchString}
        type="text"
        id="search"
        onChange={(e) => setSearchString(e.target.value)}
      />
      <div className="search-buttons">
        <MdSearch
          className="search-bar-icon search-icon"
          onClick={() => updateSearch(searchString.toLowerCase())}
        />
        <FaRegWindowClose className="search-bar-icon" onClick={clear} />
      </div>
    </div>
  );
};

export default SearchBar;
