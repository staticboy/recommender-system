import { Request, Response } from 'express';
import { db } from '../../db';

// GET 
export async function getCategoryAll(req: Request, res: Response) {
    try 
    {
        const category = await db.any('SELECT * FROM cat_get_all()');
        res.json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    } 
}