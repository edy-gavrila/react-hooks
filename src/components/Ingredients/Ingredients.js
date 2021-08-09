import React, { useCallback, useReducer, useMemo, useEffect } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";
import Search from "./Search";
import useHttp from "../../hooks/http-hook";

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case "SET":
      return action.ingredients;
    case "ADD":
      return [...currentIngredients, action.ingredient];
    case "DELETE":
      return currentIngredients.filter(
        (ingredient) => ingredient.id !== action.id
      );
    case "CLEAR":
      return { loading: false, error: null };
    default:
      throw new Error("Should not get there!");
  }
};

const Ingredients = () => {
  const [ingredientList, dispatch] = useReducer(ingredientReducer, []);
  const { isLoading, data, error, sendRequest, clearError, reqExtra } =
    useHttp();

  //const [ingredientList, setIngredientList] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  useEffect(() => {
    if (reqExtra) {
      dispatch({ type: "DELETE", id: reqExtra });
    } else {
      dispatch({
        type: "ADD",
        ingredient: { id: data.className, ...reqExtra },
      });
    }
  }, [data, reqExtra]);

  const addIngredientHandler = useCallback(
    (ingredient) => {
      sendRequest(
        "https://react-hooks-update-94007-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json",
        "POST",
        JSON.stringify(ingredient)
      );
    },
    [sendRequest]
  );

  const loadIngredientsHandler = useCallback((ingredients) => {
    dispatch({ type: "SET", ingredients: ingredients });
  }, []);

  const removeIngredientHandler = useCallback(
    (id) => {
      const url = `https://react-hooks-update-94007-default-rtdb.europe-west1.firebasedatabase.app/ingredients/${id}.json`;

      sendRequest(url, "DELETE", null, id);
    },
    [sendRequest]
  );

  const ingredientListComponent = useMemo(() => {
    return (
      <IngredientList
        ingredients={ingredientList}
        onRemoveItem={removeIngredientHandler}
      />
    );
  }, [ingredientList, removeIngredientHandler]);

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={isLoading}
      />

      <section>
        <Search onLoadIngredients={loadIngredientsHandler} />
      </section>
      {ingredientListComponent}
    </div>
  );
};

export default Ingredients;
