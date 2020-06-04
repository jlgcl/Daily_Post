import React from "react";
import Carousel from "react-bootstrap/Carousel";
import styled from "styled-components";

const Styles = styled.div`
  .slider-container {
    background: #f1fafa;
  }
`;

export const CarouselComp = () => (
  <Styles>
    <Carousel className="slider-container">
      <Carousel.Item>
        <img
          className="d-block w-100 mx-auto"
          src="https://www.apta.com/wp-content/uploads/home-banner-1.jpg"
          alt="covid-19 crisis"
        />
        <Carousel.Caption>
          <h3>Should we be concerned about a second wave?</h3>
          <p>
            With protests and growing new cases, is the fear based on legitimate
            grounds...
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-50 mx-auto"
          src="https://blog.galvanize.com/wp-content/uploads/2020/01/Can-data-science-predict-the-stock-market-.jpg"
          alt="stock market"
        />
        <Carousel.Caption>
          <h3>Stock Market rallies towards the all time highs</h3>
          <p>
            With COVID-19 rampaging the nation, and the sudden surge of
            nation-wide protests, the stock market manages to rally on...
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-50 mx-auto"
          src="https://cdn.shopify.com/shopify-marketing_assets/static/share-image-generic.jpg"
          alt="shopify"
        />
        <Carousel.Caption>
          <h3 style={{ color: "black" }}>Shopify - the Canadian Story</h3>
          <p style={{ color: "black" }}>
            Shopify is now the biggest company in Canada. How does it compare
            with the giants of the Silico Valley?
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  </Styles>
);
