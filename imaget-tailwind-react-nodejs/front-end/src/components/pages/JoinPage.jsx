import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import bcrypt from "bcryptjs";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/AuthSlice";

function Join() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("accessToken")) navigate("/");
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [joinError, setJoinError] = useState("");
  const dispatcher = useDispatch();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/users/add", {
        user: {
          ...data,
          password: bcrypt.hashSync(data.password),
          repeatPassword: undefined,
        },
      });
      dispatcher(login(response.data?.accessToken));
      localStorage.setItem("accessToken", response.data?.accessToken);
      navigate("/");
    } catch (error) {
      setJoinError(error.response.data.error);
    }
  };

  return (
    <div className="w-screen h-screen flex">
      <section className="flex basis-3/6 items-center justify-center bg-amber-500">
        <NavLink to="/" className="select-none text-5xl font-bold">
          Imaget
        </NavLink>
      </section>
      <section className="flex basis-4/6 items-center justify-center">
        <form
          className="flex h-5/6 flex-col justify-evenly"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="font-extrabold text-4xl mb-8 text-center select-none">
            Join Imaget
          </label>
          <div className="flex">
            <div className="flex flex-col mr-1.5">
              <label className="text-sm my-1 mx-0 select-none">
                First name
              </label>
              <input
                name="firstName"
                className="p-2 outline-none border-b border-black"
                {...register("firstName", {
                  required: (
                    <p className="w-36 text-xs text-red-500 top-full">
                      The first name is required
                    </p>
                  ),
                  minLength: {
                    value: 2,
                    message: (
                      <p className="w-36 text-xs text-red-500 top-full">
                        First name cannot consist of one character!
                      </p>
                    ),
                  },
                  maxLength: {
                    value: 50,
                    message: (
                      <p className="w-36 text-xs text-red-500 top-full">
                        First name cannot be longer than 50 characters!
                      </p>
                    ),
                  },
                })}
              />
              {errors?.firstName?.message}
            </div>
            <div className="flex flex-col ml-1.5">
              <label className="text-sm my-1 mx-0 select-none">Last name</label>
              <input
                name="lastName"
                className="p-2 outline-none border-b border-black"
                {...register("lastName", {
                  required: (
                    <p className="w-36 text-xs text-red-500 top-full">
                      The last name is required!
                    </p>
                  ),
                  minLength: {
                    value: 2,
                    message: (
                      <p className="w-36 text-xs text-red-500 top-full">
                        Last name cannot consist of one character!
                      </p>
                    ),
                  },
                  maxLength: {
                    value: 50,
                    message: (
                      <p className="w-36 text-xs text-red-500 top-full">
                        Last name cannot be longer than 50 characters!
                      </p>
                    ),
                  },
                })}
              />
              {errors?.lastName?.message}
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-sm my-1 mx-0 select-none">
              Email address
            </label>
            <input
              name="email"
              className="p-2 outline-none border-b border-black"
              {...register("email", {
                required: (
                  <p className="w-96 text-xs text-red-500 top-full">
                    Email address is required!
                  </p>
                ),
                pattern: {
                  value:
                    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
                  message: (
                    <p className="w-96 text-xs text-red-500 top-full">
                      You need to provide valid email address!
                    </p>
                  ),
                },
              })}
            />
            {errors?.email?.message}
          </div>
          <div className="flex flex-col">
            <label className="text-sm my-1 mx-0 select-none">Password</label>
            <input
              name="password"
              type="password"
              className="p-2 outline-none border-b border-black"
              {...register("password", {
                required: (
                  <p className="w-96 text-xs text-red-500 top-full">
                    The password is required!
                  </p>
                ),
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/,
                  message: (
                    <p className="w-96 text-xs text-red-500 top-full">
                      Password must contain minimum 6 and maximum 10 characters,
                      at least one uppercase letter, one lowercase letter, one
                      number and one special character!
                    </p>
                  ),
                },
              })}
            />
            {errors?.password?.message}
          </div>
          <div className="flex flex-col">
            <label className="text-sm my-1 mx-0 select-none">
              Repeat password
            </label>
            <input
              name="repeatPassword"
              type="password"
              className="p-2 outline-none border-b border-black"
              {...register("repeatPassword", {
                required: "You need to repeat password!",
                validate: (v) =>
                  v === watch("password") || "The password doesn't match!",
              })}
            />
            <p className="w-96 text-xs text-red-500 top-full">
              {errors?.repeatPassword?.message}
            </p>
          </div>
          <p className="w-96 text-xs text-red-500">{joinError}</p>
          <button className="p-2 bg-black text-white rounded-lg mt-8">
            Join
          </button>
          <div className="mt-4">
            <span className="select-none">Already have an account?</span>
            <NavLink className="mx-1 text-neutral-500" to="/login">
              Login
            </NavLink>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Join;
