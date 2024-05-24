import { useState, useEffect } from "react";
import ListNav from "./ListNav"
import ListRow from "./ListRow"

const List = ({ sortMethod }) => {
    const [allEnsembles, setAllEnsembles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllEnsembles = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/v1/ensembles');
                let data = await res.json();
                console.log(sortMethod[0]);
                
                const sortKey = sortMethod[0] === 'title' || sortMethod[0] == 'composer' ? sortMethod[0] : 'link';
                console.log(sortKey);
                data = data.sort((a,b) => a[sortKey].trim().localeCompare(b[sortKey].trim()));
                console.log(data)
                setAllEnsembles(data); 
            } catch (error) {
                console.error('Error in fetch call for percussion ensembles.', error);
            } finally {
                setLoading(false);
            }
        }

        fetchAllEnsembles();
    }, []);

    return (
        <div className="list">
            <h1>Percussion Ensemble DB</h1>
            <p>A list of percussion ensembles offered by several major publishers</p>
            <div className={loading ? 'loading-icon' : 'loading-icon hide'}>Loading...</div>
            <div className={loading ? 'list-wrapper hide' : 'list-wrapper'}>
                {allEnsembles.map((ens) => (
                    <ListRow key={ens.id} ens={ens} />
                ))}
            </div>
            <ListNav />
        </div>
    )
}

export default List