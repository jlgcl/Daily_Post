import React from "react";
import styled from "styled-components";
import Card from "react-bootstrap/Card";

const Styles = styled.div`
  .politics,
  .business,
  .economics,
  .technology {
    display: flex;
    flex-direction: row;
    flex: wrap;
    justify-content: space-evenly;
    margin-bottom: 30px;
  }
  .card {
    box-shadow: 10px 10px 22px -10px rgba(0, 0, 0, 0.75);
  }
`;

class HomeMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postsBus: [],
      postsPol: [],
      postsEcon: [],
      postsTech: [],
      postsEnt: [],
    };
  }

  //   async fetchPosts() {
  //     try {
  //       let setting = {
  //         method: "GET",
  //         mode: "cors",
  //         credentials: "same-origin",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       };
  //       let postBus = await fetch("http://localhost:8080/business", setting);
  //       let postBusRes = await post.json();

  //       this.setState({
  //         posts: postRes,
  //       });
  //     } catch (err) {
  //       this.setState({
  //         posts,
  //       });
  //     }
  //   }

  render() {
    return (
      <Styles>
        <div>
          <h3>Politics</h3> <hr></hr>
          <div className="politics">
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src="https://image.cnbcfm.com/api/v1/image/106240744-1573590258713politicaldebate.jpg?v=1573590321&w=1400&h=950"
              />
              <Card.Body>
                <Card.Title>Headline Placeholder</Card.Title>
                <Card.Text>Context placeholder</Card.Text>
              </Card.Body>
            </Card>
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src="https://image.cnbcfm.com/api/v1/image/106240744-1573590258713politicaldebate.jpg?v=1573590321&w=1400&h=950"
              />
              <Card.Body>
                <Card.Title>Headline Placeholder</Card.Title>
                <Card.Text>Context placeholder</Card.Text>
              </Card.Body>
            </Card>
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src="https://image.cnbcfm.com/api/v1/image/106240744-1573590258713politicaldebate.jpg?v=1573590321&w=1400&h=950"
              />
              <Card.Body>
                <Card.Title>Headline Placeholder</Card.Title>
                <Card.Text>Context placeholder</Card.Text>
              </Card.Body>
            </Card>
          </div>
          <h3>Business</h3> <hr></hr>
          <div className="business">
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src="https://www.marketplace.org/wp-content/uploads/2019/09/stockmarket.jpg?fit=2880%2C1621"
              />
              <Card.Body>
                <Card.Title>Headline Placeholder</Card.Title>
                <Card.Text>Context placeholder</Card.Text>
              </Card.Body>
            </Card>
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src="https://www.marketplace.org/wp-content/uploads/2019/09/stockmarket.jpg?fit=2880%2C1621"
              />
              <Card.Body>
                <Card.Title>Headline Placeholder</Card.Title>
                <Card.Text>Context placeholder</Card.Text>
              </Card.Body>
            </Card>
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src="https://www.marketplace.org/wp-content/uploads/2019/09/stockmarket.jpg?fit=2880%2C1621"
              />
              <Card.Body>
                <Card.Title>Headline Placeholder</Card.Title>
                <Card.Text>Context placeholder</Card.Text>
              </Card.Body>
            </Card>
          </div>
          <h3>Economics</h3> <hr></hr>
          <div className="economics">
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src="https://www.investopedia.com/thmb/jQgcQL_AElY_bBBS58d4wl6s5IA=/2119x1415/filters:fill(auto,1)/united-states-federal-reserve-building--washington-dc--usa-699686820-4fe8a5acea0b451b8998d683dfcd87db.jpg"
              />
              <Card.Body>
                <Card.Title>Headline Placeholder</Card.Title>
                <Card.Text>Context placeholder</Card.Text>
              </Card.Body>
            </Card>
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src="https://www.investopedia.com/thmb/jQgcQL_AElY_bBBS58d4wl6s5IA=/2119x1415/filters:fill(auto,1)/united-states-federal-reserve-building--washington-dc--usa-699686820-4fe8a5acea0b451b8998d683dfcd87db.jpg"
              />
              <Card.Body>
                <Card.Title>Headline Placeholder</Card.Title>
                <Card.Text>Context placeholder</Card.Text>
              </Card.Body>
            </Card>
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src="https://www.investopedia.com/thmb/jQgcQL_AElY_bBBS58d4wl6s5IA=/2119x1415/filters:fill(auto,1)/united-states-federal-reserve-building--washington-dc--usa-699686820-4fe8a5acea0b451b8998d683dfcd87db.jpg"
              />
              <Card.Body>
                <Card.Title>Headline Placeholder</Card.Title>
                <Card.Text>Context placeholder</Card.Text>
              </Card.Body>
            </Card>
          </div>
          <h3>Technology</h3> <hr></hr>
          <div className="technology">
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src="https://www.nextbigfuture.com/wp-content/uploads/2019/02/AIworld-730x430.jpg"
              />
              <Card.Body>
                <Card.Title>Headline Placeholder</Card.Title>
                <Card.Text>Context placeholder</Card.Text>
              </Card.Body>
            </Card>
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src="https://www.nextbigfuture.com/wp-content/uploads/2019/02/AIworld-730x430.jpg"
              />
              <Card.Body>
                <Card.Title>Headline Placeholder</Card.Title>
                <Card.Text>Context placeholder</Card.Text>
              </Card.Body>
            </Card>
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src="https://www.nextbigfuture.com/wp-content/uploads/2019/02/AIworld-730x430.jpg"
              />
              <Card.Body>
                <Card.Title>Headline Placeholder</Card.Title>
                <Card.Text>Context placeholder</Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      </Styles>
    );
  }
}

export default HomeMain;
