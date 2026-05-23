import { useState } from "react";
import axios from "axios";

function AddTransaction({ fetchTransactions }) {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");

  const addTransaction = async () => {
    if (!text || !amount) return;

    await axios.post("http://localhost:5000/transactions", {
      text,
      amount: Number(amount),
    });

    setText("");
    setAmount("");
    fetchTransactions();
  };

  return (
    <div>
      <input
        placeholder="Enter description"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <input
        placeholder="Amount (+ income, - expense)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={addTransaction}>Add Transaction</button>
    </div>
  );
}

export default AddTransaction;