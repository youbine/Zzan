import { useQuery } from "react-query";
import { recipeDetail } from "../api";
import Loading from "./Loading";

export default function FavoriteImg(recipeId) {
  const { data: detailData, status } = useQuery(
    ["detail", recipeId],
    () => recipeDetail(recipeId.recipeId),
    {
      enabled: !!recipeId,
    }
  );

  return (
    <>
      {status === "loading" ? (
        <Loading />
      ) : (
        <div
          className="img"
          style={{ backgroundImage: `url(${detailData?.recipe.image})` }}
        ></div>
      )}
    </>
  );
}
