import React from "react";
import { useEffect, useState } from "react";

import TransactionForm from "../components/TransactionForm";
import TransactionsList from "../components/TransactionsList";

const Home = () => {
  const [transaction, setTransaction] = useState([]);
  const [editTransaction, setEditTransaction] = useState({});

  useEffect(() => {
    fetchTransaction();
  }, []);

  async function fetchTransaction() {
    const res = await fetch("http://localhost:4000/transaction");
    const { data } = await res.json();
    setTransaction(data);
  }
  return (
    <div>
      <TransactionForm
        fetchTransaction={fetchTransaction}
        editTransaction={editTransaction}
      ></TransactionForm>
      <TransactionsList
        transaction={transaction}
        fetchTransaction={fetchTransaction}
        setEditTransaction={setEditTransaction}
      ></TransactionsList>
    </div>
  );
};

export default Home;
