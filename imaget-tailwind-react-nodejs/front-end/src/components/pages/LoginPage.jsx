import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/AuthSlice";

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("accessToken")) navigate("/");
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loginError, setLoginError] = useState("");
  const dispatcher = useDispatch();

  const onSubmit = async (data) => {
    try {
      const response = await axios.get("http://localhost:5000/users/login", {
        params: {
          email: data.email,
          password: data.password,
        },
      });
      dispatcher(login(response.data.accessToken));
      localStorage.setItem("accessToken", response.data.accessToken);
      navigate("/");
    } catch (err) {
      setLoginError(err.response.data.error);
    }
  };

  return (
    <div className="h-screen w-scren flex">
      <section className="flex flex-1 bg-amber-500 justify-center items-center">
        <NavLink to="/" className="select-none text-5xl font-bold">
          Imaget
        </NavLink>
      </section>
      <section className="flex flex-1 bg-white justify-center items-center">
        <form
          className="flex h-5/6 w-3/6 flex-col justify-evenly"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="font-extrabold text-3xl select-none text-center">
            Login
          </label>
          <div className="flex flex-col relative">
            <label className="text-sm my-1 mx-0 select-none">
              Email address
            </label>
            <input
              className="p-2 outline-none border-b border-black"
              {...register("email", {
                required: (
                  <p className="w-96 text-xs text-red-500 top-full">
                    The email name is required!
                  </p>
                ),
              })}
            />
            {errors?.email?.message}
          </div>
          <div className="flex flex-col relative">
            <label className="text-sm my-1 mx-0 select-none">Password</label>
            <input
              type="password"
              className="p-2 outline-none border-b border-black"
              {...register("password", {
                required: (
                  <p className="w-96 text-xs text-red-500 top-full">
                    Password can't be blank!
                  </p>
                ),
              })}
            />
            {errors?.password?.message}
          </div>
          <p className="w-96 text-xs text-red-500 top-full">{loginError}</p>
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
