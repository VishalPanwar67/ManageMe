import { Routes, Route } from "react-router-dom";

import {
  PrivateRoute,
  Demo,
  ButtonHome,
} from "./components/index.component.js";

// import Demo from "./components/Demo.jsx";

import {
  LoginPage,
  SignupPage,
  HomePage,
  BoardPage,
  BoardDetails,
  ListDetails,
  CardDetails,
} from "./pages/index.Pages.js";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* test Routes */}
        <Route path="/test" element={<Demo />} />
        {/* Home Routes*/}
        <Route path={"/"} element={<PrivateRoute children={<HomePage />} />} />
        <Route
          path="/home"
          element={<PrivateRoute children={<HomePage />} />}
        />
        {/* Board Routes */}
        <Route
          path="/board"
          element={<PrivateRoute children={<BoardPage />} />}
        />
        <Route
          path="/board/:boardId"
          element={<PrivateRoute children={<BoardDetails />} />}
        />
        {/* <Route path="/board/board1" element={<BoardDetails />} /> */}
        {/* list Routes */}
        <Route
          path="/list/:boardId/:listId"
          element={<PrivateRoute children={<ListDetails />} />}
        />
        {/* card Routes*/}
        <Route
          path="/card/:listId/:cardId"
          element={<PrivateRoute children={<CardDetails />} />}
        />
        {/* Auth Routes*/}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </div>
  );
}

export default App;
