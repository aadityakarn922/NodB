function Balance({ transactions }) {
  const balance = transactions.reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="balance">
      Balance: ₹ {balance}
    </div>
  );
}

export default Balance;