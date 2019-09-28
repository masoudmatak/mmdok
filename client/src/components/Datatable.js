import React, { Component } from 'react';
import { Table } from 'reactstrap';

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
    //this.reset();
  }

  getKeys = () => {
    return Object.keys(this.data()[0]);
  }

  getHeader = () => {
    var keys = this.getKeys();
    return keys.map((key, index) => {
      return <th onClick={e => this.handleClick(e, index)} key={key}>
              {key.toUpperCase()}
              </th>
    })
  }

  getRows = () => {
    var items = this.data();
    var keys = this.getKeys();
    return items.map((row, index) => {
      return <tr key={index}><RenderRow key={index} data={row} keys={keys} /></tr>
    })
  }

  render = () => {
    
    return (
      <div>
        <Table striped>
          <thead>
            <tr>{this.getHeader()}</tr>
          </thead>
          <tbody>
            {this.getRows()}
          </tbody>
        </Table>
      </div>

    );
  }
}


const RenderRow = (props) => {
  return props.keys.map((key, index) => {
    return <td key={props.data[key]}>{props.data[key]}</td>
  })
}