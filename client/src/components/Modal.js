import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';

class MyModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      size: 'modal-xl',
      body: ''
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle(data) {
    this.setState({
      modal: !this.state.modal,
      body: this.getMetata(data)
    });
  }
//        <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>

  getMetata(data){
    return <table>
      <tr><td>Metadata1:</td><td>Värde1</td></tr>
      <tr><td>Metadata2:</td><td>Värde2</td></tr>
      <tr><td>Metadata3:</td><td>Värde3</td></tr>
    </table>
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} >
          <ModalHeader toggle={this.toggle}>Dokumenttitel</ModalHeader>
          <ModalBody>
            {this.state.body}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Visa dokument</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Stäng</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}


export default MyModal;