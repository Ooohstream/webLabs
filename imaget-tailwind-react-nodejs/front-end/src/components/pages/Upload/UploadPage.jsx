import React from "react";
import { FileChooser } from "./styles";

function UploadPage() {
  return (
    <section class="flex flex-1">
      <label
        class="
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
        <h3>Drag and drop an image or choose from files</h3>
        <FileChooser type="file" accept="image/*" />
      </label>
      <div class="flex flex-1 items-center justify-center">
        <form
          class="
              flex flex-col
              justify-evenly
              h-4/6
              w-3/6
              px-4
              py-8
              border border-black
              rounded-xl
            "
        >
          <div class="flex flex-col">
            <label class="text-sm my-1 mx-0 select-none">File name</label>
            <input class="p-2 outline-none border-b border-black" />
          </div>
          <div class="flex flex-col">
            <label class="text-sm my-2 mx-0 select-none">Category</label>
            <select class="outline-none py-1 border rounded">
              <option>Wallpapers</option>
              <option>Nature</option>
              <option>Fashion</option>
              <option>3D Renders</option>
              <option>Architecture</option>
              <option>Film</option>
              <option>People</option>
            </select>
          </div>
          <button class="p-2 bg-black text-white rounded-lg mt-8">
            Upload
          </button>
        </form>
      </div>
    </section>
  );
}

export default UploadPage;
