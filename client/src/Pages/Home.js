import React from "react";
import { useEffect, useState } from "react";

import TransactionForm from "../components/TransactionForm";
import TransactionsList from "../components/TransactionsList";
import Cookies from "js-cookie";

const Home = () => {
  const [transaction, setTransaction] = useState([]);
  const [editTransaction, setEditTransaction] = useState({});

  useEffect(() => {
    fetchTransaction();
  }, []);

  async function fetchTransaction() {
    const token = Cookies.get("token");
    const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
