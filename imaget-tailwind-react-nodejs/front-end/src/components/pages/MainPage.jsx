import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Gallery from "./Gallery/Gallery";
import UploadPage from "./Upload/UploadPage";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/AuthSlice";

const MainPage = () => {
  const [categories, setCategories] = useState([]);
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatcher = useDispatch();

  useEffect(() => {
    const init = async () => {
      const { data } = await axios("http://localhost:5000/categories");
      setCategories(data);
    };
    init();
  }, []);

  return (
    <section className="w-screen h-screen flex flex-col">
      <Navbar categories={categories} />
      <Routes>
        <Route
          path="/upload"
          element={<UploadPage categories={categories} />}
        />
        <Route path="*" element={<Gallery />} />
      </Routes>
      {auth && (
        <img
          onClick={() => {
            localStorage.removeItem("accessToken");
            dispatcher(logout());
            navigate("/");
          }}
          className="absolute cursor-pointer"
          style={{ top: "90%", left: "95%" }}
          alt="exit-pic"
          src="https://img.icons8.com/external-vitaliy-gorbachev-fill-vitaly-gorbachev/48/000000/external-exit-emergency-vitaliy-gorbachev-fill-vitaly-gorbachev.png"
        />
      )}
    </section>
  );
};

export default MainPage;
