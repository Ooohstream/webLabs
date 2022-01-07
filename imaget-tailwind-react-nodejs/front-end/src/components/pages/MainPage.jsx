import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Gallery from "./Gallery/Gallery";
import UploadPage from "./Upload/UploadPage";
import axios from "axios";

const MainPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

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
    </section>
  );
};

export default MainPage;
