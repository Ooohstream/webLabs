import styled from "styled-components";

export const ModalWrapper = styled.div`
  background: #00000030;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  height: 95vh;
  width: 40vw;
  padding: 1em;
  overflow: hidden;
  border-radius: 1em;

  img {
    width: 100%;
    height: 70%;
    object-fit: cover;
  }
`;
