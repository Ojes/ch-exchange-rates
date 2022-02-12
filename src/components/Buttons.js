import styled from "styled-components";

export const Button = styled.button`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  flex: 1 1 0%;
  text-align: center;
  cursor: pointer;
  font-weight: 500;
  height: 32px;
  text-transform: uppercase;
  background-color: ${(isBuy) =>
    isBuy ? "rgb(246 70 93)" : "rgb(14, 203, 129)"}
  border-radius: 4px;
`;
