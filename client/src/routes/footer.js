import React from "react";
import styled from "styled-components";

const Styles = styled.div`
  .footerTop {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 60px;
    margin-top: 50px;
    margin-left: 50px;
  }
  #logo {
    margin-top: 10px;
    justify-self: start;
  }
  #social {
    margin-top: 10px;

    justify-self: end;
  }
  .divider {
    height: 1px;
    background-color: #e6e6e6;
    width: 80em;
    margin: 0 auto;
    background-image: linear-gradient(left, white 2%, #e6e6e6 50%, white 98%);
    background-image: -o-linear-gradient(
      left,
      white 2%,
      #e6e6e6 50%,
      white 98%
    );
  }
  .caption {
    font-size: 12px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    color: white;
    width: 95%;
    height: 100px;
    margin-top: 20px;
  }
  #col {
    display: flex;
    flex-direction: column;
  }
  a {
    color: white;
  }
  .button {
    color: white;
    background-color: black;
    border-radius: 5px;
    padding: 10px 20px;
    transition-duration: 0.2s;
  }
  .button:hover {
    background: white;
    color: black;
  }
`;

export const Footer = () => (
  <Styles>
    <div
      className="footer"
      style={{ background: "black", height: "300px", width: "100%" }}
    >
      <div className="footerTop">
        <div id="logo">
          <h3 style={{ color: "white" }}>Daily Blog</h3>
        </div>
        <div id="social">
          <img
            src="https://clipart.info/images/ccovers/1509135109flat-facebook-logo-black-and-white-png.png"
            style={{ width: "30px", height: "30px" }}
          ></img>
          <img
            src="https://image.flaticon.com/icons/svg/60/60580.svg"
            style={{ width: "30px", height: "30px" }}
          ></img>
          <img
            src="https://i.pinimg.com/originals/63/9b/3d/639b3dafb544d6f061fcddd2d6686ddb.png"
            style={{ width: "40px", height: "30px" }}
          ></img>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/YouTube_social_dark_circle_%282017%29.svg/1024px-YouTube_social_dark_circle_%282017%29.svg.png"
            style={{ width: "30px", height: "30px" }}
          ></img>
          <img
            src="https://image.flaticon.com/icons/svg/38/38669.svg"
            style={{ width: "30px", height: "30px" }}
          ></img>
        </div>
      </div>
      <div className="divider"></div>
      <div className="caption">
        <div id="col">
          <p>
            <a href="#">Subscribe to Daily Blog</a>
          </p>
          <p>
            <a href="#">Supply Chain Values</a>
          </p>
          <p>
            <a href="#">Digital Products</a>
          </p>
          <p>
            <a href="#">Corrections</a>
          </p>
          <p>
            <a href="#">Site Map</a>
          </p>
        </div>
        <div id="col">
          <p>
            <a href="#">Licensing and Reprints</a>
          </p>
          <p>
            <a href="#">Advertsie with us</a>
          </p>
          <p>
            <a href="#">News Releases</a>
          </p>
          <p>
            <a href="#">About Daily Blog</a>
          </p>
          <p>
            <a href="#">Help</a>
          </p>
        </div>
        <div id="col">
          <p>
            <a href="#">Join the Daily Blog Panel</a>
          </p>
          <p>
            <a href="#">Closed Captioning</a>
          </p>
          <p>
            <a href="#">Internships</a>
          </p>
          <p>
            <a href="#">AdChoices</a>
          </p>
          <p>
            <a href="#">Contact</a>
          </p>
        </div>
        <div id="col">
          <h4>News Tips</h4>
          <p>Got a confidential tip? We want to hear from you.</p>
          <button className="button">Get In Touch</button>
        </div>
      </div>
    </div>
  </Styles>
);
