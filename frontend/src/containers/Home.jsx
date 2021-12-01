import React from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

import Header from "../components/Common/Header";

import Oracle from "../assets/img/Oracle-logo.png";
import Img1 from "../assets/img/Mask Group 37.png";
import Tesla from "../assets/img/Tesla_logo.png";
import Img2 from "../assets/img/Mask Group 38.png";
import Ibm from "../assets/img/2560px-IBM_logo.svg.png";
import Img3 from "../assets/img/Mask Group 36.png";

function Home() {
  const key = localStorage.getItem("PROJECT_LOGIN_USER_KEY");
  const dispatch = useDispatch();

  return (
    <div id="home">
      <Header />

      <main className="main">
        <div className="flex-main">
          <div className="main-1">
            <div className="title">
              <p>The Best Digital Business Background</p>
            </div>
            <div className="description">
              <p>
                Dreamline Digital is a free digital business meeting Background
                and designed to help you grow your network.
              </p>
            </div>
            <div className="generate">
              {key ? (
                <a
                  onClick={() => dispatch(push("/generate"))}
                  class="make-image"
                >
                  Generate your background image
                </a>
              ) : (
                <a onClick={() => dispatch(push("/signin"))} class="make-image">
                  Generate your background image
                </a>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-1">
          <div className="title">
            <p>Create your own business background</p>
          </div>
        </div>
        <div className="footer-2">
          <div className="logo-1">
            <div className="image-header">
              <div className="logo">
                <img src={Oracle} alt="" />
              </div>
              <div className="business">
                <hr />
                <p className="name">Shalina gomes</p>
                <p className="occupation">Chief Firestarter</p>
                <p className="brand">Oracle</p>
              </div>
            </div>
            <div className="image">
              <img src={Img1} alt="" />
            </div>
          </div>
          <div className="logo-2">
            <div className="image-header">
              <div className="logo">
                <img src={Tesla} alt="" />
              </div>
              <div className="business">
                <hr />
                <p className="name">Shalina gomes</p>
                <p className="occupation">Chief Firestarter</p>
                <p className="brand">Tesla</p>
              </div>
            </div>
            <div className="image">
              <img src={Img2} alt="" />
            </div>
          </div>
          <div className="logo-3">
            <div className="image-header">
              <div className="logo">
                <img src={Ibm} alt="" />
              </div>
              <div className="business">
                <hr />
                <p className="name">Shalina gomes</p>
                <p className="occupation">Chief Firestarter</p>
                <p className="brand">IBM</p>
              </div>
            </div>
            <div className="image">
              <img src={Img3} alt="" />
            </div>
          </div>
          <div class="try-now">
            {key ? (
              <span
                onClick={() => dispatch(push("/generate"))}
                class="make-image"
              >
                {" "}
                TRY NOW{" "}
              </span>
            ) : (
              <span
                onClick={() => dispatch(push("/signin"))}
                class="make-image"
              >
                {" "}
                TRY NOW{" "}
              </span>
            )}
          </div>
        </div>

        <hr />
        <div className="footer-3">
          <p>
            <strong>DREAMLINE</strong> digital
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
