import React, { useState } from "react";

import Card from "../UI/Card";
import "./IngredientForm.css";
import LoadingIndicator from "../UI/LoadingIndicator";

const IngredientForm = React.memo((props) => {
  const [ingredient, setIngredient] = useState({ title: "", amount: "" });

  const onChangeTitleHandler = (e) => {
    const title = e.target.value;
    setIngredient((prevState) => ({ ...prevState, title: title }));
  };
  const onChangeAmountHandler = (e) => {
    const amount = e.target.value;
    setIngredient((prevState) => ({ ...prevState, amount: amount }));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    //
    props.onAddIngredient({ ...ingredient });
    setIngredient({ title: "", amount: "" });
  };
console.log("RENDERING FORM...");
  return (
    <section className="ingredient-form">
      <Card>
        <form autoComplete="off" onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              id="title"
              value={ingredient.title}
              onChange={onChangeTitleHandler}
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              value={ingredient.amount}
              onChange={onChangeAmountHandler}
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {props.loading && <LoadingIndicator />}
          </div>
        </form>
        
      </Card>
    </section>
  );
});

export default IngredientForm;
