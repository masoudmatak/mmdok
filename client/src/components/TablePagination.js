import React, { Component, Fragment } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import axios from 'axios';
import Datatable from './Datatable';

export default class TablePagination extends Component {

  constructor() {

    super();

    const testdata = [
      { 'Name': 'Magnus', 'Age': 55, 'Location': 'Bromma' },
      { 'Location': 'Södermalm', 'Name': 'Masoud', 'Age': 59 },
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

    const testdata2 = [ 
      { 
         "title":"AAAATTTTTTTTTTTTTTTTT",
         "description":"xxx",
         "publishedDate":"xxx",
         "imageUrl":"https://storage.googleapis.com/mmdok1338bucket/1569013253319File0001.PDF",
         "author":"gggg",
         "id":"5678164130922496"
      },
      { 
         "publishedDate":"2019-09-09",
         "imageUrl":"https://storage.googleapis.com/mmdok1338bucket/1568641781832mysql-tutorial-excerpt-5.5-en.pdf",
         "author":"K-111111111",
         "title":"FF-11111111111",
         "description":"197805010101",
         "id":"5630121163620352"
      },
      { 
         "title":"FF-719100111",
         "description":"detta är en test som handlar alla funktione i systemet detta är en test som handlar alla funktione i systemet detta är en test som handlar alla funktione i systemet",
         "publishedDate":"2019-09-08",
         "imageUrl":"https://storage.googleapis.com/mmdok1338bucket/1569260783037create-framework-project-zf1.pdf",
         "author":"KUND-188198111",
         "id":"5641497726681088"
      },
      { 
         "title":"FF-771819111",
         "description":"198701153090",
         "publishedDate":"2019-09-14",
         "imageUrl":"https://storage.googleapis.com/mmdok1338bucket/1569260416657configure-vhosts.pdf",
         "author":"CN-77181907",
         "id":"5669869676658688"
      },
      { 
         "description":"!99010167899",
         "publishedDate":"2019-00-15",
         "imageUrl":"https://storage.googleapis.com/mmdok1338bucket/1568492278010backup-restore-mysql.pdf",
         "author":"K-91901819",
         "title":"FF-78199011",
         "id":"5667370274127872"
      },
      { 
         "title":"FF-MAGGGGGGGGGGGGG",
         "description":"200001010101",
         "publishedDate":"2019-09-09",
         "imageUrl":"https://storage.googleapis.com/mmdok1338bucket/1568641838863mysql-tutorial-excerpt-5.5-en.pdf",
         "author":"K-111111111",
         "id":"5676073085829120"
      },
      { 
         "title":"FF99999999999",
         "description":"200001010101",
         "publishedDate":"2019-09-09",
         "imageUrl":"zzz",
         "author":"K888888888888888",
         "id":"5672749318012928"
      },
      { 
         "publishedDate":"2019-09-08",
         "imageUrl":"https://storage.googleapis.com/mmdok1338bucket/1569260340080reset-mysql-password.pdf",
         "author":"Mia Persson",
         "title":"Gallras snart",
         "description":"detta är en test som handlar alla funktione i systemet detta är en test som handlar alla funktione i systemet detta är en test som handlar alla funktione i systemet",
         "id":"5643172898144256"
      },
      { 
         "publishedDate":"2019-09-09",
         "imageUrl":"https://storage.googleapis.com/mmdok1338bucket/1569260736659deploy-git-app.pdf",
         "author":"Magnus Nillson",
         "title":"Inkommande2",
         "description":"testar för att se om det funkar med nodjs technologi",
         "id":"5702167830724608"
      },
      { 
         "description":"195905123090",
         "publishedDate":"2009-01-01",
         "imageUrl":"https://storage.googleapis.com/mmdok1338bucket/1568492208373requestProcess.pdf",
         "author":"K-771898191",
         "title":"JANNNNN",
         "id":"5652161459388416"
      }
   ]

    this.state = {
      currentPageNo: 0,
      metadata: testdata2
    };

    this.pageSize = 50;
    this.pagesCount = Math.ceil(this.state.metadata.length / this.pageSize)
  }

  componentDidMount() {
    axios.get('http://jsonplaceholder.typicode.com/todos')
    .then(response => { this.setState({ metadata: response.data }); this.pagesCount = Math.ceil(this.state.metadata.length / this.pageSize) } )
      .catch(error => { console.log(error.message); })
  }

  handleClick = (e, index) => {
    e.preventDefault();
    this.setState({ currentPageNo: index });
  }

  currentPage = () => {
    return this.state.metadata.slice(
      this.state.currentPageNo * this.pageSize,
      (this.state.currentPageNo + 1) * this.pageSize)
  }

  sort = (column, order) => {
    let arr = [...this.state.metadata];
    arr.sort(sortFunction);
    this.setState({ currentPageNo: 0, metadata: arr });

    function sortFunction(a, b) {
      a = a[column];
      b = b[column];
      let cmp = isNaN(a - b) ? (a === b) ? 0 : (a < b) ? -1 : 1 : a - b;
      return order ? cmp : cmp * -1;
    }
  }

  data = () => {
    return this.getCurrentPage();
  }

  render = () => {
    const currentPageNo = this.state.currentPageNo;
    return (
      <Fragment>

        <Datatable
          data={this.currentPage}
          sort={this.sort}
        />

        <div className="pagination-wrapper">
          <Pagination>

            <PaginationItem disabled={currentPageNo <= 0}>
              <PaginationLink
                onClick={e => this.handleClick(e, currentPageNo - 1)}
                previous
                href="#"
              />
            </PaginationItem>

            {[...Array(this.pagesCount)].map((page, i) =>
              <PaginationItem active={i === currentPageNo} key={i}>
                <PaginationLink onClick={e => this.handleClick(e, i)} href="#">
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem disabled={currentPageNo >= this.pagesCount - 1}>
              <PaginationLink
                onClick={e => this.handleClick(e, currentPageNo + 1)}
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


