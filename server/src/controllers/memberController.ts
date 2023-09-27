import { Request, Response } from 'express';
import { db } from '../../db';

export async function getMemberAll(req: Request, res: Response) {
    try 
    {
        const members = await db.any('SELECT * FROM mem_get_all()');
        res.json(members);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    } 
}

export async function getMemberById(req: Request, res: Response) {
    try 
    {
        const member = await db.one('SELECT * FROM mem_get_by_id($1)', [req.body]);
        res.status(200).json(member);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    } 
}

export async function getMemberByRegdate(req: Request, res: Response) {
    try 
    {
        const members = await db.any('SELECT * FROM mem_get_by_regdate($1)', [req.body]);
        res.status(200).json(members);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    } 
}

export async function getMemberPreference(req: Request, res: Response) {
    try 
    {
        const member = await db.any('SELECT * FROM mem_get_preference_info($1)', [req.body]);
        res.status(200).json(member);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    } 
}

