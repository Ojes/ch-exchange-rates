import styled from "styled-components";
import { Orders } from "./components/Orders";
import { SwapRates } from "./components/SwapRates";
import { TransactionProvider } from "./context/transaction.context";

const ContainerWrapper = styled.article`
  margin: 40px auto 0;
  max-width: 300px;
`;

function App() {
  return (
    <TransactionProvider>
      <ContainerWrapper>
        <SwapRates></SwapRates>
        <Orders></Orders>
      </ContainerWrapper>
    </TransactionProvider>
  );
}

export default App;
