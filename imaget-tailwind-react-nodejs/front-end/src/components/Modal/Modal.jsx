import axios from "axios";
import React from "react";
import Moment from "react-moment";
import { ModalContent, ModalWrapper } from "./styles";

function Modal(props) {
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
            <span>{props.modalImage.fileName}</span>
            <span>
              By {props.modalImage.posterFirstName}{" "}
              {props.modalImage.posterLastName}
            </span>
            <span>
              Posted at{" "}
              <Moment format="D MMM YYYY" date={props.modalImage.addedAt} />
            </span>

            <span>Category {props.modalImage.category}</span>
          </div>
          <div className="flex-1 bg-white flex justify-around items-center flex-col">
            <button
              onClick={async () => {
                axios({
                  url: props.modalImage.fileRef,
                  method: "GET",
                  responseType: "blob",
                }).then((response) => {
                  const url = window.URL.createObjectURL(
                    new Blob([response.data])
                  );
                  const link = document.createElement("a");
                  link.href = url;
                  link.setAttribute(
                    "download",
                    `${props.modalImage.fileName}.${props.modalImage.type}`
                  );
                  document.body.appendChild(link);
                  link.click();
                });
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
