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
          <GalleryImage
            src={props.img.fileRef}
            onClick={(e) => {
              e.preventDefault();
              props.onClick(props.img);
            }}
          />
        </GalleryItemImage>
      </GalleryItem>
    </GalleryItemWrapper>
  );
}

export default Item;
