import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class SearchForm extends React.Component {

CLAIM_SEARCH = "Sakskador";
LIFE_SEARCH = "Livdokument";

constructor() {
    super();
    this.state = {
        searchType: this.CLAIM_SEARCH
    };
}

handleChange (v) {
    alert('handle change called' + v);
}

//{opened && <SomeElement />}
//https://alligator.io/react/fancy-forms-reactstrap/

  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="exampleSelect">Select</Label>
          <Input type="select" name="select" id="exampleSelect" onChange={(e) => {this.handleChange(e.target.value)}}>
            <option>{this.CLAIM_SEARCH}</option>
            <option>{this.LIFE_SEARCH}</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="claimNo">Skadenummer</Label>
          <Input type="text" name="claimNo" id="claimNo" placeholder="FF12345678" />
        </FormGroup>
        <FormGroup>
          <Label for="documentType">Dokumenttyp</Label>
          <Input type="select" name="select" id="selectInput" >
            <option>Typ1</option>
            <option>Typ2</option>
            <option>Typ3</option>
            <option>Typ4</option>
            <option>Typ5</option>
          </Input>
        </FormGroup>
        <Button>Sök</Button>
      </Form>
    );
  }
}