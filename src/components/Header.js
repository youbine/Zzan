import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";

export default function Header() {
  const navigate = useNavigate();

  const showFavorite = () => {
    if (window.location.pathname === "/main") {
      navigate("/favorite");
    } else {
      navigate("/main");
    }
  };
  return (
    <nav>
      <Link className="link" to="/">
        <div> </div>
      </Link>

      {window.location.pathname === "/" ? (
        ""
      ) : (
        <div className="fav" onClick={showFavorite}>
          {window.location.pathname === "/favorite"
            ? "Close Favorite"
            : "My Favorite"}
        </div>
      )}
    </nav>
  );
}
