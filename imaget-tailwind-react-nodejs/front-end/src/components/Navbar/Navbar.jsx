import React from "react";
import { NavLink } from "react-router-dom";
import CategoryLink from "./CategoryLink";
import NavbarSearch from "./NavbarSearch";

function Navbar() {
  return (
    <nav className="w-full flex items-center h-32">
      <NavLink
        className="my-2 mx-6 text-black font-bold select-none text-3xl"
        to="/"
      >
        Imaget
      </NavLink>
      <section className="flex flex-1 flex-col w-full h-full">
        <NavbarSearch />
        <ul className="flex justify-between items-center flex-1 p-0 mx-6">
          <CategoryLink>Wallpapers</CategoryLink>
          <CategoryLink>Nature</CategoryLink>
          <CategoryLink>Fashion</CategoryLink>
          <CategoryLink>3D Renders</CategoryLink>
          <CategoryLink>Architecture</CategoryLink>
          <CategoryLink>Film</CategoryLink>
          <CategoryLink>People</CategoryLink>
        </ul>
      </section>
    </nav>
  );
}

export default Navbar;