import React from "react";
import {
  NavLink,
  useNavigate,
  createSearchParams,
  useLocation,
} from "react-router-dom";
import Button from "../Button";
import { useSelector } from "react-redux";
import { DebounceInput } from "react-debounce-input";

function NavbarSearch({ searchTerm, setSearchTerm }) {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value)
      navigate({
        pathname: "/",
        search: `?${createSearchParams({ search: value })}`,
      });
    else navigate("/");
  };

  return (
    <form
      className={`flex items-center flex-1 ml-6 ${
        location.pathname === "/upload" ? "hidden" : ""
      }`}
    >
      <DebounceInput
        className="p-1.5 outline-none border rounded-lg w-full"
        placeholder="Search..."
        debounceTimeout={1000}
        value={searchTerm}
        onChange={async (e) => handleSearch(e.target.value)}
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
