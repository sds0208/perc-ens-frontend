import { Link } from "react-router-dom";

const ListRow = ({ ens, isList, dataPage, currentPage }) => {
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
  return (
    <div
      className={dataPage == currentPage ? "list-row" : "list-row hide"}
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
