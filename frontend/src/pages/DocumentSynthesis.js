import React, { Component } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import RightSidebar3 from '../components/RightSidebar3';
import AppContext from '../AppContext';

class DocumentSynthesis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessages: [],
      referenceInfo: {}, // Initialize referenceInfo as an empty array,
      response: '',
    };
  }

  static contextType = AppContext

  componentDidMount() {
    const endpoint = `get_project_info?pro_id=${this.context.project['pro_id']}`;
    const method = 'GET';
    const headers = {};
    const body = null;

    this.context.handleApiRequest(endpoint, method, headers, body)
    .then((responseData) => {
      this.setState({ 
        referenceInfo: responseData['data']['researchInfo']
      });
    })
    .catch((error) => {});
  }


  // Function to update research info in the state
  updateResponse = (txt) => {
    this.setState({ response: txt });
  }

  render() {
    const { referenceInfo } = this.state; // Get referenceInfo from the state

    return (
      <Container fluid>
        <Row style={{ maxHeight: '100vh' }}>
          <Col sm={7}>
            <Card style={{overflowY: 'auto', height: "80%", marginTop: '5px', width:"100%"}}>
              <Card.Body style={{ whiteSpace: 'pre-line', textAlign: 'justify', overflowY: 'auto'}}>
                {this.state.response}
              </Card.Body>
            </Card>
          </Col>
          <Col sm={5}>
            <RightSidebar3 referenceInfo={referenceInfo} updateResponse={this.updateResponse}/>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default DocumentSynthesis;
