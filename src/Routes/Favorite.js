import { Context } from "../Context";
import { users } from "../base";
import React, { useContext, useEffect, useRef } from "react";
import FavoriteImg from "../components/FavoriteImg";
import gsap from "gsap";
import { colors } from "../components/Cards";
import { closeInfo, clickinfo } from "../helper";

export default function Favorite() {
  const ref = useRef();
  let q = gsap.utils.selector(ref);
  const { deleteItem, userData, setUserData } = useContext(Context);
  const favorties = userData?.favorite;
  //   const test = favorties && favorties.map(({ label }, i) => label);

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

  const handleClick = (i) => {
    deleteItem(i);
  };
  return (
    <div className="main">
      <div className="main__wrap">
        <div className="search">
          <div>
            <form className="search__form">
              <input type="text" name="search" />
              <button type="submit">&#9906;</button>
            </form>
          </div>
        </div>
        <div className="cards__wrap">
          {!favorties ? (
            <h1>You don't have a favorite</h1>
          ) : (
            <>
              <h1>My favorite</h1>
              <div ref={ref} className="cards">
                {favorties.map(
                  (
                    { uri, label, ingredients, ingredientLines, healthLabels },
                    i
                  ) => (
                    <div key={i} className="card">
                      <h3>{label}</h3>
                      <FavoriteImg
                        recipeId={uri.substring(uri.lastIndexOf("recipe_") + 7)}
                      />
                      <div className="ingre">
                        <p>ingredients</p>
                        <div className="ingre__wrap">
                          {ingredients.map(({ food, quantity }, i) => (
                            <span key={i}>
                              {quantity === 0
                                ? null
                                : `${food} - ${
                                    quantity % 1 !== 0
                                      ? quantity.toFixed(1)
                                      : quantity
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
                            {ingredientLines.map((line, i) => (
                              <li key={i}>{line}</li>
                            ))}
                          </ul>
                        </div>
                        <ul className="health">
                          {healthLabels.slice(0, 4).map((label, i) => (
                            <li key={i} style={{ backgroundColor: colors[i] }}>
                              {label}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="button">
                        <div onClick={() => handleClick(i)}>
                          Delete favorite
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
                  )
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
