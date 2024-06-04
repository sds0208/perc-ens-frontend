import { useCallback } from "react";
import { useState } from "react"
import { FaCaretDown, FaCaretUp } from "react-icons/fa";


const Filters = ({ filterHeader, filterContents }) => {
  const [open, setOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(''); 

  const handleOptionClick = useCallback((filterOption) => {
    setOpen(false);
    setSelectedFilter(filterOption);
    // TODO - filter the list
  }, []);

  return (
    <div className="filters">
      <div className="selected-filter" onClick={() => setOpen(!open)}><div className="selected-filter-text">{selectedFilter ? selectedFilter : filterHeader}</div>
        <FaCaretDown className={open ? 'filter-caret filter-down-caret hide' : 'filter-caret filter-down-caret'}/>
        <FaCaretUp className={open ? 'filter-caret filter-up-caret' : 'filter-caret filter-up-caret hide'}/>
      </div>
      <div className={open ? "filter-options" : "filter-options hide"} >
        {filterContents.map((filterOption, ind) => 
          <div key={ind} className="filter-option" onClick={() => handleOptionClick(filterOption)}>{filterOption}</div>
        )}
      </div>
    </div>
  )
}

export default Filters