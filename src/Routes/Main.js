import "./Main.scss";
import { getCocktail, searchDrink } from "../api";
import { useQuery } from "react-query";
import Cards from "../components/Cards";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";

export default function Main() {
  const [search, setSearch] = useState();
  const [at, setAt] = useState(false);
  const { data: cocktail, isLoading: cocktailLoading } = useQuery("cocktail", getCocktail, {
    enabled: !!at,
  });
  const { data: searchDrinks, refetch, isLoading: searchLoading } = useQuery(
    ["searchDrink", search],
    () => searchDrink(search),
    {
      enabled: !!search,
    }
  );
  useEffect(() => {
    if (window.location.pathname === "/main") {
      setAt(true);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearch(event.target.search.value);
  };

  return (
    <div className="main">
      <div className="main__wrap">
        <div className="search">
          <div>
            <form className="search__form" onSubmit={handleSubmit}>
              <input type="text" name="search" />
              <button type="submit">&#9906;</button>
            </form>
          </div>
        </div>
        <div className="cards__wrap">
          {cocktailLoading ? (
            <Loading />
          ) : (
            <>
              <h1>
                {search ? search : "Today's recommended"}
                {search ? (
                  <span
                    onClick={() => {
                      refetch();
                    }}
                    className="refetch"
                  >
                    &#10226;
                  </span>
                ) : (
                  ""
                )}
              </h1>
              {searchDrinks && search ? (
                <Cards drink={searchDrinks.hits} loading={searchLoading}/>
              ) : cocktail && window.location.pathname === "/main" ? (
                <Cards drink={cocktail.hits.slice(0, 4)} loading={cocktailLoading}/>
              ) : (
                <Loading />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
