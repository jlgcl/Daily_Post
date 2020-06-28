import React from "react";
import styled from "styled-components";

const Styles = styled.div`
  .title {
    margin-left: 5%;
    margin-top: 5%;
  }
  .form-container {
    margin-left: 5%;
    margin-top: 50px;
  }
  .button {
    margin-top: 40px;
    margin-bottom: 20px;
    margin-left: 45%;
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

  textarea {
    width: 500px;
    height: 200px;
  }
`;

export const Contact = () => (
  <Styles>
    <div>
      <div className="title">
        <h1>Contact Us</h1>
      </div>
      <form className="form-container">
        <label for="email">Email:</label>
        <br></br>
        <input
          type="email"
          name="email"
          placeholder="enter your email"
          required
        ></input>
        <br></br>
        <br></br>
        <label for="name">Your name:</label>
        <br></br>
        <input
          type="text"
          name="name"
          placeholder="enter your name"
          required
        ></input>
        <br></br>
        <br></br>
        <label for="message">Enter your Message:</label>
        <br></br>
        <textarea
          name="email"
          placeholder="enter your message"
          required
        ></textarea>
        <br></br>
        <button className="button">Submit</button>
      </form>
    </div>
  </Styles>
);

export default Contact;
