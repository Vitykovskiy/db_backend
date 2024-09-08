import { Request, Response } from "express";
import connection from "../config/database";
import { ISessionDTO } from "../models/sessionModel";

export const getSessions = (req: Request, res: Response) => {
  const sql = "SELECT * FROM sessions";
  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

export const createSession = (req: Request, res: Response) => {
  const { client_id, start_time, duration, cost } = req.body as ISessionDTO;

  const status = "Scheduled"; // Статус по умолчанию

  const sql =
    "INSERT INTO sessions (client_id, start_time, duration, cost, status) VALUES (?, ?, ?, ?, ?)";

  connection.query(
    sql,
    [client_id, start_time, duration, cost, status],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.status(201).json({
        id: (result as any).insertId,
        client_id,
        start_time,
        duration,
        cost,
        status,
      });
    }
  );
};

export const updateSession = (req: Request, res: Response) => {
  const { id } = req.params;
  const { start_time, duration, cost, status } = req.body as ISessionDTO;
  const sql =
    "UPDATE sessions SET start_time = ?, duration = ?, cost = ?, status = ? WHERE id = ?";
  connection.query(
    sql,
    [start_time, duration, cost, status, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Session updated successfully" });
    }
  );
};

export const updateSessionStatus = (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body as Partial<ISessionDTO>;

  const sql = "UPDATE sessions SET status = ? WHERE id = ?";
  connection.query(sql, [status, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Session status updated successfully", status });
  });
};

export const deleteSession = (req: Request, res: Response) => {
  const { id } = req.params;
  const sql = "DELETE FROM sessions WHERE id = ?";
  connection.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Session deleted successfully" });
  });
};
