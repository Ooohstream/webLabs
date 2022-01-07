import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FileChooser } from "./styles";

function UploadPage({ categories }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) navigate("/");
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let formData = new FormData();
      formData.append("file", data.file[0]);
      formData.append("filename", data.fileName);
      formData.append("category", data.category);
      formData.append(
        "categoryId",
        categories.find((category) => category.displayName === data.category)
          ?.id
      );
      await axios.post("http://localhost:5000/files/upload", formData, {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="flex flex-1">
      <label
        className="
            flex flex-col flex-1
            justify-center
            items-center
            border-r
            cursor-pointer
          "
      >
        <img
          alt="upload-icon"
          src="https://img.icons8.com/ios/150/eea04e/image.png"
        />
        {errors?.file?.message ? (
          errors?.file?.message
        ) : (
          <h3>
            {watch("file")
              ? watch("file")[0].name
              : "Drag n drop or choose file to upload"}
          </h3>
        )}

        <FileChooser
          type="file"
          accept="image/*"
          {...register("file", {
            required: <p className="text-red-500 top-full">No file chosen</p>,
          })}
        />
      </label>
      <div className="flex flex-1 items-center justify-center">
        <form
          className="
              flex flex-col
              justify-evenly
              h-4/6
              w-3/6
              px-4
              py-8
              border border-black
              rounded-xl
            "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col">
            <label className="text-sm my-1 mx-0 select-none">File name</label>
            <input
              className="p-2 outline-none border-b border-black"
              {...register("fileName", {
                required: (
                  <p className="text-xs text-red-500 top-full">
                    File name is requied
                  </p>
                ),
              })}
            />
            {errors?.fileName?.message}
          </div>
          <div className="flex flex-col">
            <label className="text-sm my-2 mx-0 select-none">Category</label>
            <select
              className="outline-none py-1 border rounded"
              {...register("category", {
                required: (
                  <p className="text-xs text-red-500 top-full">
                    File name is requied
                  </p>
                ),
              })}
            >
              {categories.map((category) => (
                <option key={category.id}>{category.displayName}</option>
              ))}
            </select>
          </div>
          <button className="p-2 bg-black text-white rounded-lg mt-8">
            Upload
          </button>
        </form>
      </div>
    </section>
  );
}

export default UploadPage;
