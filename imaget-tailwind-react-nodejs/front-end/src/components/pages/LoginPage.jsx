import React from "react";
import { NavLink } from "react-router-dom";

function Login() {
  return (
    <div className="h-screen w-scren flex">
      <section className="flex flex-1 bg-amber-500 justify-center items-center">
        <NavLink to="/" className="select-none text-5xl font-bold">
          Imaget
        </NavLink>
      </section>
      <section className="flex flex-1 bg-white justify-center items-center">
        <form className="flex h-5/6 w-3/6 flex-col justify-evenly">
          <label className="font-extrabold text-3xl select-none text-center">
            Login
          </label>
          <div className="flex flex-col relative">
            <label className="text-sm my-1 mx-0 select-none">
              Email address
            </label>
            <input className="p-2 outline-none border-b border-black" />
          </div>
          <div className="flex flex-col relative">
            <label className="text-sm my-1 mx-0 select-none">Password</label>
            <input
              type="password"
              className="p-2 outline-none border-b border-black"
            />
          </div>
          <button className="p-2 bg-black text-white rounded-lg mt-8">
            Login
          </button>
          <div>
            <span className="select-none mx-1">Don't have an account?</span>
            <NavLink className="text-neutral-500" to="/join">
              Join
            </NavLink>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Login;
