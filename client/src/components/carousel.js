import React from "react";
import Carousel from "react-bootstrap/Carousel";
import styled from "styled-components";

const Styles = styled.div`
  .slider-container {
    background: #f1fafa;

    img {
      background-color: linear-gradient(to bottom, rgba(245, 246, 252, 0.52));
    }
    width: 100%;
    margin-left: 0;
    margin-right: 0;
  }

  .carouselImg1 {
    background-image: url(https://www.apta.com/wp-content/uploads/home-banner-1.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    width: 100%;
    height: 400px;
  }
  .carouselImg2 {
    background-image: url("https://insights.som.yale.edu/sites/default/files/insights/background/What%20the%20Plunge%20in%20the%20Stock%20Market%20Means%20for%20Individual%20Investors.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    width: 100%;
    height: 400px;
  }
  .carouselImg3 {
    background-image: url("https://cdn.shopify.com/shopify-marketing_assets/static/share-image-generic.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    width: 100%;
    height: 400px;
  }
`;

export const CarouselComp = () => (
  <Styles>
    <Carousel className="slider-container">
      <Carousel.Item>
        <div className="carouselImg1"></div>
        <Carousel.Caption>
          <h3>Should we be concerned about a second wave?</h3>
          <p>
            With protests and growing new cases, is the fear based on legitimate
            grounds...
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div className="carouselImg2"></div>
        <Carousel.Caption>
          <h3>Stock Market rallies towards the all time highs</h3>
          <p>
            With COVID-19 rampaging the nation, and the sudden surge of
            nation-wide protests, the stock market manages to rally on...
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div className="carouselImg3"></div>
        <Carousel.Caption>
          <h3 style={{ color: "black" }}>Shopify - the Canadian Story</h3>
          <p style={{ color: "black" }}>
            Shopify is now the biggest company in Canada. How does it compare
            with the giants of the Silicon Valley?
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  </Styles>
);
