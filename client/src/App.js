import { useEffect, useState } from "react";

function App() {
  const [form, setForm] = useState({
    amount: 0,
    description: "",
    date: "",
  });

  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    fetchTransaction();
  }, []);

  async function fetchTransaction() {
    const res = await fetch("http://localhost:4000/transaction");
    const { data } = await res.json();
    setTransaction(data);
  }

  // console.log(form);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:4000/transaction", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      fetchTransaction();
    }
  };

  const handelInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          onChange={handelInput}
          value={form.amount}
          name="amount"
          id=""
          placeholder="Enter transaction amount "
        />
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handelInput}
          id=""
          placeholder="Enter transaction details"
        />
        <input
          type="date"
          value={form.date}
          onChange={handelInput}
          name="date"
        />
        <button type="submit">submit</button>
      </form>

      <br />

      <section>
        <table>
          <thead>
            <th>Amount</th>
            <th>Description</th>
            <th>Date</th>
          </thead>
          <tbody>
            {transaction.map((trx) => (
              <tr key={trx._id}>
                {" "}
                <td>{trx.amount}</td>
                <td>{trx.description}</td>
                <td>{trx.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default App;
