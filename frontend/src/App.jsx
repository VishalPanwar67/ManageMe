import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import PrivateRoute from "./components/PrivateRoute.jsx";

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
        {/* <Route path="/" element={"this is home"} /> */}
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/" element={<PrivateRoute children={<HomePage />} />} />
        <Route path="/board/" element={<BoardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </div>
  );
}

export default App;
