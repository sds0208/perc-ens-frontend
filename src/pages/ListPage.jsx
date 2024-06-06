import { useCallback, useEffect, useRef, useState } from "react";
import ListNav from "../components/ListNav";
import ListRow from "../components/ListRow";
import Spinner from "../components/Spinner";
import SearchBar from "../components/SearchBar";
import MediaPlayer from "../components/MediaPlayer";
import SortLinks from "../components/SortLinks";
import Hero from "../components/Hero";
import Filters from "../components/Filters";

const List = () => {
  const [sortMethod, setSortMethod] = useState("title");
  const [allEnsembles, setAllEnsembles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResultsCount, setSearchResultsCount] = useState(0);
  const [audioSrc, setAudioSrc] = useState("");
  const [searchResultsRendered, setSearchResultsRendered] = useState(true);
  const [filterValues, setFilterValues] = useState({numPlayers: '', difficulty: ''});

  const totalPages = useRef(0);
  // const searchPages = useRef(0);
  const totalEnsembles = useRef(0);
  const listParentRef = useRef();

  useEffect(() => {
    setSearchResultsRendered(false);
  }, [searchTerm, filterValues]);

  const updateSearchResultsCount = useCallback(() => {
    setTimeout(() => {
      setSearchResultsCount(
        listParentRef.current.querySelectorAll(".list-row:not(.hide)").length
      );
      setSearchResultsRendered(true);
    }, 500);
  }, []);

  const updateSearch = useCallback((str) => {
    setSearchTerm(str);
    updateSearchResultsCount();
  }, []);

  // Filter functionality
  const updateDifficultyFilter = useCallback((str) => {
    setFilterValues((prev) => ({...prev, difficulty: str}));
    updateSearchResultsCount();
  }, []);

  const updateNumPlayersFilter = useCallback((str) => {
    setFilterValues((prev) => ({...prev, numPlayers: str}));
    updateSearchResultsCount();
  }, []);

  // Sort
  const updateSortMethod = useCallback((method) => {
    setSortMethod(method);
  }, []);

  // Format composer values for consistency
  // Update this once scraping is completed
  const returnEnsembleArrayWithComposer = useCallback((arr) => {
    arr.forEach((item, ind) => {
      let composer = item.composer || "";
      let nameArr;
      if (composer.length && !composer.includes(",")) {
        nameArr = composer.split(" ");
        if (composer.includes("Santa Cruz")) {
          composer = "Santa Cruz, Sarah";
        } else {
          composer = `${nameArr[nameArr.length - 1]}, ${nameArr
            .slice(0, nameArr.length - 1)
            .join(" ")}`;
        }
      }
      if (composer.length && composer.includes("(")) {
        composer = composer.slice(0, composer.indexOf("(") - 1);
      }
      arr[ind]["composer"] = composer;
    });
    return arr;
  }, []);

  // Sort functionality
  useEffect(() => {
    const newArray = [...allEnsembles];
    newArray.sort((a, b) => {
      return a[sortMethod]?.trim().localeCompare(b[sortMethod]?.trim());
    });
    // Move items with no composer to the end
    // This might not be necessary soon
    if (sortMethod === "composer") {
      const noComposerList = [];
      while (newArray[0].composer == "") {
        noComposerList.push(newArray.shift());
      }
      newArray.push(...noComposerList);
    }
    setAllEnsembles(newArray);
    setCurrentPage(1);
  }, [sortMethod]);

  // Fetch on first render
  useEffect(() => {
    const fetchAllEnsembles = async () => {
      try {
        // Get ensemble list from backend
        const res = await fetch("http://localhost:3000/api/v1/ensembles");
        let data = await res.json();

        // Remove duplicate digital versions from C.Alan
        let filteredData = data.filter(
          (item) => !item["title"].includes("[DIG")
        );

        // Initially sort by title
        filteredData.sort((a, b) =>
          a["title"]?.trim().localeCompare(b["title"]?.trim())
        );
        setAllEnsembles(returnEnsembleArrayWithComposer(filteredData));
        // setAllEnsembles(filteredData);

        // Set total ensembles and number of pages
        totalEnsembles.current = filteredData.length;
        totalPages.current = Math.ceil(filteredData.length / 20);
      } catch (error) {
        console.error("Error in fetch call for percussion ensembles.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllEnsembles();
  }, []);

  return (
    <div className="list" ref={listParentRef}>
      {/* Page Hero */}
      <Hero
        title="Percussion Ensemble DB"
        subtitle="A database of percussion ensembles offered by several major publishers"
      />
      {/* Filters */}
      <div className="filters-container">
        <Filters filterId="difficulty" filterHeader="Select Difficulty" filterContents={['Easy', 'Medium', 'Advanced']} updateFilters={updateDifficultyFilter}/>
        <Filters filterId="numPlayers" filterHeader="Number of Players" filterContents={['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15+']} updateFilters={updateNumPlayersFilter}/>
      </div>
      {/* Ensemble Search */}
      <SearchBar
        updateSearch={(str) => updateSearch(str)}
        clearSearch={(str) => updateSearch(str)}
      />
      <SortLinks sortMethod={sortMethod} updateSortMethod={updateSortMethod} />
      <div className={loading ? "loading-icon" : "loading-icon hide"}>
        <Spinner />
      </div>
      {/* All Results Count */}
      <p
        className={searchTerm === "" && filterValues.difficulty === '' && filterValues.numPlayers === '' ? "ensemble-count" : "ensemble-count hide"}
        key={`${sortMethod}-1`}
      >
        {`${totalEnsembles.current} ensembles sorted by `}
        {sortMethod == "link" ? "publisher" : sortMethod}
      </p>
      {/* Search Results Count */}
      <p
        className={
          (searchTerm.length > 0 && searchResultsRendered) || (filterValues.difficulty.length > 0 && searchResultsRendered) || (filterValues.numPlayers.length > 0 && searchResultsRendered)
            ? "ensemble-count"
            : "ensemble-count hide"
        }
        key={`${sortMethod}-2`}
      >
        {`${searchResultsCount} results sorted by `}
        {sortMethod == "link" ? "publisher" : sortMethod}
      </p>
      {/* Ensemble List */}
      <div
        className={
          loading || (searchTerm.length > 0 && !searchResultsRendered)
            ? "list-wrapper hide"
            : "list-wrapper"
        }
      >
        {allEnsembles.map((ens, ind) => (
          <ListRow
            dataPage={Math.floor(ind / 20) + 1}
            key={ens.id}
            ens={ens}
            isList={true}
            currentPage={currentPage}
            searchTerm={searchTerm}
            getAudioSrc={() => setAudioSrc(ens.audio)}
            searchResultsRendered={searchResultsRendered}
            filterValues={filterValues}
          />
        ))}
      </div>
      {/* List Navigation */}
      <ListNav
        searchTerm={searchTerm}
        currentPage={currentPage}
        totalPages={totalPages.current}
        pageUp={() =>
          setCurrentPage((prev) =>
            currentPage < totalPages.current ? prev + 1 : prev
          )
        }
        pageDown={() =>
          setCurrentPage((prev) => (currentPage > 1 ? prev - 1 : prev))
        }
        filterValues={filterValues}
      />
      {/* Media Player */}
      <MediaPlayer audioSrc={audioSrc} />
    </div>
  );
};

export default List;
