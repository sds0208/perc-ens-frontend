import { useEffect, useState } from "react";
import ListNav from "./ListNav";
import ListRow from "./ListRow";

const List = () => {
  const [sortMethod, setSortMethod] = useState("title");
  const [allEnsembles, setAllEnsembles] = useState([]);
  const [loading, setLoading] = useState(true);

  const updateSortMethod = (e) => {
    console.log(e.target.getAttribute("data-value"));
    setSortMethod(e.target.getAttribute("data-value"));
    console.log("inside update sort method function", sortMethod);
  };

  useEffect(() => {
    const newArray = [...allEnsembles];
    newArray.sort((a, b) =>
      a[sortMethod].trim().localeCompare(b[sortMethod].trim())
    );
    setAllEnsembles(newArray);
  }, [sortMethod]);

  useEffect(() => {
    const fetchAllEnsembles = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/v1/ensembles");
        let data = await res.json();
        data.sort((a, b) => a["title"].trim().localeCompare(b["title"].trim()));
        setAllEnsembles(data);
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
          className="sort-link"
          data-value="title"
          onClick={updateSortMethod}
        >
          Sort by Title
        </div>
        <div
          className="sort-link"
          data-value="composer"
          onClick={updateSortMethod}
        >
          Sort by Composer
        </div>
        <div className="sort-link" data-value="link" onClick={updateSortMethod}>
          Sort by Publisher
        </div>
      </div>
      <div className={loading ? "loading-icon" : "loading-icon hide"}>
        Loading...
      </div>
      <div className={loading ? "list-wrapper hide" : "list-wrapper"}>
        {allEnsembles.map((ens) => (
          <ListRow key={ens.id} ens={ens} isList={true} />
        ))}
      </div>
      <ListNav />
    </div>
  );
};

export default List;
