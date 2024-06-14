import { Link } from "react-router-dom";
import { FaPlayCircle } from "react-icons/fa";

const ListRow = ({
  ens,
  isList,
  dataPage,
  currentPage,
  searchTerm,
  getAudioSrc,
  filterValues,
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
      // searchTerm === "" ||
      ens.title.toLowerCase().includes(searchTerm) ||
      ens.composer.toLowerCase().includes(searchTerm) ||
      ens.link.toLowerCase().includes(searchTerm)
    ) {
      return true;
    }
  };

  const difficultyFilters = {
    Easy: ["Easy", "Beginner", "Grades I", "Grades II", "Grade I", "Grade II"],
    Medium: [
      "Medium",
      "Med",
      "Intermediate",
      "Grade III",
      "Grades III",
      "Grade IV",
      "Grades IV",
    ],
    Advanced: [
      "Advanced",
      "Adv",
      "Difficult",
      "Grade V",
      "Grades V",
      "Grade VI",
      "Grades VI",
    ],
  };

  const filterValuePresent = () => {
    return filterValues.difficulty || filterValues.numPlayers;
  };

  // Filter matching functionality
  const matchesFilters = () => {
    // if (filterValues.difficulty === '' && filterValues.numPlayers === '') return true;

    let difficultyMatches = filterValues.difficulty ? false : true;
    let numPlayersMatches = filterValues.numPlayers ? false : true;
    // Difficulty filter matching
    if (filterValues.difficulty) {
      for (const str of difficultyFilters[filterValues.difficulty]) {
        if (ens?.level?.includes(str)) {
          difficultyMatches = true;
        }
      }
    }

    // Number of players filter matching
    if (filterValues.numPlayers) {
      const numPlayers = filterValues.numPlayers.split("+")[0];
      const playersArr = ens?.players
        ?.split(/[-:_+,]| /)
        .filter((item) => item.length > 0 && typeof item !== "undefined");
      const filteredPlayersArr = playersArr?.filter((item) => /\d/.test(item));
      filteredPlayersArr?.forEach(
        (item, ind) => (filteredPlayersArr[ind] = Number(item))
      );
      if (filteredPlayersArr?.length === 1) {
        if (numPlayers == filteredPlayersArr[0]) numPlayersMatches = true;
      } else if (filteredPlayersArr?.length > 1) {
        if (
          numPlayers >= filteredPlayersArr[0] &&
          numPlayers <= filteredPlayersArr[1]
        )
          numPlayersMatches = true;
      }
    }
    return difficultyMatches && numPlayersMatches;
  };

  return (
    <div
      className={
        !isList ||
        // No filters or search
        (dataPage == currentPage &&
          searchTerm === "" &&
          !filterValuePresent()) ||
        // No search present, filters present and matching
        (searchTerm === "" && filterValuePresent() && matchesFilters()) ||
        // Search present and in search, no filters present
        (searchTerm !== "" && isInSearch() && !filterValuePresent()) ||
        // Search present and in search, filters present and matching
        (searchTerm !== "" &&
          isInSearch() &&
          filterValuePresent() &&
          matchesFilters())
          ? "list-row"
          : "list-row hide"
      }
      data-page={dataPage}
    >
      <div className="title">{ens.title} </div>
      <div className="composer">{ens.composer}</div>
      <div className={ens.audio && isList ? "play-button" : "play-button hide"}>
        <FaPlayCircle className="play-button-icon" onClick={getAudioSrc} />
      </div>
      <div
        className={
          !isList && ens.level ? "ensemble-level" : "ensemble-level hide"
        }
      >
        Level: {ens.level}
      </div>
      <div
        className={
          !isList && ens.players ? "ensemble-players" : "ensemble-players hide"
        }
      >
        Players: {ens.players}
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
