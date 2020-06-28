import React from "react";
import styled from "styled-components";
import ImgUpload from "./uploadImg";

const Styles = styled.div`
  h3 {
    margin-left: 44%;
    margin-top: 30px;
  }

  .form-container {
    display: flex;
    flex-direction: column;
    border: 1px solid green;
    border-radius: 5px;
    padding-left: 40px;
    padding-right: 40px;
    margin: 30px 80px;
    margin-left: 20%;
    margin-right: 20%;
    justify-content: space-evenly;
  }
  .form-container label {
    margin-top: 15px;
  }
  .button {
    margin-top: 40px;
    margin-bottom: 20px;
    margin-left: 260px;
    margin-right: 260px;
    border: 1px solid black;
    padding: 5px 10px;
    border-radius: 5px;
    background: white;
  }
  .button:hover {
    background: black;
    color: white;
  }
  .checkboxes {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin-top: 20px;
  }
  .checkboxes label {
    margin-top: 0px;
  }
`;

class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      summary: "",
      message: "",
      category: "",
      selectedFile: "",
      postId: "",
      user: "",
    };
    this.titleInput = this.titleInput.bind(this);
    this.summaryInput = this.summaryInput.bind(this);
    this.messageInput = this.messageInput.bind(this);
    this.inputCat = this.inputCat.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleIdChange = this.handleIdChange.bind(this);
    this.fetchUser = this.fetchUser.bind(this);
  }

  componentDidMount() {
    this.fetchUser();
  }

  titleInput(e) {
    this.setState({
      title: e.target.value,
    });
  }
  summaryInput(e) {
    this.setState({
      summary: e.target.value,
    });
  }
  messageInput(e) {
    this.setState({
      message: e.target.value,
    });
  }

  inputCat(e) {
    this.setState({
      category: e.target.value,
    });
  }

  inputImg(e) {
    this.setState({
      selectedFile: e.target.files[0],
    });
  }

  handleIdChange(id) {
    this.setState({
      postId: id,
    });
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (this.state.user === "admin" || this.state.user !== "") {
      const bodyRes = {
        uid: this.state.postId,
        title: this.state.title,
        summary: this.state.summary,
        message: this.state.message,
        category: this.state.category,
      };
      const setting = {
        method: "POST",
        redirect: "follow",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Methods":
            "GET, POST, OPTIONS, PUT, PATCH, DELETE",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept, Authorization",
        },
        body: JSON.stringify(bodyRes),
      };

      try {
        let submitData = await fetch("/createpost", setting);
        window.location.href = "/";
      } catch (err) {
        console.log("error");
      }
    } else {
      window.location.href = "/create_post";
    }
  }

  async fetchUser() {
    try {
      let userReq = await fetch("/user_data", {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      });
      let userRes = await userReq.json();
      this.setState({
        user: userRes,
      });
      console.log(this.state.user);
    } catch (err) {
      console.log(err.message);
    }
  }

  render() {
    let user = this.state.user;
    let userStatus;
    if (user === "admin" || user !== "") {
      userStatus = "Submit";
    } else if (user === "") {
      userStatus = "Must be Logged In";
    }

    return (
      <Styles>
        <div className="body">
          <h3 style={{ font: "loginFont" }}>Create a Post</h3>
          <form className="form-container" onSubmit={this.handleSubmit}>
            <label for="title">Title:&nbsp;</label>
            <input
              type="text"
              name="title"
              onChange={this.titleInput}
              maxlength="20"
            ></input>
            <label for="summary">Summary:&nbsp;</label>
            <textarea
              name="summary"
              onChange={this.summaryInput}
              maxlength="20"
            ></textarea>
            <label for="message">Message:&nbsp;</label>
            <textarea
              name="message"
              onChange={this.messageInput}
              maxlength="20"
            ></textarea>
            <div className="checkboxes">
              <input
                type="checkbox"
                name="general"
                value="general"
                onClick={this.inputCat}
              ></input>
              <label for="general">General</label>
              <input
                type="checkbox"
                name="politics"
                value="politics"
                onClick={this.inputCat}
              ></input>
              <label for="politics">Politics</label>
              <input
                type="checkbox"
                name="economics"
                value="economics"
                onClick={this.inputCat}
              ></input>
              <label for="economics">Economics</label>
              <input
                type="checkbox"
                name="business"
                value="business"
                onClick={this.inputCat}
              ></input>
              <label for="business">Business</label>
              <input
                type="checkbox"
                name="technology"
                value="technology"
                onClick={this.inputCat}
              ></input>
              <label for="technology">Technology</label>
            </div>

            <button className="button" type="primary">
              {userStatus}
            </button>
          </form>
          <p>
            <ImgUpload
              identifier={this.state.postId}
              onIdChange={this.handleIdChange}
            />
          </p>
        </div>
      </Styles>
    );
  }
}

export default CreatePost;
