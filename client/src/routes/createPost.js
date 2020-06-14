import React from "react";
import styled from "styled-components";
import ImgUpload from "./uploadImg";

const Styles = styled.div``;

class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      author: "",
      summary: "",
      message: "",
      category: "",
      selectedFile: "",
      postId: "",
    };
    this.titleInput = this.titleInput.bind(this);
    this.authorInput = this.authorInput.bind(this);
    this.summaryInput = this.summaryInput.bind(this);
    this.messageInput = this.messageInput.bind(this);
    this.inputCat = this.inputCat.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleIdChange = this.handleIdChange.bind(this);
  }

  titleInput(e) {
    this.setState({
      title: e.target.value,
    });
  }
  authorInput(e) {
    this.setState({
      author: e.target.value,
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

    const bodyRes = {
      uid: this.state.postId,
      title: this.state.title,
      author: this.state.author,
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
      // let submitDataRes = await submitData.json();
      window.location.href = "/";
    } catch (err) {
      console.log("error");
    }
  }

  /* FAILED TO SEND MULTIPLE DATA IN ONE REQUEST - CREATE A SEPARATE ROUTE FOR IMAGE UPLOAD INSTEAD */
  // async handleImgSubmit(e) {
  //   e.preventDefault();

  //   this.setState({
  //     postId: uuidv4(),
  //   });

  //   const title = JSON.stringify(this.state.title);
  //   const summary = JSON.stringify(this.state.summary);
  //   const message = JSON.stringify(this.state.message);
  //   const author = JSON.stringify(this.state.author);
  //   const category = JSON.stringify(this.state.category);

  //   const data = new FormData();
  //   data.append("file", this.state.selectedFile);
  //   console.log(data, this.state.selectedFile);

  //   const setting = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //       "Access-Control-Allow-Origin": "*",
  //       "Access-Control-Allow-Credentials": true,
  //     },
  //     body: {
  //       // data,
  //       title: title,
  //       author: author,
  //       summary: summary,
  //       message: message,
  //       category: category,
  //     }, //req.body.data === this.state.selectedFile
  //   };
  //   try {
  //     let submitImgData = await fetch("/createpost", setting);
  //     //let submitImgDataRes = await submitImgData.json();
  //   } catch (err) {
  //     console.log("errofr");
  //   }
  // }

  render() {
    return (
      <Styles>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label for="title">Title:&nbsp;</label>
            <input type="text" name="title" onChange={this.titleInput}></input>
            <label for="author">Author:&nbsp;</label>
            <input
              type="text"
              name="author"
              onChange={this.authorInput}
            ></input>
            <label for="summary">Summary:&nbsp;</label>
            <input
              type="textbox"
              name="summary"
              onChange={this.summaryInput}
            ></input>
            <label for="message">Message:&nbsp;</label>
            <input
              type="textbox"
              name="message"
              onChange={this.messageInput}
            ></input>
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
            <button type="primary">Submit</button>
          </form>
          <p>
            Upload image:{" "}
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
