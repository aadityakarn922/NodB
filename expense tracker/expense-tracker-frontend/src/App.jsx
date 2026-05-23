import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

import AddTransaction from "./components/AddTransaction";
import TransactionList from "./components/TransactionList";
import Balance from "./components/Balance";

function App() {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    const res = await axios.get("http://localhost:5000/transactions");
    setTransactions(res.data);
  };

  useEffect(() => {
  const fetchTransactions = async () => {
    const res = await axios.get("http://localhost:5000/transactions");
    setTransactions(res.data);
  };

  fetchTransactions();
}, []);

  return (
    <div className="container">
      <h1>Expense Tracker 💰</h1>

      <Balance transactions={transactions} />

      <AddTransaction fetchTransactions={fetchTransactions} />

      <TransactionList
        transactions={transactions}
        fetchTransactions={fetchTransactions}
      />
    </div>
  );
}

export default App;