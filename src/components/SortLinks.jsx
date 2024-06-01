const SortLinks = ({ sortMethod, updateSortMethod }) => {
  return (
    <div className="sort-links">
      <div
        className={sortMethod === "title" ? "sort-link selected" : "sort-link"}
        data-value="title"
        onClick={(e) => updateSortMethod(e.target.getAttribute("data-value"))}
      >
        Sort by Title
      </div>
      <div
        className={
          sortMethod === "composer" ? "sort-link selected" : "sort-link"
        }
        data-value="composer"
        onClick={(e) => updateSortMethod(e.target.getAttribute("data-value"))}
      >
        Sort by Composer
      </div>
      <div
        className={sortMethod === "link" ? "sort-link selected" : "sort-link"}
        data-value="link"
        onClick={(e) => updateSortMethod(e.target.getAttribute("data-value"))}
      >
        Sort by Publisher
      </div>
    </div>
  );
};

export default SortLinks;
