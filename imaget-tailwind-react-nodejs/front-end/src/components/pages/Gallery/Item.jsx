import React from "react";
import {
  GalleryItemWrapper,
  GalleryItem,
  GalleryItemImage,
  GalleryImage,
} from "./styles";

function Item(props) {
  return (
    <GalleryItemWrapper>
      <GalleryItem>
        <GalleryItemImage>
          <GalleryImage src={props.imgSource} />
        </GalleryItemImage>
      </GalleryItem>
    </GalleryItemWrapper>
  );
}

export default Item;
