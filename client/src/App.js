import { useState } from "react";

function App() {
  const [form, setForm] = useState({
    amount: 0,
    description: "",
    date: "",
  });

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

    const data = res.json();
    console.log(data);
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
    </div>
  );
}

export default App;
