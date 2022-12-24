import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Button from "@mui/material/Button";
import { Container } from "@mui/system";
import { toast } from "react-toastify";

export default function TransactionForm({ fetchTransaction, editTransaction }) {
  const initialForm = {
    amount: 0,
    description: "",
    date: new Date(),
  };

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (editTransaction.amount !== undefined) {
      setForm(editTransaction);
    }
  }, [editTransaction]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  function handleDate(newValue) {
    setForm({ ...form, date: newValue });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = editTransaction.amount === undefined ? create() : update();
    console.log(res);
  };

  function reload(res) {
    if (res.ok) {
      setForm(initialForm);
      fetchTransaction();
    }
  }

  async function create() {
    const res = await fetch("http://localhost:4000/transaction", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(form),
    });

    reload(res);
  }
  async function update() {
    const res = await fetch(
      `http://localhost:4000/transaction/${editTransaction._id}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );
    if (res.ok) {
      toast.success("update successfully", { autoClose: 800 });
    }
    reload(res);
  }

  return (
    <Container>
      <Card sx={{ minWidth: 275, marginTop: 10 }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Typography variant="h6">Add New Transaction</Typography>
            <TextField
              sx={{ marginRight: 5 }}
              id="outlined-basic"
              label="Amount"
              type="number"
              size="small"
              name="amount"
              variant="outlined"
              value={form.amount}
              onChange={handleChange}
            />
            <TextField
              sx={{ marginRight: 5 }}
              size="small"
              id="outlined-basic"
              label="Description"
              variant="outlined"
              value={form.description}
              onChange={handleChange}
              name="description"
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Transaction Date"
                inputFormat="DD/MM/YYYY"
                onChange={handleDate}
                value={form.date}
                renderInput={(params) => (
                  <TextField sx={{ marginRight: 5 }} size="small" {...params} />
                )}
              />
            </LocalizationProvider>
            {editTransaction.amount !== undefined && (
              <Button type="submit" variant="primary">
                Update
              </Button>
            )}
            {editTransaction.amount === undefined && (
              <Button type="submit" variant="contained">
                Submit
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}
