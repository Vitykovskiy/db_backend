import { Request, Response } from "express";
import connection from "../config/database";
import { IPaymentDTO } from "../models/paymentModel";

export const getPayments = (req: Request, res: Response) => {
  const sql = "SELECT * FROM payments";
  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

export const createPayment = (req: Request, res: Response) => {
  const { client_id, session_id, amount } = req.body as IPaymentDTO;
  const sql =
    "INSERT INTO payments (client_id, session_id, amount, payment_date) VALUES (?, ?, ?, NOW())";

  connection.query(sql, [client_id, session_id, amount], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({
      id: (result as any).insertId,
      client_id,
      session_id,
      amount,
      payment_date: new Date(), // Возвращаем текущую дату и время
    });
  });
};

export const updatePayment = (req: Request, res: Response) => {
  const { id } = req.params;
  const { amount, payment_date } = req.body as Partial<IPaymentDTO>;
  const sql = "UPDATE payments SET amount = ?, payment_date = ? WHERE id = ?";
  connection.query(sql, [amount, payment_date, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Payment updated successfully" });
  });
};

export const deletePayment = (req: Request, res: Response) => {
  const { id } = req.params;
  const sql = "DELETE FROM payments WHERE id = ?";
  connection.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Payment deleted successfully" });
  });
};
