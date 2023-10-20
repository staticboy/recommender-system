import { Request, Response } from 'express';
import { db } from '../../db';

export async function login(req: Request, res: Response) {
  try {
      const result = await db.one(
          'SELECT * FROM util_user_login($1)', [req.body]);
      if (result) {
          res.status(200).json(result);
      } else {
          res.status(500).json({ error: 'Wrong credentials.' });
      }
  } catch (error) {
    res.status(500).json({ error: 'Wrong credentials.' });
  }
}