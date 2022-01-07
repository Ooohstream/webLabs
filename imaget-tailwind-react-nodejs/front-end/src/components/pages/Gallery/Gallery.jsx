import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Modal from "../../Modal/Modal";
import Item from "./Item";
import { GalleryGridContainer, GalleryGridWrapper } from "./styles";

function Gallery() {
  const [images, setImages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalImage, setModalImage] = useState({});
  const location = useLocation();

  useEffect(() => {
    const findCategory = async () => {
      const params = new URLSearchParams(location.search);
      if (params.get("category") !== null) {
        const { data } = await axios("http://localhost:5000/files", {
          params: {
            categoryId: location.state,
          },
        });
        setImages(data);
      } else {
        const { data } = await axios("http://localhost:5000/files");
        setImages(data);
      }
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
      <GalleryGridWrapper>
        <GalleryGridContainer>
          {images.map((img) => (
            <Item key={img.fileRef} img={img} onClick={handleModal} />
          ))}
        </GalleryGridContainer>
      </GalleryGridWrapper>
    </>
  );
}

export default Gallery;
