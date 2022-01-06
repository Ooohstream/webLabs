import styled from "styled-components";

export const GalleryGridWrapper = styled.div`
  flex: 1;
  overflow: auto;
  scroll-behavior: smooth;
  padding: 10px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const GalleryGridContainer = styled.div`
  background: #fff;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: 100px 300px;
  grid-gap: 10px;
  grid-auto-flow: dense;
`;

export const GalleryItemWrapper = styled.div`
  grid-column: span 2;
  grid-row: span 2;
`;

export const GalleryItem = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const GalleryItemImage = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const GalleryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 50%;
  cursor: pointer;
  border-radius: 0.5em;
`;
