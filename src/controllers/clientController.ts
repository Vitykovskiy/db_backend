import { Request, Response } from "express";

import { IClientDTO } from "../models/clientModel";
import connection from "../config/database";

export const getClients = (req: Request, res: Response) => {
  const sqlClients = `
    SELECT c.id, c.name, c.contacts, c.comments, 
    COALESCE(SUM(p.amount), 0) - COALESCE(SUM(CASE WHEN s.status = 'Completed' THEN s.cost ELSE 0 END), 0) AS debt
    FROM clients c
    LEFT JOIN payments p ON c.id = p.client_id
    LEFT JOIN sessions s ON c.id = s.client_id
    GROUP BY c.id;
  `;

  connection.query(sqlClients, (err, clients) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(clients);
  });
};

export const addClient = (req: Request, res: Response) => {
  const { name, contacts, comments } = req.body as IClientDTO;
  const sql = "INSERT INTO clients (name, contacts, comments) VALUES (?, ?, ?)";
  connection.query(sql, [name, contacts, comments], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res
      .status(201)
      .json({ message: "Client created", id: (results as any).insertId });
  });
};

export const updateClient = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, contacts, comments } = req.body as IClientDTO;
  const sql =
    "UPDATE clients SET name = ?, contacts = ?, comments = ? WHERE id = ?";
  connection.query(sql, [name, contacts, comments, id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Client updated successfully" });
  });
};

export const deleteClient = (req: Request, res: Response) => {
  const { id } = req.params;
  const sql = "DELETE FROM clients WHERE id = ?";
  connection.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Client deleted successfully" });
  });
};
