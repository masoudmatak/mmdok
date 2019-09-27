import React, { Fragment } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import Datatable from './Datatable';

export default class TablePagination extends React.Component {
  
  constructor() {
    
    super();

    this.metadata = [
        {'Name': 'Magnus', 'Age': 55, 'Location': 'Bromma'},
        {'Name': 'Masoud', 'Age': 59, 'Location': 'Södermalm'},
        {'Name': 'Stina', 'Age': 30, 'Location': 'Kista'},
        {'Name': 'Olle', 'Age': 87, 'Location': 'Älvsjö'},
        {'Name': 'Ulla', 'Age': 28, 'Location': 'Kungsholmen'},
        {'Name': 'Magnus2', 'Age': 45, 'Location': 'Bromma'},
        {'Name': 'Masoud2', 'Age': 49, 'Location': 'Södermalm'},
        {'Name': 'Stina2', 'Age': 20, 'Location': 'Kista'},
        {'Name': 'Olle2', 'Age': 77, 'Location': 'Älvsjö'},
        {'Name': 'Ulla2', 'Age': 18, 'Location': 'Kungsholmen'},
        {'Name': 'Magnus3', 'Age': 35, 'Location': 'Bromma'},
        {'Name': 'Masoud3', 'Age': 39, 'Location': 'Södermalm'},
        {'Name': 'Stina3', 'Age': 10, 'Location': 'Kista'},
        {'Name': 'Olle3', 'Age': 67, 'Location': 'Älvsjö'},
        {'Name': 'Ulla3', 'Age': 18, 'Location': 'Kungsholmen'},
        {'Name': 'Magnus4', 'Age': 25, 'Location': 'Bromma'},
        {'Name': 'Masoud4', 'Age': 29, 'Location': 'Södermalm'},
        {'Name': 'Stina4', 'Age': 0, 'Location': 'Kista'},
        {'Name': 'Olle4', 'Age': 57, 'Location': 'Älvsjö'},
        {'Name': 'Ulla4', 'Age': 8, 'Location': 'Kungsholmen'},
        {'Name': 'Ulla5', 'Age': 7, 'Location': 'Kungsholmen'}
    ]

    this.pageSize = 5;
    this.pagesCount = Math.ceil(this.metadata.length / this.pageSize);

    this.state = {
      currentPage: 0
    };
    
  }

  handleClick(e, index) {
    
    e.preventDefault();

    this.setState({
      currentPage: index
    });
    
  }

  render() {
0    
    const { currentPage } = this.state;

    return (
    
      <Fragment>
        <Datatable data={this.metadata.slice(currentPage * this.pageSize, (currentPage + 1) * this.pageSize)}/>     
        <div className="pagination-wrapper">
          
          <Pagination aria-label="Page navigation example">
            
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


