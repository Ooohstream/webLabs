import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Modal from "../../Modal/Modal";
import Item from "./Item";
import { GalleryGridContainer, GalleryGridWrapper } from "./styles";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

function Gallery() {
  const [images, setImages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalImage, setModalImage] = useState({});
  const location = useLocation();

  useEffect(() => {
    const findCategory = async () => {
      setIsLoading(true);
      const params = new URLSearchParams(location.search);
      if (params.get("category") !== null) {
        const { data } = await axios("http://localhost:5000/files", {
          params: {
            categoryId: location.state,
          },
        });
        setImages(data);
        setIsLoading(false);
        return;
      }

      if (params.get("search") !== null) {
        const { data } = await axios("http://localhost:5000/files", {
          params: {
            searchTerm: params.get("search"),
          },
        });
        setImages(data);
        setIsLoading(false);
        return;
      }

      const { data } = await axios("http://localhost:5000/files");
      setImages(data);
      setIsLoading(false);
    };
    findCategory();
  }, [location]);

  const handleModal = (image) => {
    setModalVisible(true);
    setModalImage(image);
  };

  return (
    <>
      <Modal
        modalImage={modalImage}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      {isLoading ? (
        <div className="w-screen h-screen flex justify-center items-center">
          <Loader visible={isLoading} type="Grid" color="black" />
        </div>
      ) : images.length > 0 ? (
        <GalleryGridWrapper>
          <GalleryGridContainer>
            {images.map((img) => (
              <Item key={img.fileRef} img={img} onClick={handleModal} />
            ))}
          </GalleryGridContainer>
        </GalleryGridWrapper>
      ) : (
        <div className="w-screen h-screen flex justify-center items-center flex-col">
          <img src="https://img.icons8.com/ios/100/000000/empty-box.png" />
          <h1 className="font-bold">
            Unfortunately there is nothing found for this query!:(
          </h1>
        </div>
      )}
    </>
  );
}

export default Gallery;
