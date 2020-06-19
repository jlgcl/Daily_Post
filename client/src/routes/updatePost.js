import React from "react";
import styled from "styled-components";
import ImgUpdate from "./updateImg";

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
  .checkboxes,
  .statusBoxes {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin-top: 20px;
  }
  .checkboxes label,
  .statusBoxes label {
    margin-top: 0px;
  }
`;

class UpdatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      summary: "",
      message: "",
      status: "",
      category: "",
      selectedFile: "",
    };
    this.titleInput = this.titleInput.bind(this);
    this.summaryInput = this.summaryInput.bind(this);
    this.messageInput = this.messageInput.bind(this);
    this.inputCat = this.inputCat.bind(this);
    this.inputStat = this.inputStat.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleIdChange = this.handleIdChange.bind(this);
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

  inputStat(e) {
    this.setState({
      status: e.target.value,
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

    const bodyRes = {
      uid: this.state.postId,
      title: this.state.title,
      summary: this.state.summary,
      message: this.state.message,
      category: this.state.category,
      status: this.state.status,
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
      let submitData = await fetch(
        `/posts/${this.props.post._id}/update`,
        setting
      );
      window.location.href = `/posts`;
    } catch (err) {
      console.log("error");
    }
  }

  render() {
    return (
      <Styles>
        <div className="body">
          <h3 style={{ font: "loginFont" }}>Update Post</h3>
          <form className="form-container" onSubmit={this.handleSubmit}>
            <label for="title">Title:&nbsp;</label>
            <input type="text" name="title" onChange={this.titleInput}></input>
            <label for="summary">Summary:&nbsp;</label>
            <textarea name="summary" onChange={this.summaryInput}></textarea>
            <label for="message">Message:&nbsp;</label>
            <textarea name="message" onChange={this.messageInput}></textarea>
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
            <div className="statusBoxes">
              <label for="published">Published</label>
              <input
                type="checkbox"
                name="published"
                value="published"
                onClick={this.inputStat}
              ></input>
              <label for="unpublished">Unpublished</label>
              <input
                type="checkbox"
                name="unpublished"
                value="unpublished"
                onClick={this.inputStat}
              ></input>
            </div>
            <button className="button" type="primary">
              Submit
            </button>
          </form>
          <ImgUpdate post={this.props.post} />
        </div>
      </Styles>
    );
  }
}

export default UpdatePost;
