import axios from "axios";

function TransactionList({ transactions, fetchTransactions }) {
  const deleteTransaction = async (id) => {
    await axios.delete(`http://localhost:5000/transactions/${id}`);
    fetchTransactions();
  };

  return (
    <div>
      <h3>History</h3>

      {transactions.map((t) => (
        <div className="transaction" key={t._id}>
          <span>
            {t.text} — {t.amount}
          </span>

          <button
            className="delete-btn"
            onClick={() => deleteTransaction(t._id)}
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
}

export default TransactionList;