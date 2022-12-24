import { Router } from "express";
import Transaction from "../models/Transaction.js";

const router = Router();

router.get("/", async (req, res) => {
  const transaction = await Transaction.find({}).sort({ createdAt: -1 });
  res.json({ data: transaction });
});

router.post("/", async (req, res) => {
  const { amount, description, date } = req.body;
  const transaction = new Transaction({
    amount,
    description,
    date,
  });
  await transaction.save();
  res.json({ message: "success" });
});

// delete transaction
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await Transaction.deleteOne({ _id: id });
  res.json({ message: "success" });
});

// update api
router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  await Transaction.updateOne({ _id: id }, { $set: req.body });
  res.json({ message: "success" });
});
export default router;
