import React, { useState, useEffect, useRef } from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo((props) => {
  const [enteredFilter, setEnteredFilter] = useState("");
  const enteredFilterRef = useRef();

  const filterInputChangedHandler = (e) => {
    setEnteredFilter(e.target.value);
  };

  const { onLoadIngredients } = props;

  useEffect(() => {
    const fetchTimer = setTimeout(() => {
      if (enteredFilter === enteredFilterRef.current.value) {
        const query =
          enteredFilter.length === 0
            ? ""
            : `?orderBy="title"&equalTo="${enteredFilter}"`;
        fetch(
          "https://react-hooks-update-94007-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json" +
            query
        )
          .then((response) => response.json())
          .then((responseData) => {
            const ingredients = [];

            for (const key in responseData) {
              ingredients.push({ ...responseData[key], id: key });
            }

            onLoadIngredients(ingredients);
          });
      }
    }, 500);
    return () => {
      clearTimeout(fetchTimer);
    };
  }, [enteredFilter, onLoadIngredients, enteredFilterRef]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            ref={enteredFilterRef}
            type="text"
            value={enteredFilter}
            onChange={filterInputChangedHandler}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
