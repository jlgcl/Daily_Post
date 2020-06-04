import React from "react";
import styled from "styled-components";
import { CarouselComp } from "../components/carousel";

const Styles = styled.div`
  .mainHeader {
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  a {
    margin-left: 40%;
  }
`;

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Styles>
        <div>
          <div className="mainHeader">
            <a href="https://fontmeme.com/old-english-fonts/">
              <img
                src="https://fontmeme.com/permalink/200604/747543f1e3d6d2672290ec8f66f2bdfb.png"
                alt="old-english-fonts"
                border="0"
              ></img>
            </a>
          </div>
          <CarouselComp />
          <div></div>
        </div>
      </Styles>
    );
  }
}

export default Home;
