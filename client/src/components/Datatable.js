import React, { Component, Fragment } from 'react';
import { Table } from 'reactstrap';
import Modal from './Modal';

export default class DataTable extends Component {

  constructor(props) {
    super(props);
    this.data = this.props.data;
    this.sort = this.props.sort;
    this.reset = this.props.reset;
    this.sortOrder = Array(this.getKeys().length).fill(true);
  }

  handleClick = (e, index) => {   
    e.preventDefault();
    this.sort(this.getKeys()[index], this.sortOrder[index]);
    this.sortOrder[index] = !this.sortOrder[index];
  }

  handleRowClick = (rowIndex) => {  
    const o = this.data()[rowIndex];
    const metadata = {};
    for (var property in o) {
      if (!o.hasOwnProperty(property)) continue;
        metadata[property] = o[property];
    }
    this.refs.modal.toggle(metadata);
  }

  getKeys = () => {
    return Object.keys(this.data()[0]).filter((key) => key != 'imageUrl');
  }

  getHeader = () => {
    var keys = this.getKeys();
    return keys.map((key, index) => {
      return <th onClick={e => this.handleClick(e, index)} key={key}>
              {key.toUpperCase().substring(0,)}
              </th>
    })
  }

  getRows = () => {
    var items = this.data();
    var keys = this.getKeys();
    return items.map((row, index) => {
        return <tr key={index}><RenderRow key={index} row={index} data={row} keys={keys} callback={this.handleRowClick}/></tr>
    })
  }

  render = () => {  
    return (
      <Fragment>
      <div>
        <Table striped hover>
          <thead>
            <tr>{this.getHeader()}</tr>
          </thead>
          <tbody>
            {this.getRows()}
          </tbody>
        </Table>
      </div>
      <Modal buttonLabel = "Click me" ref='modal'/>
      </Fragment>
    );
  }
}

const tdStyle = {
  whiteSpace: 'normal',
  wordWrap: 'break-word'
};
const RenderRow = (props) => {
  return props.keys.map((key, index) => {
    return <td key={key} style={tdStyle} onClick={e => props.callback(props.row)}>{props.data[key]}</td>
    //return <td key={props.data[key]}>{props.data[key].substring(0,8)}</td>
  })
}