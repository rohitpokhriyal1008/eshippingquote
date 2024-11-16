import "../../components/home/homePage.css";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import hero_img from "../../assets/images/home-hero.svg";
// import main1 from "../../assets/images/main-1.svg";
import about_img from "../../assets/images/home-about.svg";
import procedure_img from "../../assets/images/home-procedure.svg";
import step1 from "../../assets/images/step-step1.svg";
import step2 from "../../assets/images/step-step-2.svg";
import step3 from "../../assets/images/step-step-3.svg";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  window.addEventListener("resize", () => {
    setWidth(window.innerWidth);
  });

  useEffect(() => {
    if (auth.isAuthenticated) navigate("/account");
  }, []);


  const getStarted = async () => {
    navigate('/register');

  }

  return (
    <>
      <section className="section-hero">
        <div className="container">
          <div className="small-div hero-content">
            <h1>An Easier Way to Ship Products</h1>
            <h3>Advanced LTL Shipping Platform</h3>
            {width < 1100 ? (
              <div className="large-div img-cont">
                <img src={hero_img} alt="hero" />
              </div>
            ) : (
              ""
            )}
            <p>
              EShippingQuote takes the pain out of shipping. With a large and
              experienced freight network along with a seamless online
              experience, you can find comfort that you're receiving high
              quality service at very competitive rates.
            </p>
            <button onClick={getStarted} id="get-started-button">Get Started</button>
          </div>
          {width >= 1100 ? (
            <div className="large-div img-cont">
              <img src={hero_img} alt="hero" />
            </div>
          ) : (
            ""
          )}
        </div>
      </section>

      <section className="section-about">
        <div className="container">
          {width > 1100 ? (
            <div className="large-div img-cont">
              <img src={about_img} alt="hero" />
            </div>
          ) : (
            ""
          )}

          <div className="small-div hero-content">
            <h2>
              Full Suite Shipping Tool that Helps Businesses Ship Goods Easier
            </h2>
            {width < 1100 ? (
              <div className="large-div img-cont">
                <img src={about_img} alt="hero" />
              </div>
            ) : (
              ""
            )}
            <p>
              EShippingQuote was created to provide a cheaper, faster and
              overall more efficient shipping solution for companies of all
              sizes. Our goal is to connect companies with reliable, experienced
              and cost-friendly shippers. Once you book the shipment, we handle
              the rest.
            </p>
          </div>
        </div>
      </section>

      <section className="section-procedure">
        <div className="container">
          <div className="equal-divs">
            <h2>Reliable Shipping Solution for Businesses of All Sizes</h2>
          </div>

          <div className="equal-divs">
            <p>
              EShippingQuote takes the pain out of shipping. With a large and
              experienced freight network along with a seamless online
              experience, you can find comfort that you're receiving high
              quality service at very competitive rates.
            </p>
            {width < 1100 ? (
              <div className="large-div img-cont">
                <img src={procedure_img} alt="hero" />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="container">
          <div className="equal-divs">
            <div className="steps-cont">
              <div className="procedure-step">
                <div className="step-icon-cont">
                  <img src={step1}></img>
                </div>
                <div className="step-content">
                  <h3>Input your shipping needs</h3>
                  <p>
                    Our goal is to make your shipping experience quick and
                    painless. By leveraging a smart booking process, you can get
                    back to growing your businesses while we focus on quality
                    and transparency.
                  </p>
                </div>
              </div>

              <div className="procedure-step">
                <div className="step-icon-cont">
                  <img src={step2}></img>
                </div>
                <div className="step-content">
                  <h3>Save time & overhead</h3>
                  <p>
                    Eshipping Quote is a one-stop solution for your shipping
                    needs with the goal to save you time and money. Let us
                    handle the headaches, because that's what we're built for.
                  </p>
                </div>
              </div>

              <div className="procedure-step">
                <div className="step-icon-cont">
                  <img src={step3}></img>
                </div>
                <div className="step-content">
                  <h3>Real-time tracking & transparency</h3>
                  <p>
                    You will be able to track all of your shipments in real time
                    with 100% transparency. We pride ourselves as being a
                    full-service partner for our shippers.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {width > 1100 ? (
            <div className="large-div img-cont">
              <img src={procedure_img} alt="hero" />
            </div>
          ) : (
            ""
          )}
        </div>
      </section>
    </>
  );
};

export default HomePage;
