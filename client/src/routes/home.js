import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import CarouselComp from "../components/carousel";
import MainNav from "../components/main_nav";
import HomeMain from "./home_main";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Posts from "../routes/posts";
import Politics from "./politics";
import Economics from "../routes/economics";
import Business from "../routes/business";
import Technology from "../routes/technology";
import "../App.css";

const Styles = styled.div`
  .main {
    margin: 20px 20px;
    margin-top: 50px;
    max-width: 100%;
    overflow: hidden;
  }
  .mainHeader {
    width: 100%;
    margin-top: 20px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    max-width: 100%;
    overflow: hidden;
  }
  a {
    margin-top: 10px;
  }
  .weatherSection {
    display: flex;
    flex-direction: row;
    width: 150px;
  }
  .weather {
    height: 70%;
    width: 100px;
    display: flex;
    flex-direction: column;
  }
  .weatherIcon {
    justify-self: end;
  }
  .loginStatus {
    width: 150px;
    align-self: center;
  }
`;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      temperature: "",
      weather: "",
      username: "NOT LOGGED IN",
    };
    this.fetchWeather = this.fetchWeather.bind(this);
    this.fetchUser = this.fetchUser.bind(this);
  }
  //weatherapp api key: ae1a61d946925e8eb436efb450fe5979
  //api call: api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}

  componentDidMount() {
    this.fetchWeather();
    this.fetchUser();
  }
  async fetchWeather() {
    let weatherResponse = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=Toronto&appid=ae1a61d946925e8eb436efb450fe5979"
    );
    let weatherResJson = await weatherResponse.json();
    this.setState({
      location: weatherResJson.name,
      temperature: Math.round(weatherResJson.main.temp - 273.15) + " C",
      weather: weatherResJson.weather[0].main,
    });
  }

  async fetchUser() {
    const setting = {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, OPTIONS, PUT, PATCH, DELETE",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, Authorization",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json",
      },
    };
    try {
      let res = await fetch("/user_data", setting);
      let resJsn = await res.json();
      // let resJs = JSON.parse(resJson);
      this.setState({
        username: resJsn,
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { username } = this.state;
    let weatherState = this.state.weather;
    let weatherImg;
    if (weatherState === "Clear") {
      weatherImg = "https://openweathermap.org/img/wn/01d.png";
    } else if (weatherState === "Clouds") {
      weatherImg = "https://openweathermap.org/img/wn/03d.png";
    } else if (weatherState === "Rain") {
      weatherImg = "https://openweathermap.org/img/wn/09d.png";
    } else if (weatherState === "Snow") {
      weatherImg = "https://openweathermap.org/img/wn/13d.png";
    } else {
      weatherImg = "n/a";
    }

    return (
      <Styles>
        <div>
          <div className="mainHeader">
            <div className="weatherSection">
              <div className="weatherIcon">
                <img src={weatherImg}></img>
              </div>
              <div className="weather">
                <h6>{this.state.location}</h6>
                <p>{this.state.temperature}</p>
                <p>{this.state.weather}</p>
              </div>
            </div>
            <a href="/">
              <img
                src="https://fontmeme.com/permalink/201122/47c59add3e0aeac48b623766ffbe81a2.png"
                alt="engravers-old-english-font"
                border="0"
              />
            </a>
            <div className="loginStatus">
              <p>You're logged in as: {this.state.username} </p>
            </div>
          </div>
          <div className="mainNav">
            <MainNav />
          </div>
          <CarouselComp />
          <div className="main">
            <HomeMain />
          </div>
          <Router>
            <Route exact path="/posts_home" component={Posts}></Route>
            <Route exact path="/politics_home" component={Politics}></Route>
            <Route path="/economics_home" component={Economics}></Route>
            <Route path="/business_home" component={Business}></Route>
            <Route path="/technology_home" component={Technology}></Route>
          </Router>
        </div>
      </Styles>
    );
  }
}

export default Home;
