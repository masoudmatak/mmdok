import React, { Component, Fragment } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import Datatable from './Datatable';

export default class TablePagination extends Component {

  constructor() {

    super();

    this.metadatax = [
      { Name: 'Nagnus', Age: 55, Location: 'Bromma' },
      { Name: 'Masoud', Age: 59, Location: 'Södermalm' }
    ]

    this.metadata = [
      { 'Name': 'Magnus', 'Age': 55, 'Location': 'Bromma' },
      { 'Name': 'Masoud', 'Age': 59, 'Location': 'Södermalm' },
      { 'Name': 'Stina', 'Age': 30, 'Location': 'Kista' },
      { 'Name': 'Olle', 'Age': 87, 'Location': 'Älvsjö' },
      { 'Name': 'Ulla', 'Age': 28, 'Location': 'Kungsholmen' },
      { 'Name': 'Magnus2', 'Age': 45, 'Location': 'Bromma' },
      { 'Name': 'Masoud2', 'Age': 49, 'Location': 'Södermalm' },
      { 'Name': 'Stina2', 'Age': 20, 'Location': 'Kista' },
      { 'Name': 'Olle2', 'Age': 77, 'Location': 'Älvsjö' },
      { 'Name': 'Ulla2', 'Age': 18, 'Location': 'Kungsholmen' },
      { 'Name': 'Magnus3', 'Age': 35, 'Location': 'Bromma' },
      { 'Name': 'Masoud3', 'Age': 39, 'Location': 'Södermalm' },
      { 'Name': 'Stina3', 'Age': 10, 'Location': 'Kista' },
      { 'Name': 'Olle3', 'Age': 67, 'Location': 'Älvsjö' },
      { 'Name': 'Ulla3', 'Age': 18, 'Location': 'Kungsholmen' },
      { 'Name': 'Magnus4', 'Age': 25, 'Location': 'Bromma' },
      { 'Name': 'Masoud4', 'Age': 29, 'Location': 'Södermalm' },
      { 'Name': 'Stina4', 'Age': 5, 'Location': 'Kista' },
      { 'Name': 'Olle4', 'Age': 57, 'Location': 'Älvsjö' },
      { 'Name': 'Ulla4', 'Age': 8, 'Location': 'Kungsholmen' },
      { 'Name': 'Ulla5', 'Age': 7, 'Location': 'Kungsholmen' }
    ];

    this.state = {
      currentPage: 0,
      metadata: this.metadata
    };

    this.pageSize = 8;
    this.pagesCount = Math.ceil(this.metadata.length / this.pageSize);

  }

  handleClick = (e, index) => {
    e.preventDefault();
    this.setState({
      currentPage: index
    });
  }

  getCurrentPage = () => {
    return this.metadata.slice(
      this.state.currentPage * this.pageSize,
      (this.state.currentPage + 1) * this.pageSize)  
  }

  sortByColumn = (column) => {
    this.metadata = [...this.state.metadata];
    this.metadata.sort(sortFunction);
    return this.getCurrentPage();

    function sortFunction(a, b) {
      a = a[column];
      b = b[column];
      return isNaN(a - b) ? (a === b) ? 0 : (a < b) ? -1 : 1 : a - b;
    }
  }

  reset = () => {
    this.setState({ currentPage: 0, metadata: this.metadata });
  }

  render = () => {
    const currentPage = this.state.currentPage;

    return (
      <Fragment>

        <Datatable
          data={this.state.metadata.slice(
            currentPage * this.pageSize,
            (currentPage + 1) * this.pageSize)
          }
          sort={this.sortByColumn}
          reset={this.reset}
        />

        <div className="pagination-wrapper">
          <Pagination>

            <PaginationItem disabled={currentPage <= 0}>
              <PaginationLink
                onClick={e => this.handleClick(e, currentPage - 1)}
                previous
                href="#"
              />
            </PaginationItem>

            {[...Array(this.pagesCount)].map((page, i) =>
              <PaginationItem active={i === currentPage} key={i}>
                <PaginationLink onClick={e => this.handleClick(e, i)} href="#">
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem disabled={currentPage >= this.pagesCount - 1}>
              <PaginationLink
                onClick={e => this.handleClick(e, currentPage + 1)}
                next
                href="#"
              />
            </PaginationItem>

          </Pagination>
        </div>

      </Fragment>
    );
  }
}


