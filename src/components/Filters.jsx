import { useCallback } from "react";
import { useState } from "react"
import { FaCaretDown, FaCaretUp, FaRegWindowClose } from "react-icons/fa";


const Filters = ({ filterId, filterHeader, filterContents, updateFilters }) => {
  const [open, setOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(''); 

  const handleOptionClick = useCallback((filterOption) => {
    setOpen(false);
    setSelectedFilter(filterOption);
    updateFilters(filterOption);
  }, []);

  return (
    <div className="filters" id={filterId}>
      <div className="selected-filter" onClick={() => setOpen(!open)}><div className="selected-filter-text">{selectedFilter ? selectedFilter : filterHeader}</div>
        <FaCaretDown className={open ? 'filter-caret filter-down-caret hide' : 'filter-caret filter-down-caret'}/>
        <FaCaretUp className={open ? 'filter-caret filter-up-caret' : 'filter-caret filter-up-caret hide'}/>
      </div>
      <div className={open ? "filter-options" : "filter-options hide"} >
        {filterContents.map((filterOption, ind) => 
          <div key={ind} className="filter-option" onClick={() => handleOptionClick(filterOption)}>{filterOption}</div>
        )}
      </div>
      <FaRegWindowClose className="clear-filter-icon" onClick={() => handleOptionClick('')}/>
    </div>
    
  )
}

export default Filters