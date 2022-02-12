import styled from "styled-components";
import { ButtonLink } from "./Buttons";

const TabWraper = styled.li``;

export function OrderTab({ title, selected, onClick }) {
  return (
    <TabWraper>
      <ButtonLink onClick={onClick} className={selected ? "selected" : ""}>
        {title}
      </ButtonLink>
    </TabWraper>
  );
}
