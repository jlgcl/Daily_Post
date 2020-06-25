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
  .commentsSorted {
    margin-left: 15%;
  }
  .commentFooter {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
    margin-top: -15px;
  }
  .deleteComment {
    margin-left: 20px;
    margin-top: 15px;
    padding: 3px 6px;
    border-radius: 5px;
    background: white;
  }
  .deleteComment:hover {
    background: black;
    color: white;
  }
  .button {
    border: 1px solid black;
    padding: 5px 10px;
    border-radius: 5px;
    background: white;
  }
  .button:hover {
    background: black;
    color: white;
  }
  .sortButton {
    margin-left: 15%;
    margin-bottom: 30px;
    border: 1px solid black;
    padding: 3px 7px;
    background: white;
  }
  .sortButton:hover {
    background: black;
    color: white;
  }
  .sortButton:active {
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
          likeSym: "",
          dislikeSym: "",
          likesCheck: false,
          dislikesCheck: false,
        },
        {
          title: "",
          message: "",
          author: "",
          likeSym: "",
          dislikeSym: "",
          likesCheck: false,
          dislikesCheck: false,
        },
      ],
      message: "Enter your Comment",
      likes: "", //need the default to be "checked" to initiate state check for onLike/onDislike & initiate undo like function
      likeSym: "",
      dislikeSym: "",
      commentSort: false,
    };
    this.fetchComments = this.fetchComments.bind(this);
    this.postComments = this.postComments.bind(this);
    this.onCommentInput = this.onCommentInput.bind(this);
    this.onLike = this.onLike.bind(this);
    this.onDislike = this.onDislike.bind(this);
    this.sortComments = this.sortComments.bind(this);
    this.commentDelete = this.commentDelete.bind(this);
  }

  componentDidMount() {
    this.fetchComments();
  }

  async commentDelete(e) {
    e.preventDefault();

    const bodyReq = {
      id: e.target.id,
      author: e.target.name,
    };

    try {
      let deleteReq = await fetch(
        `/posts/${this.props.post._id}/comment/delete`,
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
      let deleteRes = await deleteReq.json();
      window.location.href = `/${this.props.post._id}`;
    } catch (err) {
      console.log(err.message);
    }
  }

  //Sort comments checker to perform 'switch' operation - similar to like/dislike
  sortComments(e) {
    e.preventDefault();
    if (this.state.commentSort) {
      this.setState({
        commentSort: false,
      });
    } else if (!this.state.commentSort) {
      this.setState({
        commentSort: true,
      });
    }
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

    const commentTarget = this.state.comments.find(
      (comment) => comment._id == e.target.id
    );
    const commentInd = this.state.comments.indexOf(commentTarget);

    if (this.state.comments[commentInd].likesCheck === true) {
      //"UNDO" LIKE - similar to "switch" operation - if ON, OFF & if OFF, ON to run codes depending on the current conditions
      //checks if the current state is "checked", which is the default OR set after a like/dislike is clicked

      //IF this.state.likes IS USED, THEN "likes"/"dislikes" VALUES WON'T RESET PROPERLY AFTER onDislike - SET THE VALUE MANUALLY.
      const bodyReq = {
        likes: "likeUndo",
        id: e.target.id,
      };

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
        stateCopy.comments[commentInd].likeSym = ""; //set like symbol value for the if conditions in the render() comments.map()
        stateCopy.comments[commentInd].likesCheck = false;
        this.setState(stateCopy);

        ///DO NOT USE this.state.likes!!! THIS IS A UNIVERSAL SETTER (CHECKES IF A LIKE IS ACTIVE) & AFFECTS OTHER COMMENTS' LIKES/DISLIKES TOO - MADE IT MORE COMMENT SPECIFIC
        // this.setState({
        //   likes: "", //resets this.state.likes for it to allow like to increment (the ELSE IF statement code) when like is clicked again.
        // });
      } catch (err) {
        console.log(err.message);
      }
    } else if (this.state.comments[commentInd].likesCheck === false) {
      //ACTIVATE LIKE
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
        stateCopy.comments[commentInd].likeSym = "active";
        stateCopy.comments[commentInd].likesCheck = true;
        this.setState(stateCopy);

        // this.setState({
        //   likes: "checked", //resets this.state.likes for it to undo when like is clicked again - executes the IF statement code.
        // });
      } catch (err) {
        console.log(err.message);
      }
    }
  }

  //*DISLIKE*//
  async onDislike(e) {
    e.preventDefault();

    const commentTarget = this.state.comments.find(
      (comment) => comment._id == e.target.id
    );
    const commentInd = this.state.comments.indexOf(commentTarget);

    if (this.state.comments[commentInd].dislikesCheck === true) {
      //"UNDO" DISLIKE

      const bodyReq = {
        likes: "dislikeUndo",
        id: e.target.id,
      };
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
        stateCopy.comments[commentInd].dislikeSym = "";
        stateCopy.comments[commentInd].dislikesCheck = false;
        this.setState(stateCopy);

        // this.setState({
        //   likes: "",
        // });
      } catch (err) {
        console.log(err.message);
      }
    } else if (this.state.comments[commentInd].dislikesCheck === false) {
      //ACTIVATE DISLIKE

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
        stateCopy.comments[commentInd].dislikeSym = "active";
        stateCopy.comments[commentInd].dislikesCheck = true;
        this.setState(stateCopy);

        // this.setState({
        //   likes: "checked",
        // });
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
    let like;
    let dislike;

    /// UNSORTED COMMENTS ///
    const listComments = this.state.comments.map((comment) => {
      if (comment.likeSym === "") {
        like = (
          <img
            id={comment._id}
            src="https://img.icons8.com/material-outlined/24/000000/facebook-like.png"
          />
        );
      } else if (comment.likeSym === "active") {
        like = (
          <img
            id={comment._id}
            src="https://img.icons8.com/material-rounded/24/000000/facebook-like.png"
          />
        );
      }
      if (comment.dislikeSym === "") {
        dislike = (
          <img
            id={comment._id}
            src="https://img.icons8.com/material-outlined/24/000000/thumbs-down.png"
          />
        );
      } else if (comment.dislikeSym === "active") {
        dislike = (
          <img
            id={comment._id}
            src="https://img.icons8.com/material-rounded/24/000000/thumbs-down.png"
          />
        );
      }

      return (
        <div>
          <p>{comment.message}</p>
          <div className="commentFooter">
            <p style={{ color: "cyan", fontSize: "10px", marginTop: "15px" }}>
              {comment.author} {comment.date}
            </p>
            <div
              id={comment._id}
              onClick={this.onLike}
              style={{ marginLeft: "10px" }}
            >
              {like} {comment.likes}
            </div>
            <div
              id={comment._id}
              onClick={this.onDislike}
              style={{ marginLeft: "10px" }}
            >
              {dislike} {comment.dislikes}
            </div>
            <button
              className="deleteComment"
              id={comment._id}
              name={comment.author}
              onClick={this.commentDelete}
            >
              Delete
            </button>
          </div>
        </div>
      );
    });

    /// SORTED COMMENTS ///
    const newStateCopy = [].concat(this.state.comments);
    const sortedComments = newStateCopy
      .sort((commentCur, commentNext) => {
        if (commentCur.likes > commentNext.likes) {
          return -1;
        } else if (commentCur.likes < commentNext.likes) {
          return 1;
        } else {
          return 0;
        }
      })
      .map((comment) => {
        if (comment.likeSym === "") {
          like = (
            <img
              id={comment._id}
              src="https://img.icons8.com/material-outlined/24/000000/facebook-like.png"
            />
          );
        } else if (comment.likeSym === "active") {
          like = (
            <img
              id={comment._id}
              src="https://img.icons8.com/material-rounded/24/000000/facebook-like.png"
            />
          );
        }
        if (comment.dislikeSym === "") {
          dislike = (
            <img
              id={comment._id}
              src="https://img.icons8.com/material-outlined/24/000000/thumbs-down.png"
            />
          );
        } else if (comment.dislikeSym === "active") {
          dislike = (
            <img
              id={comment._id}
              src="https://img.icons8.com/material-rounded/24/000000/thumbs-down.png"
            />
          );
        }

        return (
          <div>
            <p>{comment.message}</p>
            <div className="commentFooter">
              <p style={{ color: "cyan", fontSize: "10px", marginTop: "15px" }}>
                {comment.author} {comment.date}
              </p>
              <div
                id={comment._id}
                onClick={this.onLike}
                style={{ marginLeft: "10px" }}
              >
                {like} {comment.likes}
              </div>
              <div
                id={comment._id}
                onClick={this.onDislike}
                style={{ marginLeft: "10px" }}
              >
                {dislike} {comment.dislikes}
              </div>
              <button
                className="deleteComment"
                id={comment._id}
                name={comment.author}
                onClick={this.commentDelete}
              >
                Delete
              </button>
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
            <button
              class="button"
              type="primary"
              style={{ marginLeft: "90px" }}
            >
              Submit
            </button>
          </form>
        </div>
        <hr style={{ width: "70%" }}></hr>
        <button class="sortButton" onClick={this.sortComments}>
          Sort by Likes
        </button>
        <div
          className="comments"
          style={{ display: !this.state.commentSort ? "block" : "none" }}
        >
          {listComments}
        </div>
        <div
          className="commentsSorted"
          style={{ display: this.state.commentSort ? "block" : "none" }}
        >
          {sortedComments}
        </div>
      </Styles>
    );
  }
}

export default Comments;
