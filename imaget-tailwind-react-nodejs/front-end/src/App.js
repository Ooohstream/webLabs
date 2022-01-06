import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Join from "./components/pages/JoinPage";
import Login from "./components/pages/LoginPage";
import MainPage from "./components/pages/MainPage";
import { login } from "./store/slices/AuthSlice";

function App() {
  const dispatcher = useDispatch();

  useEffect(() => {
    dispatcher(login(localStorage.getItem("accessToken")));
  }, []);

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
