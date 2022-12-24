import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Container, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { toast } from "react-toastify";
import dayjs from "dayjs";

export default function TransactionsList({
  transaction,
  fetchTransaction,
  setEditTransaction,
}) {
  const remove = async (_id) => {
    if (!window.confirm("Are you sure")) return;
    console.log(_id);
    const res = await fetch(`http://localhost:4000/transaction/${_id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      toast.success("Deleted successfully", { autoClose: 800 });
      fetchTransaction();
    }
  };

  const formatDate = (date) => {
    return dayjs(date).format("DD/MM/YYYY");
  };

  return (
    <Container>
      <Typography variant="h6" sx={{ marginTop: 10 }}>
        Transaction List
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transaction.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {row.amount}
                </TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center">{formatDate(row.date)}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => setEditTransaction(row)}
                    component="label"
                  >
                    <EditIcon></EditIcon>
                  </IconButton>
                  <IconButton
                    color="warning"
                    component="label"
                    onClick={() => remove(row._id)}
                  >
                    <DeleteIcon></DeleteIcon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
