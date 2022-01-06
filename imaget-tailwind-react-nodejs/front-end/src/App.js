import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Join from "./components/pages/JoinPage";
import Login from "./components/pages/LoginPage";
import MainPage from "./components/pages/MainPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/join" element={<Join />}></Route>
        <Route path="*" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
