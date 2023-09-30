import { Request, Response } from 'express';
import { db } from '../../db';

// GET 

export async function getProdAll(req: Request, res: Response) {
    try 
    {
        const product = await db.any('SELECT * FROM prod_get_all()');
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    } 
}

export async function getProdById(req: Request, res: Response) {
    try 
    {
        const product = await db.one('SELECT * FROM prod_get_by_id()');
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    } 
}

export async function getProdByBizId(req: Request, res: Response) {
    try 
    {
        const product = await db.one('SELECT * FROM prod_get_by_biz_id()');
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    } 
}

// INSERT

export async function insertNewProduct(req: Request, res: Response) {
    try {
        const result = await db.one(
            'SELECT * FROM prod_insert_new($1)', [req.body]);

        if (result === 1) {
            res.status(200).json({ message: 'New product added successfully.' });
        } else if (result === -1) {
            res.status(500).json({ error: 'Db error: Create product failed.' });
        } else {
            res.status(500).json({ error: 'Internal server error.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Oops, something broke.' });
    }
}

// UPDATE

export async function updateProductInfo(req: Request, res: Response) {
    try {
        const result = await db.one(
            'SELECT * FROM prod_update_details($1)', [req.body]);

        if (result === 1) {
            res.status(200).json({ message: 'Product details updated successfully.' });
        } else if (result === -1) {
            res.status(500).json({ error: 'DB error: Product info update failed.' });
        } else {
            res.status(500).json({ error: 'Internal server error.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Oops, something broke.' });
    }
}

// DELETE

export async function deleteProduct(req: Request, res: Response) {
    try {
        const result = await db.one(
            'SELECT * FROM prod_delete_by_id($1)', [req.body]);

        if (result === 1) {
            res.status(200).json({ message: 'Product deleted successfully.' });
        } else if (result === -1) {
            res.status(404).json({ message: 'Product record not found.' });
        } else {
            res.status(500).json({ error: 'Internal server error.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Oops, something broke.' });
    }
}