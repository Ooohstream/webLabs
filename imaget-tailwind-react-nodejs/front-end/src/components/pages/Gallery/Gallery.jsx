import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Item from "./Item";
import { GalleryGridContainer, GalleryGridWrapper } from "./styles";

function Gallery() {
  const [images, setImages] = useState([]);
  const location = useLocation();

  // useEffect(() => {
  //   const init = async () => {
  //     const {}
  //   }
  // }, [])

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

  return (
    <GalleryGridWrapper>
      <GalleryGridContainer>
        {images.map((img) => (
          <Item imgSource={img} />
        ))}
      </GalleryGridContainer>
    </GalleryGridWrapper>
  );
}

export default Gallery;
