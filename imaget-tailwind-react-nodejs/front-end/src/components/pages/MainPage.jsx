import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Gallery from "./Gallery/Gallery";
import UploadPage from "./Upload/UploadPage";

const MainPage = () => {
  return (
    <section className="w-screen h-screen flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/upload" element={<UploadPage />} />
        <Route path="*" element={<Gallery />} />
      </Routes>
    </section>
  );
};

export default MainPage;
