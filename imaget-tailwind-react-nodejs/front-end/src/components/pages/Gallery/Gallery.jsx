import React, { useEffect, useState } from "react";
import Item from "./Item";
import { GalleryGridContainer, GalleryGridWrapper } from "./styles";

function Gallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    let imageArr = [];
    for (let i = 0; i < 100; i++) {
      const screenWidth = parseInt(Math.random() * (3840 - 640) + 640);
      const screenHeight = parseInt(Math.random() * (2160 - 360) + 360);
      const url = `https://picsum.photos/${screenWidth}/${screenHeight}?random`;
      imageArr.push(url);
    }
    setImages(imageArr);
  }, []);

  console.log(images);

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
