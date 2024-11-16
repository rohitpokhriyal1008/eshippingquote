import FooterIcon from "./FooterIcon";
import "./homePageFooter.css";
import hfb from "../../assets/icons/hfb.svg";
import hlkn from "../../assets/icons/hlkn.svg";
import { useNavigate } from "react-router-dom";

const HomePageFooter = () => {
  const navigate = useNavigate();
  return (
    <div className="home-page-footer">
      <div
        onClick={() => {
          navigate("/");
        }}
      >
        <FooterIcon />
      </div>
      <div className="home-page--foot-list-cont">
        <div className="home-page--foot-list">
          <span>About</span>
          <a
            href="/"
          >
            Home
          </a>
          <a
            href="/blog"
          >
            Blog
          </a>
        </div>
        <div className="home-page--foot-list">
          <span>Products</span>
          <a
            href="/get-quote/ltl"
          >
            LTL
          </a>
          <a
            href="/get-quote/container"
          >
            FCL
          </a>
        </div>{" "}
        <div className="home-page--foot-list">
          <span>account</span>
          <a
            href="/login"
          >
            Log in
          </a>
          <a
            href="/register"
          >
            Sign up
          </a>
        </div>
        <div className="home-page--foot-list">
          <span>Legal</span>
          <a href="/privacy">Privacy</a>
          <a href="/terms-and-conditions">Terms</a>
        </div>
      </div>
      <div className="home-page--social-cont">
        <span>Contact us</span>
        <a
          className="homepage-footer-mailto"
          href="mailto:Support@EShippingQuote.com"
        >
          Support@EShippingQuote.com
        </a>
        <div className="homepage-social-icons-cont">
          <img src={hfb} alt="hfb" />
          <img src={hlkn} alt="hlkn" />
        </div>
      </div>
    </div>
  );
};

export default HomePageFooter;
