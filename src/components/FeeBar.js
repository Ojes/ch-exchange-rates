import styled from "styled-components";
import { useFee } from "../hooks/useFee";

const FeeWrapper = styled.strong`
  color: rgb(246 70 93); ;
`;

const SectionWrapper = styled.section`
  color: white;
  height: 40px;
  padding-left: 16px;
`;

export function FeeBar() {
  const fee = useFee();
  return (
    <SectionWrapper>
      Fee amount: <FeeWrapper>{(+fee).toLocaleString("es-AR")}</FeeWrapper>
    </SectionWrapper>
  );
}
