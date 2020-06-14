import React from "react";
import styled from "styled-components";
const { v4: uuidv4 } = require("../../node_modules/uuid");

const Styles = styled.div``;

class ImgUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: [],
    };
    this.inputImg = this.inputImg.bind(this);
    this.handleImgSubmit = this.handleImgSubmit.bind(this);
  }

  inputImg(e) {
    this.setState({
      selectedFile: e.target.files[0],
    });
  }

  async handleImgSubmit(e) {
    e.preventDefault();
    const newId = uuidv4();
    this.props.onIdChange(newId);
    const uid = this.props.identifier;

    const data = new FormData();
    data.append("file", this.state.selectedFile);
    data.append("uid", newId);

    const settings = {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: data,
    };

    try {
      let sendImg = await fetch("/uploadimg", settings);
    } catch (err) {
      console.log("err");
    }
  }

  render() {
    return (
      <Styles>
        <div>
          <form onSubmit={this.handleImgSubmit}>
            <input type="file" name="image" onChange={this.inputImg}></input>
            <button type="primary">Upload Image</button>
          </form>
        </div>
      </Styles>
    );
  }
}

export default ImgUpload;
