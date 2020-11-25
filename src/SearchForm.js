import React, { useEffect, useState } from "react";
import { Button, Card, Form, FormGroup, InputGroup } from "react-bootstrap";
import DrinkApi from "./api";
import "./SearchForm.css";

function SearchForm({ updateList }) {
  const initialData = {
    alcohol: "",
    mixer: "",
  }
  const [formData, setFormData] = useState(initialData);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    async function getIngredients() {
      const result = await DrinkApi.getIngredientList();

      setIngredients(result);
    }
    getIngredients();
  }, []);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(oldForm => ({ ...oldForm, [name]: value }));
  }

  async function handleCardClick(evt) {
    const card = evt.target;
    const value = card.innerText.replace("?", "");
    console.log(value);

    const result = await DrinkApi.getDrinksByIngredient({ alcohol: value });

    updateList(result);
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    console.log(formData);
    const result = await DrinkApi.getDrinksByIngredient(formData);

    updateList(result);
    setFormData(initialData);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup className="my-2">
        <Form.Label>What Alcohol Do You Have?</Form.Label>
        <div className="row justify-content-around">
          <Card className="SearchForm-Card col-5 my-1" onClick={handleCardClick}>
            <Card.Text>Gin?</Card.Text>
          </Card>
          <Card className="SearchForm-Card col-5 my-1" onClick={handleCardClick}>
            <Card.Text>Vodka?</Card.Text>
          </Card>
          <Card className="SearchForm-Card col-5 my-1" onClick={handleCardClick}>
            <Card.Text>Tequila?</Card.Text>
          </Card>
          <Card className="SearchForm-Card col-5 my-1">
            <Card.Text>Other?</Card.Text>
            <input type="text" list="ingredients" />
            <datalist id="ingredients">
              <option>...</option>
              {ingredients.map(i => (
                <option key={i.strIngredient1}>{i.strIngredient1}</option>
              ))}
            </datalist>
            {/* <InputGroup> */}
            {/* <Form.Control
                className="mx-2"
                name="alcohol"
                value={formData.alcohol}
                onChange={handleChange}
                placeholder="gin? vodka?" /> */}
            {/* <Button className="btn-sm" type="submit d-inline">Search</Button> */}
            {/* </InputGroup> */}
          </Card>
        </div>
      </FormGroup>
      <FormGroup>
        <Form.Label>Do You Have Any Mixers?</Form.Label>
        <div className="d-flex">
          <Form.Control
            className="mx-2"
            name="mixer"
            value={formData.mixer}
            onChange={handleChange}
            placeholder="lemon? ginger?" />
          <Button type="submit d-inline">Search</Button>
        </div>
      </FormGroup>
    </Form>
  )
}

export default SearchForm;