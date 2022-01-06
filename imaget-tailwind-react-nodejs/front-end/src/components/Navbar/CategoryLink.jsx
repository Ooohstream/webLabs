import React from "react";
import { useNavigate, createSearchParams } from "react-router-dom";

function CategoryLink(props) {
  const navigate = useNavigate();

  return (
    <li>
      <button
        className="
                  transition
                  duration-700
                  hover:border-black
                  border-b border-transparent
                  pb-2
                  cursos-pointer
                "
        onClick={(e) => {
          e.preventDefault();
          navigate({
            pathname: "/",
            search: `?${createSearchParams({ category: props.children })}`,
          });
        }}
      >
        {props.children}
      </button>
    </li>
  );
}

export default CategoryLink;
