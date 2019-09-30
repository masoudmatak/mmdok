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

  hide = () => {
    this.setState({
      modal: !this.state.modal
    });
  }
//        <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>


  getTableContent(data){
    const arr = [];
    for (var property in data) {
      arr.push(<tr><td style={{textAlign: "right"}}>{property}:</td><td style={{textAlign: "left"}}>{data[property]}</td></tr>);
    }
    return arr.map((row, index) => {
      return row
    })
  }


  getMetata(data){
    return <table>
      {this.getTableContent(data)}
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
            <Button color="primary" onClick={this.hide}>Visa dokument</Button>{' '}
            <Button color="secondary" onClick={this.hide}>Stäng</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}


export default MyModal;