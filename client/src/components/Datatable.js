import React, { Fragment } from 'react';
import { Table } from 'reactstrap';

export default class DataTables extends React.Component {
  constructor(props) {
    super(props);
    this.data = this.props.data;
    //this.getHeader = this.getHeader.bind(this);
    //this.getRowsData = this.getRowsData.bind(this);
    //this.getKeys = this.getKeys.bind(this);
  }

  handleClick(e, index) {   
    e.preventDefault();
    let key = this.getKeys()[index]
    this.data = this.props.sort(this.getKeys()[index], this.data);
    this.props.reset();
  }

  getKeys = () => {
    return Object.keys(this.data[0]);
  }

  getHeader = () => {
    var keys = this.getKeys();
    return keys.map((key, index) => {
      return <th onClick={e => this.handleClick(e, index)} key={key}>
              {key.toUpperCase()}
              </th>
    })
  }

  getRowsData = () => {
    var items = this.data;
    var keys = this.getKeys();
    return items.map((row, index) => {
      return <tr key={index}><RenderRow key={index} data={row} keys={keys} /></tr>
    })
  }

  render() {
    return (
      <div>
        <Table striped>
          <thead>
            <tr>{this.getHeader()}</tr>
          </thead>
          <tbody>
            {this.getRowsData()}
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