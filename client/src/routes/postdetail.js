import React from "react";
import styled from "styled-components";

const Styles = styled.div``;

class PostDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {
        post: {
          title: "",
          author: "",
          summary: "",
          date: "",
          message: "",
        },
      },
    };
    this.fetchPostDetail = this.fetchPostDetail.bind(this);
  }

  componentDidMount() {
    this.fetchPostDetail();
  }

  async fetchPostDetail() {
    const settings = {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Alow-Credentials": true,
      },
    };

    try {
      let postR = await fetch(`/posts/${this.props.post._id}`, settings);
      let postRes = await postR.json();
      this.setState({
        post: postRes,
      });
    } catch (err) {
      console.log(err.message);
    }
  }

  render() {
    const postEl = this.state.post.post;
    return (
      <Styles>
        <div>
          <h1>{postEl.title}</h1>
        </div>
      </Styles>
    );
  }
}

export default PostDetail;
