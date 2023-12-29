import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import RightSidebar1 from '../components/RightSidebar1';
import ChatMessageList from '../components/ChatMessageList';
import ChatInput from '../components/ChatInput';
import AppContext from '../AppContext';

class ReferenceFullScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessages: [],
      referenceInfo: {}, // Initialize referenceInfo as an empty array
      referenceId: (new URLSearchParams(window.location.search)).get('reference_id', ''),
    };
  }

  static contextType = AppContext

  componentDidMount() {
    const {referenceId} = this.state;
    const pro_id = this.context.project['pro_id'];

    if (referenceId) {
      const endpoint = `get_reference_info?pro_id=${pro_id}&ref_id=${referenceId}`;
      const method = 'GET';
      const headers = {};
      const body = null;

      this.context.handleApiRequest(endpoint, method, headers, body)
      .then((responseData) => {
        const data = responseData['reference_info'];
        this.setState({
          referenceInfo: data
        })
      })
      .catch((error) => {});
    }
  }

  handleMessageSent = (message) => {
    this.setState((prevState) => ({
      chatMessages: [...prevState.chatMessages, message],
    }));
  }

  // Function to update research info in the state
  updatedocumentInfo = (newInfo) => {
    this.setState({ referenceInfo: newInfo });
  }

  render() {
    const { chatMessages, referenceInfo, referenceId } = this.state; // Get referenceInfo from the state
    const pdfUrl = `http://192.168.2.215:5000/public/static_reference/${referenceId}.pdf`;

    return (
      <Container fluid>
        <Row style={{ maxHeight: '100vh' }}>
          <Col sm={5} >
            <iframe
              src={pdfUrl}
              title="PDF Viewer"
              width="100%"
              height="100%"
              style={{ border: 'none' }}
            ></iframe>
          </Col>
          <Col sm={3}>
            <ChatMessageList isSave={false} messages={chatMessages} updatedocumentInfo={this.updatedocumentInfo} />
            <ChatInput endpoint={`send_qlty_message`} onMessageSent={this.handleMessageSent} className="sticky-bottom" />
          </Col>
          <Col sm={4}>
            <RightSidebar1 referenceInfo={referenceInfo} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ReferenceFullScreen;
