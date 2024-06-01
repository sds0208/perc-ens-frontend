import { Link } from "react-router-dom";
import { FaPlayCircle } from "react-icons/fa";

const ListRow = ({
  ens,
  isList,
  dataPage,
  currentPage,
  searchTerm,
  getAudioSrc,
}) => {
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
      <div className="title">{ens.title} </div>
      <div className="composer">{ens.composer}</div>
      <div className={ens.audio ? "play-button" : "play-button hide"}>
        <FaPlayCircle className="play-button-icon" onClick={getAudioSrc} />
      </div>

      <div className="link-wrapper">
        <Link
          to={`/ensemble/${ens.id}`}
          className={isList ? "link" : "link hide"}
        >
          View More Details
        </Link>
        <span className={isList ? "margin-left" : "hide"}> | </span>
        <Link to={ens.link} className="link">
          View on {returnPublisher(ens.link)}
        </Link>
      </div>
    </div>
  );
};

export default ListRow;
