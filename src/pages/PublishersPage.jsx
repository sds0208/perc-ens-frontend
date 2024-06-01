import { Link } from "react-router-dom";
import Hero from "../components/Hero";

const PublishersPage = () => {
  return (
    <div className="publishers-page">
      <Hero
        title="Publishers"
        subtitle="The ensembles found on this site are sourced from the following
        publishers:"
      />
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
