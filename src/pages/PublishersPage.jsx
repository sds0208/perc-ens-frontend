import { Link } from "react-router-dom";

const PublishersPage = () => {
  return (
    <div className="publishers-page">
      <h1>Publishers</h1>
      <p>
        The ensembles found on this site are sourced from the following
        publishers:
      </p>
      <Link to="https://c-alanpublications.com/" className="link">
        C. Alan
      </Link>
      <Link to="https://rowloff.com/" className="link">
        Rowloff
      </Link>
      <Link to="https://www.tapspace.com/" className="link">
        Tapspace
      </Link>
    </div>
  );
};

export default PublishersPage;
