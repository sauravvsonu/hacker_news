import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./component/HomePage";
import SearchPage from "./component/SearchPage";
import AuthorPage from "./component/AuthorPage";
import CommentPage from "./component/CommentPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/search/:query" element={<SearchPage />} />
        <Route path="/author/:id" element={<AuthorPage />} />
        <Route path="/item/:id" element={<CommentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
