import React from "react";
import styled from "styled-components";

const Styles = styled.div`
  .about_container {
    min-height: 70vh;
  }

  .title {
    margin-left: 5%;
    margin-top: 5%;
  }

  .mainBody {
    margin-left: 5%;
    margin-right: 5%;
    margin-top: 5%;
  }

  .mainBody #img {
    float: left;
    width: 300px;
    height: 300px;
    background: url("https://thetyee.ca/Culture/2020/03/02/Solutions-Journalism.jpg");
    background-size: contain;
    background-repeat: no-repeat;
    margin-right: 15px;
  }
`;

export const About = () => (
  <Styles>
    <div className="about_container">
      <div className="title">
        <h1>About Daily Post</h1>

        <h5>Journalism Discovered</h5>
      </div>
      <div className="mainBody">
        <div id="img"></div>
        <div id="body">
          <p>
            Launched in June 2020, the ‘Daily Post' unites independent
            commentators and opinion shapers to provide the other side of the
            story on today’s news, media and political agendas. The Daily Post
            Editor says one of the primary objectives of the outlet will be to
            widen the debate in the social sphere. The Post is supported by the
            editor himself with external sources and contributions. All are
            permitted to sign up, login, and post anything as they please.
            <br></br>
            <br></br>
            For visitors who wish to explore the site's full functionalities
            login as: <br></br>
            username: admin <br></br>
            password: adminPass
          </p>
        </div>
      </div>
    </div>
  </Styles>
);

export default About;
