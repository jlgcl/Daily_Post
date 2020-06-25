import React from "react";
import styled from "styled-components";

const Styles = styled.div`
  .button {
    margin-top: 20px;
    margin-left: 300px;
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
`;

class DeletePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [
        {
          uid: "",
        },
      ],
    };

    this.handleDelete = this.handleDelete.bind(this);
  }

  async handleDelete() {
    const setting = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods":
          "GET, POST, OPTIONS, PUT, PATCH, DELETE",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      },
    };
    try {
      let deleteReq = await fetch(`/${this.props.post._id}/delete`, setting);
      window.location.href = "/";
    } catch (err) {
      console.log(err.message);
    }
  }

  render() {
    return (
      <Styles>
        <div>
          <button className="button" type="primary" onClick={this.handleDelete}>
            Delete Post
          </button>
        </div>
      </Styles>
    );
  }
}

export default DeletePost;
