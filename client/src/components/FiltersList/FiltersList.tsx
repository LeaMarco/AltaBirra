import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { QueryTypes, searchedPosts, setQuerySearch, setTitleSearch } from "../../actions";
import { RootState } from "../../reducers";
import Style from "./FiltersList.module.css";

export default function FiltersList() {
  const dispatch = useDispatch();
  const searchQuery: QueryTypes = useSelector((state: RootState) => state.postsSearchQuery);
  console.log(searchQuery);

  function handleChange({ target }) {
    let temp = target.value === "" ? undefined : target.name === "rating" ? target.value.length : target.value;
    dispatch(setQuerySearch({ [target.name]: temp }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(searchedPosts(searchQuery));
  }

  async function resetFilterValues() {
    let temp: QueryTypes = {};
    for (let prop in searchQuery) {
      temp[prop] = (prop === "title" || prop === "orderBy") ? searchQuery[prop] : undefined;
    }
    await dispatch(setQuerySearch(temp));
  }

  useEffect(() => {
    dispatch(searchedPosts(searchQuery));
  }, [searchQuery.genericType, searchQuery.specificType, searchQuery.rating, searchQuery.hasDryHop, searchQuery.hasShipping, searchQuery.hasDiscount])

  return (
    <div className={Style.container}>
      <h2> Filtros </h2>
      <form className={Style.subcontainer}>
        <div>
          <label> Tipo generico </label>
          <select
            value={searchQuery.genericType}
            name="genericType"
            onChange={(event) => handleChange(event)}
          >
            <option> </option>
            <option> Rubia </option>
            <option> Roja </option>
            <option> Negra </option>
          </select>
        </div>
        <div>
          <label> Tipo especifico </label>
          <select
            name="specificType"
            value={searchQuery.specificType}
            onChange={(event) => handleChange(event)}
          >
            <option> </option>
            <option> Amber </option>
            <option> Vino de cebada </option>
            <option> Ale belga </option>
            <option> Ale escocesa </option>
            <option> Duvel </option>
            <option> Porter </option>
            <option> Alt </option>
            <option> Kölsch </option>
            <option> Trappist </option>
            <option> Flanders negra </option>
            <option> Especial </option>
            <option> Cerveza de trigo </option>
            <option> Cerveza blanca </option>
            <option> Pilsner </option>
            <option> Dortmunder </option>
            <option> Viena </option>
            <option> Munich </option>
            <option> Bock </option>
            <option> Rauchbier </option>
            <option> Schwarzbier </option>
            <option> Gueze </option>
            <option> Faro </option>
            <option> Cerveza de fruta </option>
          </select>
        </div>
        <div>
          <label> Rating </label>
          <select
            name="rating"
            value={"⭐".repeat(searchQuery.rating || 0)}
            onChange={(event) => handleChange(event)}
          >
            <option> </option>
            <option> ⭐ </option>
            <option> ⭐⭐ </option>
            <option> ⭐⭐⭐ </option>
            <option> ⭐⭐⭐⭐ </option>
            <option> ⭐⭐⭐⭐⭐ </option>
          </select>
        </div>
        <div className={Style.inputDiv}>
          <label> Precio </label>
          <div>
            <label> Min: </label>
            <input
              className={Style.smallInput}
              name="minPrice"
              value={searchQuery.minPrice}
              onChange={(event) => handleChange(event)}
            />
            <label> Max: </label>
            <input
              className={Style.smallInput}
              name="maxPrice"
              value={searchQuery.maxPrice}
              onChange={(event) => handleChange(event)}
            />
          </div>
          {searchQuery.minPrice || searchQuery.maxPrice ? (
            <button onClick={(event) => handleSubmit(event)}> + </button>
          ) : null}
        </div>
        <div className={Style.inputDiv}>
          <label> IBU </label>
          <div>
            <label> Min: </label>
            <input
              className={Style.smallInput}
              name="minIbu"
              value={searchQuery.minIbu}
              onChange={(event) => handleChange(event)}
            />
            <label> Max: </label>
            <input
              className={Style.smallInput}
              name="maxIbu"
              value={searchQuery.maxIbu}
              onChange={(event) => handleChange(event)}
            />
          </div>
          {searchQuery.minIbu || searchQuery.maxIbu ? (
            <button onClick={(event) => handleSubmit(event)}> + </button>
          ) : null}
        </div>
        <div className={Style.inputDiv}>
          <label> ABV </label>
          <div>
            <label> Min: </label>
            <input
              className={Style.smallInput}
              name="minAbv"
              value={searchQuery.minAbv}
              onChange={(event) => handleChange(event)}
            />
            <label> Max: </label>
            <input
              className={Style.smallInput}
              name="maxAbv"
              value={searchQuery.maxAbv}
              onChange={(event) => handleChange(event)}
            />
          </div>
          {searchQuery.minAbv || searchQuery.maxAbv ? (
            <button onClick={(event) => handleSubmit(event)}> + </button>
          ) : null}
        </div>
        <div className={Style.inputDiv}>
          <label> OG </label>
          <div>
            <label> Min: </label>
            <input
              className={Style.smallInput}
              name="minOg"
              value={searchQuery.minOg}
              onChange={(event) => handleChange(event)}
            />
            <label> Max: </label>
            <input
              className={Style.smallInput}
              name="maxOg"
              value={searchQuery.maxOg}
              onChange={(event) => handleChange(event)}
            />
          </div>
          {searchQuery.minOg || searchQuery.maxOg ? (
            <button onClick={(event) => handleSubmit(event)}> + </button>
          ) : null}
        </div>
        <div className={Style.inputDiv}>
          <label> Calorias </label>
          <div>
            <label> Min: </label>
            <input
              className={Style.smallInput}
              name="minCalories"
              value={searchQuery.minCalories}
              onChange={(event) => handleChange(event)}
            />
            <label> Max: </label>
            <input
              className={Style.smallInput}
              name="maxCalories"
              value={searchQuery.maxCalories}
              onChange={(event) => handleChange(event)}
            />
          </div>
          {searchQuery.minCalories || searchQuery.maxCalories ? (
            <button onClick={(event) => handleSubmit(event)}> + </button>
          ) : null}
        </div>
        <div>
          <label> DRY HOP </label>
          <input
            type="checkbox"
            name="hasDryHop"
            onChange={(event) => dispatch(setQuerySearch({ hasDryHop: event.target.checked ? true : undefined }))
            }
          />
        </div>
        <div>
          <label> Con envio </label>
          <input
            type="checkbox"
            name="hasShipping"
            onChange={(event) => dispatch(setQuerySearch({ hasShipping: event.target.checked ? true : undefined }))
            }
          />
        </div>
        <div>          <label> Con descuento </label>
          <input
            type="checkbox"
            name="hasDiscount"
            onChange={(event) => dispatch(setQuerySearch({ hasDiscount: event.target.checked ? true : undefined }))}
          />
        </div>
        <input style={{ margin: "2vh auto", width: "5vw" }} type="reset" onClick={resetFilterValues} />
      </form>
    </div>
  );
}
