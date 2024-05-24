import { Link } from "react-router-dom";

const ListRow = ({ ens }) => {
    const returnPublisher = (linkString) => {
        let publisher = '';
        if (linkString.includes('tapspace')) {
            publisher = 'Tapspace';
        } else if (linkString.includes('rowloff')) {
            publisher = 'Rowloff';
        } else {
            publisher = 'C. Alan';
        }
        return publisher;
    }
    return (
        <div className="list-row">
            <div className="title">{ens.title} - {ens.composer}</div>
            <Link to={ens.link} className="link">View on {returnPublisher(ens.link)}</Link>
        </div>
    )
}

export default ListRow