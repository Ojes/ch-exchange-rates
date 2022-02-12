import { SwapRates } from "./components/SwapRates";
import { TransactionProvider } from "./context/transaction.context";

function App() {
  return (
    <TransactionProvider>
      <SwapRates></SwapRates>
    </TransactionProvider>
  );
}

export default App;
