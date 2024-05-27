import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
} from "react-icons/md";

const ListNav = ({ currentPage, totalPages, pageUp, pageDown }) => {
  return (
    <div className="list-nav">
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
