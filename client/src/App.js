import React, { Fragment } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';

import Post from './components/Post';
import Header from './components/Header';
import SideCard from './components/SideCard';
import FileDrop from './components/Filedrop';
import Datatable from './components/Datatable';
import TablePagination from './components/TablePagination';

/*
const App = () => (
	<Fragment>
		<Header />
		<main className="my-5 py-5">
			<Container className="px-0">
				<Row noGutters className="pt-2 pt-md-5 w-100 px-4 px-xl-0 position-relative">
					<Col xs={{ order: 2 }} md={{ size: 0, order: 1 }} tag="aside" className="pb-5 mb-5 pb-md-0 mb-md-0 mx-auto mx-md-0">
						<FileDrop />
					</Col>
					<Col xs={{ order: 1 }} md={{ size: 12, offset: 1 }} tag="section" className="py-5 mb-5 py-md-0 mb-md-0">
						<TablePagination />
					</Col>
				</Row>
			</Container>
		</main>
	</Fragment>
);
*/


const App = () => (
	<Fragment>
		<Header />
		<main className="my-5 py-5">
			<Container className="px-0">
				<Row noGutters className="pt-2 pt-md-5 w-100 px-4 px-xl-0 position-relative">
					<Col xs={{ order: 1 }} md={{ size: 12, offset: 1 }} tag="section" className="py-5 mb-5 py-md-0 mb-md-0">
						<TablePagination />
					</Col>
				</Row>
			</Container>
		</main>
	</Fragment>
);


export default App;
