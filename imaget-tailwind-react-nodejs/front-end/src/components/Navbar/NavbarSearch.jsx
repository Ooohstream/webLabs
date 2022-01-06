import React from "react";
import { NavLink } from "react-router-dom";
import Button from "../Button";
import { useSelector } from "react-redux";

function NavbarSearch() {
  const auth = useSelector((state) => state.auth.isAuth);

  return (
    <form className="flex items-center flex-1 ml-6">
      <input
        className="p-1.5 outline-none border rounded-lg w-full"
        placeholder="Search..."
      />
      <section className="flex justify-evenly w-44">
        {auth ? (
          <NavLink
            to="/upload"
            className="text-sm text-base border border-black p-1 rounded-lg cursor-pointer"
          >
            Upload new image
          </NavLink>
        ) : (
          <>
            <Button to="/join" nav={true}>
              Sign up
            </Button>
            <Button to="/login" nav={true}>
              Sign in
            </Button>
          </>
        )}
      </section>
    </form>
  );
}

export default NavbarSearch;
