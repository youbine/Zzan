import "./App.scss";
import { Provider } from "./Context";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./Routes/Login";
import Header from "./components/Header";
import Main from "./Routes/Main";
import Favorite from "./Routes/Favorite";
function App() {
  return (
    <BrowserRouter>
      <Provider>
        <Header />
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/main" element={<Main />}></Route>
          <Route path="/favorite" element={<Favorite />}></Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
