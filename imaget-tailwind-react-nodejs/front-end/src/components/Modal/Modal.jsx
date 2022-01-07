import axios from "axios";
import React from "react";
import Moment from "react-moment";
import { useLocation, useParams } from "react-router-dom";
import { ModalContent, ModalWrapper } from "./styles";

function Modal(props) {
  const location = useLocation();

  const handleDownload = async () => {
    await axios({
      url: props.modalImage.fileRef,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `${props.modalImage.fileName}.${props.modalImage.type}`
      );
      document.body.appendChild(link);
      link.click();
    });
  };

  const handleSearchTerm = (value) => {
    const params = new URLSearchParams(location.search);
    const searchTerm = params.get("search");
    if (value?.toLocaleLowerCase()?.includes(searchTerm?.toLocaleLowerCase())) {
      return "bg-gray-300";
    }
  };

  return (
    <ModalWrapper
      onClick={(e) => {
        e.stopPropagation();
        props.setModalVisible(false);
      }}
      className={`
      fixed
      z-10
      left-0
      top-0
      w-full
      h-full
      overflow-auto
      flex
      justify-center
      items-center
      ${props.modalVisible ? "" : "hidden"}
    `}
    >
      <ModalContent
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <img alt="modal-pic" src={props.modalImage.fileRef} />
        <div className="flex flex-1 mt-5">
          <div className="flex-1 flex flex-col justify-evenly items-start">
            <span className={handleSearchTerm(props.modalImage.fileName)}>
              {props.modalImage.fileName}
            </span>
            <span>
              By {props.modalImage.posterFirstName}{" "}
              {props.modalImage.posterLastName}
            </span>
            <span>
              Posted at{" "}
              <Moment format="D MMM YYYY" date={props.modalImage.addedAt} />
            </span>

            <span className={handleSearchTerm(props.modalImage.category)}>
              Category {props.modalImage.category}
            </span>
            <span className={handleSearchTerm(props.modalImage.type)}>
              Format .{props.modalImage.type}
            </span>
          </div>
          <div className="flex-1 bg-white flex justify-around items-center flex-col">
            <button
              onClick={() => {
                handleDownload();
              }}
              className="p-1 bg-black text-white rounded-lg w-5/6 text-center"
            >
              Download
            </button>
            <a
              rel="noreferrer"
              target="_blank"
              href={props.modalImage.fileRef}
              className="p-1 bg-black text-white rounded-lg w-5/6 text-center"
            >
              Preview in full size
            </a>
          </div>
        </div>
      </ModalContent>
    </ModalWrapper>
  );
}

export default Modal;
