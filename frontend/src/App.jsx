import { Routes, Route } from "react-router-dom";
import "./App.css";

import HomePage from "./pages/home/HomePage.jsx";
import BoardPage from "./pages/board/BoardPage.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/board/" element={<BoardPage />} />
      </Routes>
    </div>
  );
}

export default App;
