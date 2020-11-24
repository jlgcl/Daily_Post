import React from "react";
import Carousel from "react-bootstrap/Carousel";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import PostDetail from "../routes/postdetail";

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
    z-index: -1;
  }
  .carouselImg2 {
    background-image: url("https://insights.som.yale.edu/sites/default/files/insights/background/What%20the%20Plunge%20in%20the%20Stock%20Market%20Means%20for%20Individual%20Investors.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    width: 100%;
    height: 400px;
    z-index: -1;
  }
  .carouselImg3 {
    background-image: url("https://cdn.shopify.com/shopify-marketing_assets/static/share-image-generic.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    width: 100%;
    height: 400px;
    z-index: -1;
  }
  .carousel_post_title {
    color: black;
    font-family: times new roman;
    font-weight: bold;
  }
  p {
    color: black;
    font-family: times new roman;
  }

  .carousel_overlay {
    position: absolute;
    height: 400px;
    width: 100%;
    background-color: rgba(247, 247, 247, 0.4);
    z-index: 1;
  }
`;

class CarouselComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [
        {
          title: "",
          summary: "'",
        },
        {
          title: "",
          summary: "'",
        },
        {
          title: "",
          summary: "'",
        },
      ],
      img: [
        {
          path: "",
        },
        {
          path: "",
        },
        {
          path: "",
        },
      ],
    };
    this.fetchPosts = this.fetchPosts.bind(this);
    this.getImages = this.getImages.bind(this);
    this.renderImg = this.renderImg.bind(this);
  }
  componentDidMount() {
    this.fetchPosts();
  }

  getImages(data) {
    /// SENDING A REQUEST WITH POST OBJECTS TO FIND IMAGE DOCUMENTS W/ MATCHING UID ///
    const arr = data.map((a) => {
      const setting = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(a),
      };
      this.fetchImg(setting);
    });
  }

  async fetchImg(setting) {
    try {
      let idRes = await fetch("/getimages", setting);
      let idJson = await idRes.json();
      this.setState((state) => ({
        img: state.img.concat(idJson),
      }));
    } catch (err) {
      console.log(err.message);
    }
  }

  async fetchPosts() {
    const settings = {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    };
    try {
      let postReq = await fetch("/posts", settings);
      let postRes = await postReq.json();
      this.setState({
        post: postRes,
      });
      this.getImages(this.state.post);
    } catch (err) {
      console.log(err.message);
    }
  }

  renderImg(post) {
    let isImage = this.state.img;

    let isPost = post;
    let img;

    let imgInd = isImage.find((img) => img.uid === isPost.uid);

    if (imgInd) {
      return imgInd.path;
    } else {
      return "";
    }
  }

  render() {
    const posts = this.state.post;
    const img = this.state.img;

    return (
      <Styles>
        <div className="carousel_overlay"></div>
        <Carousel className="slider-container">
          <Carousel.Item>
            <div
              className="carouselImg1"
              style={{
                backgroundImage: `url(${img[img.length - 1].path})`,
              }}
            ></div>
            <Carousel.Caption>
              <Link to={`/${posts[posts.length - 1]._id}`}>
                <h3 className="carousel_post_title">
                  {posts[posts.length - 1].title}
                </h3>
              </Link>
              <p>{posts[posts.length - 1].summary}</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <div
              className="carouselImg1"
              style={{
                backgroundImage: `url(${img[img.length - 2].path})`,
              }}
            ></div>
            <Carousel.Caption>
              <Link to={`/${posts[posts.length - 2]._id}`}>
                <h3 className="carousel_post_title">
                  {posts[posts.length - 2].title}
                </h3>
              </Link>
              <p>{posts[posts.length - 2].summary}</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <div
              className="carouselImg1"
              style={{
                backgroundImage: `url(${img[img.length - 3].path})`,
              }}
            ></div>
            <Carousel.Caption>
              <Link to={`/${posts[posts.length - 3]._id}`}>
                <h3 className="carousel_post_title">
                  {posts[posts.length - 3].title}
                </h3>
              </Link>
              <p>{posts[posts.length - 3].summary}</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Styles>
    );
  }
}

export default CarouselComp;
