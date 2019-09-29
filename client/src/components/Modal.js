import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';

class MyModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      size: 'modal-xl'
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
//        <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>

  render() {
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} >
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
             Metadata1 : Värde1 <br/>
             Metadata1 : Värde1 <br/>
             Metadata1 : Värde1
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