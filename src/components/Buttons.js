import styled from "styled-components";

export const Button = styled.button`
  background-color: ${({ isBuy }) =>
    isBuy ? "rgb(246 70 93)" : "rgb(14, 203, 129)"};
  border: none;
  border-radius: 4px;
  box-sizing: border-box;
  cursor: pointer;
  color: white;
  flex: 1 1 0%;
  font-weight: 500;
  height: 40px;
  margin: 0px;
  min-width: 0px;
  text-align: center;
  text-transform: uppercase;
  width: 100%;
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: nowrap;
  border-radius: 4px;
  overflow: hidden;

  > button {
    border-radius: 0;

    &:not(.selected) {
      background: rgb(43 49 57);
    }
  }
`;

export const ButtonLink = styled(Button)`
  background: transparent;
  box-sizing: border-box;
  color: rgb(132, 142, 156);
  display: inline-flex;
  padding: 16px 8px;
  width: initial;

  &.selected {
    color: rgb(240 185 11);
  }
`;
