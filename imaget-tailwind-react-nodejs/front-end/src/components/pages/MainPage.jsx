import React, { useEffect, useRef, useState } from "react";
import {
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Gallery from "./Gallery/Gallery";
import UploadPage from "./Upload/UploadPage";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/AuthSlice";
import CategoriesChart from "../Statistics";

const MainPage = () => {
  const [categories, setCategories] = useState([]);
  const auth = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatcher = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const init = async () => {
      const { data } = await axios("http://localhost:5000/categories");
      setCategories(data);
    };
    init();
  }, []);

  console.log(location);
  return (
    <section className="w-screen h-screen flex flex-col">
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categories={categories}
      />
      <Routes>
        <Route
          path="/upload"
          element={<UploadPage categories={categories} />}
        />
        <Route path="/statistics" element={<CategoriesChart />}></Route>
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
      <NavLink
        to="/statistics"
        className={`text-xs text-blue-500 text-center ${
          location.pathname === "/statistics" ? "hidden" : ""
        }`}
      >
        Some entertaining statistics!
      </NavLink>
    </section>
  );
};

export default MainPage;
