import { Link } from "react-router-dom";

const ListRow = ({ ens, isList, dataPage, currentPage, searchTerm }) => {
  const returnPublisher = (linkString) => {
    let publisher = "";
    if (linkString.includes("tapspace")) {
      publisher = "Tapspace";
    } else if (linkString.includes("rowloff")) {
      publisher = "Rowloff";
    } else {
      publisher = "C. Alan";
    }
    return publisher;
  };

  const isInSearch = () => {
    if (
      searchTerm === "" ||
      ens.title.toLowerCase().includes(searchTerm) ||
      ens.composer.toLowerCase().includes(searchTerm) ||
      ens.link.toLowerCase().includes(searchTerm)
    ) {
      return true;
    }
  };

  return (
    <div
      className={
        (dataPage == currentPage && searchTerm === "") ||
        (searchTerm && isInSearch()) ||
        !isList
          ? "list-row"
          : "list-row hide"
      }
      data-page={dataPage}
    >
      <div className="title">
        {ens.title}{" "}
        <span className={ens.link.includes("c-alan") ? "hide" : ""}>-</span>{" "}
        {ens.composer}
      </div>
      <Link
        to={`/ensemble/${ens.id}`}
        className={isList ? "link" : "link hide"}
      >
        View More Details
      </Link>
      <span className={isList ? "margin-left" : "hide"}>|</span>
      <Link to={ens.link} className="link">
        View on {returnPublisher(ens.link)}
      </Link>
    </div>
  );
};

export default ListRow;
