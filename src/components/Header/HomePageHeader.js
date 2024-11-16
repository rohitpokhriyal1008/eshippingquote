import { Link } from "react-router-dom";
import HeaderIcon from "./HeaderIcon";
import "./homePageHeader.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authenticationActions } from "../../store/auth";

const HomePageHeader = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div className="home-header">
      <HeaderIcon />
      <div className="home-header-links-cont">
        {!auth.isAuthenticated && <Link to="/" className="home-header-link">
          Home
        </Link>}
        <Link to="/get-quote" className="home-header-link">
          Get Quote
        </Link>
        <Link to="/blog" className="home-header-link">Blog</Link>
        <Link to="/contact-us" className="home-header-link">
          contact us
        </Link>
      </div>
      <div className="home-header-btns-cont">
        {auth.isAuthenticated && (
          <Link
            onClick={() => {
              dispatch(authenticationActions.logout());
            }}
            to="/login"
            className="home-header-btn home-header-btn--register "
          >
            sign out
          </Link>
        )}
        {!auth.isAuthenticated && (
          <>
            <Link to="/login" className="home-header-btn">
              sign in
            </Link>
            <Link
              to="/register"
              className="home-header-btn home-header-btn--register "
            >
              sign up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePageHeader;
