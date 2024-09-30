import { Routes, Route } from "react-router-dom";
import "./App.css";

import { PrivateRoute } from "./components/index.component.js";

import {
  LoginPage,
  SignupPage,
  HomePage,
  BoardPage,
} from "./pages/index.Pages.js";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PrivateRoute children={<HomePage />} />} />
        <Route path="/board/" element={<BoardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </div>
  );
}

export default App;
