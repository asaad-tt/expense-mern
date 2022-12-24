import { useEffect, useState } from "react";

import AppBar from "./components/AppBar";
import TransactionForm from "./components/TransactionForm";
import TransactionsList from "./components/TransactionsList";
// import { AppBar } from "@mui/material";

function App() {
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

  // console.log(form);

  return (
    <div>
      <AppBar></AppBar>

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
}

export default App;
