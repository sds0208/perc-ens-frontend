import { useCallback, useEffect, useRef, useState } from "react";
import ListNav from "./ListNav";
import ListRow from "./ListRow";
import Spinner from "./Spinner";
import SearchBar from "./SearchBar";

const List = () => {
  const [sortMethod, setSortMethod] = useState("title");
  const [allEnsembles, setAllEnsembles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const totalPages = useRef(0);
  const totalEnsembles = useRef(0);

  useEffect(() => {
    console.log("searchTerm changed to:", searchTerm);
  }, [searchTerm]);

  const updateSortMethod = useCallback((e) => {
    setSortMethod(e.target.getAttribute("data-value"));
  }, []);

  // Parse out composer for those that have it in title string
  // Update this once scraping is completed
  const returnEnsembleArrayWithComposer = useCallback((arr) => {
    arr.forEach((item, ind) => {
      let composer = item.composer ? item.composer : "";
      if (item.link.includes("c-alan") && item.title.includes("-")) {
        const itemArr = item.title.split("-");
        itemArr.forEach((str) => {
          if (str.includes("[DIG")) {
            composer = str.slice(0, str.indexOf("[DIG")).trim();
          }
        });
      }
      arr[ind]["composer"] = composer;
    });
    return arr;
  }, []);

  // Sort functionality
  useEffect(() => {
    const newArray = [...allEnsembles];
    newArray.sort((a, b) => {
      if (sortMethod === "composer") {
        const strA = a[sortMethod].split(" ").reverse().join("");
        const strB = b[sortMethod].split(" ").reverse().join("");
        return strA.localeCompare(strB);
      } else {
        return a[sortMethod]?.trim().localeCompare(b[sortMethod]?.trim());
      }
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
    <div className="list">
      <h1>Percussion Ensemble DB</h1>
      <p>A list of percussion ensembles offered by several major publishers</p>
      <div className="sort-links">
        <div
          className={
            sortMethod === "title" ? "sort-link selected" : "sort-link"
          }
          data-value="title"
          onClick={updateSortMethod}
        >
          Sort by Title
        </div>
        <div
          className={
            sortMethod === "composer" ? "sort-link selected" : "sort-link"
          }
          data-value="composer"
          onClick={updateSortMethod}
        >
          Sort by Composer
        </div>
        <div
          className={sortMethod === "link" ? "sort-link selected" : "sort-link"}
          data-value="link"
          onClick={updateSortMethod}
        >
          Sort by Publisher
        </div>
      </div>
      <SearchBar
        updateSearch={(str) => setSearchTerm(str)}
        clearSearch={(str) => setSearchTerm(str)}
      />
      <div className={loading ? "loading-icon" : "loading-icon hide"}>
        <Spinner />
      </div>
      <h4>
        {totalEnsembles.current} ensembles sorted by{" "}
        {sortMethod == "link" ? "publisher" : sortMethod}
      </h4>
      <div className={loading ? "list-wrapper hide" : "list-wrapper"}>
        {allEnsembles.map((ens, ind) => (
          <ListRow
            dataPage={Math.floor(ind / 20) + 1}
            key={ens.id}
            ens={ens}
            isList={true}
            currentPage={currentPage}
            searchTerm={searchTerm}
          />
        ))}
      </div>
      <ListNav
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
      />
    </div>
  );
};

export default List;
