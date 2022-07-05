import React, { useContext, useEffect, useRef } from "react";
import { Context } from "../Context";
import { users } from "../base";
import Loading from "./Loading";
import gsap from "gsap";
import { closeInfo, clickinfo } from "../helper";
export const colors = ["#F8A4A4", "#7280FF", "#FFF069", "#88FFA2"];

export default function Cards({ drink, loading }) {
  const ref = useRef();
  let q = gsap.utils.selector(ref);
  const { updateItem, setUserData, deleteItem, userData } = useContext(Context);
  const labels = userData?.favorite?.map(({ label }) => label);

  useEffect(() => {
    const getData = async () => {
      users
        .doc(localStorage.getItem("id"))
        .get()
        .then((doc) => {
          if (doc.exists) {
            setUserData(doc.data());
          } else {
            return;
          }
        });
    };
    getData();
  });

  const handleClick = (recipe) => {
    labels && labels.indexOf(recipe.label) >= 0
      ? deleteItem(labels.indexOf(recipe.label))
      : updateItem(recipe);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div ref={ref} className="cards">
          {drink && drink.map(({ recipe }, i) => (
            <div className="card" key={i}>
              <h3>{recipe.label}</h3>
              <div
                className="img"
                style={{ backgroundImage: `url(${recipe.image})` }}
              ></div>
              <div className="ingre">
                <p>ingredients</p>
                <div className="ingre__wrap">
                  {recipe.ingredients.map(({ food, quantity }, i) => (
                    <span key={i}>
                      {quantity === 0
                        ? null
                        : `${food} - ${
                            quantity % 1 !== 0 ? quantity.toFixed(1) : quantity
                          }`}
                    </span>
                  ))}
                </div>
              </div>
              <div className="info">
                <h2>More info</h2>
                <span
                  className="close"
                  onClick={() => {
                    closeInfo(i, q);
                  }}
                >
                  &#10005;
                </span>
                <div className="detail">
                  <p>ingredients detail</p>
                  <ul>
                    {recipe.ingredientLines.map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                </div>
                <ul className="health">
                  {recipe.healthLabels.slice(0, 4).map((label, i) => (
                    <li key={i} style={{ backgroundColor: colors[i] }}>
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="button">
                <div onClick={() => handleClick(recipe)}>
                  {labels && labels.indexOf(recipe.label) >= 0
                    ? "Delete favorite"
                    : "Favorite"}
                </div>
                <div
                  onClick={() => {
                    clickinfo(i, q);
                  }}
                >
                  More info
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
