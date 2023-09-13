import { Link } from 'react-router-dom';

const NavBar = () => {
  // the link component essentially replaces all of the anchor tags in your application ,
  // instead using the anchor tag to do the redirecting , the link component is technically an anchor tag
  // underneath but it used in react router to automatically swap things in the app , without refreshing
  // the entire page.
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Navbar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link active" aria-current="page" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/news">
              News
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
