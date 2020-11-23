import React from "react";
import { Button, Form, FormGroup } from "react-bootstrap";

function SearchForm({ searchTerm, handleChange, handleSubmit }) {

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup className="d-flex my-2">
        <Form.Control className="mx-2" name={searchTerm} value={searchTerm} onChange={handleChange} />
        <Button type="submit">Search</Button>
      </FormGroup>
    </Form>
  )
}

export default SearchForm;