import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
} from "react-icons/md";

const ListNav = ({
  searchTerm,
  currentPage,
  totalPages,
  pageUp,
  pageDown,
  filterValues,
}) => {
  return (
    <div
      className={
        searchTerm === "" &&
        filterValues.difficulty === "" &&
        filterValues.numPlayers === ""
          ? "list-nav"
          : "list-nav hide"
      }
    >
      <div className="arrow back-arrow" onClick={pageDown}>
        <MdKeyboardDoubleArrowLeft className="list-nav-icon" />
        <div>Back</div>
      </div>
      <div className="page-num">
        Page {currentPage} of {totalPages}
      </div>
      <div className="arrow next-arrow" onClick={pageUp}>
        <div>Next</div>
        <MdKeyboardDoubleArrowRight className="list-nav-icon" />
      </div>
    </div>
  );
};

export default ListNav;
