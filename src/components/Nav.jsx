import { Link, NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="nav">
      <Link to="/" className="home-logo-link">
        <div className="logo">
          PE<br></br>DB
        </div>
      </Link>
      <div className="nav-links">
        <NavLink className="link" to="/">
          Home
        </NavLink>
        <NavLink className="link" to="/publishers">
          Publishers
        </NavLink>
      </div>
    </nav>
  );
};

export default Nav;
