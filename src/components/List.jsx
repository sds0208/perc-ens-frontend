import { useCallback, useEffect, useRef, useState } from "react";
import ListNav from "./ListNav";
import ListRow from "./ListRow";
import Spinner from "./Spinner";
import SearchBar from "./SearchBar";
import MediaPlayer from "./MediaPlayer";

const List = () => {
  const [sortMethod, setSortMethod] = useState("title");
  const [allEnsembles, setAllEnsembles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [audioSrc, setAudioSrc] = useState("");

  const totalPages = useRef(0);
  const totalEnsembles = useRef(0);

  useEffect(() => {
    if (audioSrc.includes("soundcloud")) {
      console.log(audioSrc);
    }
  }, [audioSrc]);

  useEffect(() => {
    console.log("searchTerm changed to:", searchTerm);
  }, [searchTerm]);

  const updateSortMethod = useCallback((e) => {
    setSortMethod(e.target.getAttribute("data-value"));
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
      <p>
        {totalEnsembles.current} ensembles sorted by{" "}
        {sortMethod == "link" ? "publisher" : sortMethod}
      </p>
      <div className={loading ? "list-wrapper hide" : "list-wrapper"}>
        {allEnsembles.map((ens, ind) => (
          <ListRow
            dataPage={Math.floor(ind / 20) + 1}
            key={ens.id}
            ens={ens}
            isList={true}
            currentPage={currentPage}
            searchTerm={searchTerm}
            getAudioSrc={() => setAudioSrc(ens.audio)}
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
      <MediaPlayer audioSrc={audioSrc} />
    </div>
  );
};

export default List;
