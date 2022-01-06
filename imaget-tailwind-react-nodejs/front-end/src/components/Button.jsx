import React from "react";
import { NavLink } from "react-router-dom";

const Button = (props) => {
  if (props.nav)
    return (
      <NavLink
        to={props.to}
        className="px-2 py-1 bg-black text-white rounded-lg"
      >
        {props.children}
      </NavLink>
    );

  return (
    <button className="p-1 bg-black text-white rounded-lg">
      {props.children}
    </button>
  );
};

export default Button;
