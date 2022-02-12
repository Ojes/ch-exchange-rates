import { Orders } from "./components/Orders";
import { SwapRates } from "./components/SwapRates";
import { TransactionProvider } from "./context/transaction.context";

function App() {
  return (
    <TransactionProvider>
      <SwapRates></SwapRates>
      <Orders></Orders>
    </TransactionProvider>
  );
}

export default App;
