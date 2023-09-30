import { Request, Response } from 'express';
import { db } from '../../db';
import exp from 'constants';

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

// POST

export async function getCategoryById(req: Request, res: Response) {        
    try 
    {
        const category = await db.one('SELECT * FROM cat_get_by_id($1)', [req.body]);
        res.status(200).json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    } 
}

export async function registerCategory(req: Request, res: Response) {
    try 
    {
        const result = await db.one('SELECT * FROM cat_insert_new($1)', [req.body]);
        
        if (result.result_code === 1) {
            res.status(200).json({ message: 'Category registered successfully' });
        } else if (result.result_code === -1) {
            res.status(500).json({ message: 'Category already exists' });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Shit happen' });
    } 
}


// UPDATE / PUT

export async function updateCategoryDetails(req: Request, res: Response) {
    try {
        const result = await db.one('SELECT * FROM cat_update_details($1)', [req.body]);

        if (result.cat_update_details === 1){
            res.status(200).json({message: 'Category details updated'});
        } else if (result.cat_update_details === -1){
            res.status(404).json({ error: 'DB error: detail updates failed'})
        } else {
            res.status(500).json({ error: 'Internal server error.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Shit happen' });
    } 
}

// DELETE

export async function deleteCategory(req: Request, res: Response) {
    try {
        const result = await db.one(
            'SELECT * FROM cat_delete_by_id($1)', [req.body]);

        if (result.cat_delete_by_id === 1) {
            res.status(200).json({ message: 'Category deleted successfully.' });
        } else if (result.cat_delete_by_id === -1) {
            res.status(404).json({ message: 'Category record not found.' });
        } else {
            res.status(500).json({ error: 'Internal server error.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Shit happen.' });
    }
}