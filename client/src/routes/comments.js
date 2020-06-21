import React from "react";
import styled from "styled-components";

const Styles = styled.div`
  .form-container {
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 20px;
  }
  .comments {
    margin-left: 15%;
  }

  button {
    border: 1px solid black;
    padding: 5px 10px;
    border-radius: 5px;
    background: white;
  }
  button:hover {
    background: black;
    color: white;
  }
`;

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [
        {
          title: "",
          message: "",
          author: "",
        },
        {
          title: "",
          message: "",
          author: "",
        },
      ],
      message: "Enter your Comment",
      likes: "checked", //need the default to be "checked" to initiate state check for onLike/onDislike & initiate undo like function
    };
    this.fetchComments = this.fetchComments.bind(this);
    this.postComments = this.postComments.bind(this);
    this.onCommentInput = this.onCommentInput.bind(this);
    this.onLike = this.onLike.bind(this);
    this.onDislike = this.onDislike.bind(this);
  }

  componentDidMount() {
    this.fetchComments();
  }

  async fetchComments() {
    const bodyReq = {
      uid: this.props.post.uid,
    };
    try {
      let fetchReq = await fetch(`/posts/${this.props.post._id}/comment/get`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(bodyReq),
      });
      let fetchRes = await fetchReq.json();
      this.setState({
        comments: fetchRes,
      });
    } catch (err) {
      console.log(err.message);
    }
  }

  //*LIKE*//
  async onLike(e) {
    e.preventDefault();
    console.log(this.state.likes);

    if (this.state.likes === "checked") {
      //checks if the current state is "checked", which is the default OR set after a like/dislike is clicked

      //IF this.state.likes IS USED, THEN "likes"/"dislikes" VALUES WON'T RESET PROPERLY AFTER onDislike - SET THE VALUE MANUALLY.
      const bodyReq = {
        likes: "likeUndo",
        id: e.target.id,
      };

      const commentTarget = this.state.comments.find(
        (comment) => comment._id == e.target.id
      );
      const commentInd = this.state.comments.indexOf(commentTarget);
      let stateCopy = Object.assign({}, this.state);
      try {
        let fetchReq = await fetch(
          `/posts/${this.props.post._id}/comment/likes`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify(bodyReq),
          }
        );
        let fetchRes = await fetchReq.json();

        stateCopy.comments[commentInd].likes = fetchRes.likes;
        this.setState(stateCopy);

        this.setState({
          likes: "", //resets this.state.likes for it to allow like to increment (the ELSE IF statement code) when like is clicked again.
        });
      } catch (err) {
        console.log(err.message);
      }
    } else if (this.state.likes === "") {
      //IF this.state.likes IS USED, THEN "likes"/"dislikes" VALUES WON'T RESET PROPERLY AFTER onDislike - SET THE VALUE MANUALLY.
      const bodyReq = {
        likes: "like",
        id: e.target.id,
      };

      const commentTarget = this.state.comments.find(
        (comment) => comment._id == e.target.id
      );
      const commentInd = this.state.comments.indexOf(commentTarget);
      let stateCopy = Object.assign({}, this.state);
      try {
        let fetchReq = await fetch(
          `/posts/${this.props.post._id}/comment/likes`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify(bodyReq),
          }
        );
        let fetchRes = await fetchReq.json();

        stateCopy.comments[commentInd].likes = fetchRes.likes;
        this.setState(stateCopy);

        this.setState({
          likes: "checked", //resets this.state.likes for it to undo when like is clicked again - executes the IF statement code.
        });
      } catch (err) {
        console.log(err.message);
      }
    }
  }

  //*DISLIKE*//
  async onDislike(e) {
    e.preventDefault();
    console.log(this.state.likes);
    if (this.state.likes === "checked") {
      const bodyReq = {
        likes: "dislikeUndo",
        id: e.target.id,
      };
      const commentTarget = this.state.comments.find(
        (comment) => comment._id == e.target.id
      );
      const commentInd = this.state.comments.indexOf(commentTarget);
      let stateCopy = Object.assign({}, this.state);
      try {
        let fetchReq = await fetch(
          `/posts/${this.props.post._id}/comment/likes`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify(bodyReq),
          }
        );
        let fetchRes = await fetchReq.json();
        stateCopy.comments[commentInd].dislikes = fetchRes.dislikes;
        this.setState(stateCopy);

        this.setState({
          likes: "",
        });
      } catch (err) {
        console.log(err.message);
      }
    } else if (this.state.likes === "") {
      const bodyReq = {
        likes: "dislike",
        id: e.target.id,
      };
      const commentTarget = this.state.comments.find(
        (comment) => comment._id == e.target.id
      );
      const commentInd = this.state.comments.indexOf(commentTarget);
      let stateCopy = Object.assign({}, this.state);
      try {
        let fetchReq = await fetch(
          `/posts/${this.props.post._id}/comment/likes`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify(bodyReq),
          }
        );
        let fetchRes = await fetchReq.json();
        stateCopy.comments[commentInd].dislikes = fetchRes.dislikes;
        this.setState(stateCopy);

        this.setState({
          likes: "checked",
        });
      } catch (err) {
        console.log(err.message);
      }
    }
  }

  async postComments(e) {
    e.preventDefault();

    const bodyReq = {
      uid: this.props.post.uid,
      message: this.state.message,
    };

    const settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(bodyReq),
    };
    try {
      let commentReq = await fetch(
        `/posts/${this.props.post._id}/comment`,
        settings
      );
      let commentRes = await commentReq.json();
      this.setState({
        comments: commentRes,
      });
    } catch (err) {
      console.log(err.message);
    }
  }

  onCommentInput(e) {
    e.preventDefault();
    this.setState({
      message: e.target.value,
    });
  }

  //***JS sort methods to organize comments by likes, date (newest -> oldest; currently: oldest -> newest) - do this as display: none tab, or nested react router

  render() {
    const listComments = this.state.comments.map((comment) => {
      return (
        <div>
          <p>{comment.message}</p>
          <div className="commentFooter">
            <p style={{ color: "cyan", fontSize: "10px" }}>
              {comment.author} - {comment.date}
            </p>
            <p id={comment._id} onClick={this.onLike}>
              like Test - {comment.likes}
            </p>
            <p id={comment._id} onClick={this.onDislike}>
              dislike Test - {comment.dislikes}
            </p>
          </div>
        </div>
      );
    });

    return (
      <Styles>
        <div>
          <h5 style={{ marginLeft: "10%" }}>Comments</h5>
          <hr style={{ width: "80%" }}></hr>
          <form className="form-container" onSubmit={this.postComments}>
            <textarea
              style={{ marginLeft: "90px", width: "80%", height: "80px" }}
              value={this.state.message}
              name="comment"
              onChange={this.onCommentInput}
            />
            <br></br>
            <button type="primary" style={{ marginLeft: "90px" }}>
              Submit
            </button>
          </form>
        </div>
        <hr style={{ width: "70%" }}></hr>
        <div className="comments">{listComments}</div>
      </Styles>
    );
  }
}

export default Comments;
