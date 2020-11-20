import React from "react";
import styled from "styled-components";
const { v4: uuidv4 } = require("../../node_modules/uuid");

const Styles = styled.div`
  form {
    display: flex;
    flex-direction: column;
    border: 1px solid green;
    border-radius: 5px;
    padding: 20px;
    margin: 30px 80px;
    margin-left: 20%;
    margin-right: 20%;
    justify-content: space-evenly;
  }
  label {
    margin-top: 15px;
  }
  .button {
    margin-top: 20px;
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
  .displayImg {
    margin-left: 35%;
  }
`;

class ImgUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: [],
      resFile: [],
    };
    this.inputImg = this.inputImg.bind(this);
    this.handleImgSubmit = this.handleImgSubmit.bind(this);
    this.fetchCurrentImg = this.fetchCurrentImg.bind(this);
  }

  componentDidMount() {
    if (this.props.post !== undefined && this.props.post !== null)
      this.fetchCurrentImg();
  }

  inputImg(e) {
    this.setState({
      selectedFile: e.target.files[0],
    });
  }

  async fetchCurrentImg() {
    let bodyJson = { uid: this.props.post.uid };
    try {
      let imgRes = await fetch("/getimages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyJson),
      });
      let imgJson = await imgRes.json();
      this.setState({ resFile: imgJson[0].path });
    } catch (err) {
      console.log(err.message);
    }
  }

  async handleImgSubmit(e) {
    e.preventDefault();
    const uid = this.props.post.uid;

    const data = new FormData();
    data.append("file", this.state.selectedFile);
    data.append("uid", uid);

    const settings = {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: data,
    };

    try {
      let sendImg = await fetch("/updateimg", settings);
      let resImg = await sendImg.json();
      this.setState({
        resFile: resImg,
      });
    } catch (err) {
      console.log(err.message);
    }
  }

  render() {
    return (
      <Styles>
        <div>
          <form onSubmit={this.handleImgSubmit}>
            <input type="file" name="image" onChange={this.inputImg}></input>
            <div className="displayImg">
              <img
                style={{ width: "30%" }}
                src={`../../${this.state.resFile}`}
              />
            </div>
            <button className="button" type="primary">
              Attach Image
            </button>
          </form>
        </div>
      </Styles>
    );
  }
}

export default ImgUpdate;
