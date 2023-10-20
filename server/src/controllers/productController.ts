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
        const product = await db.one('SELECT * FROM prod_get_by_id($1)', [req.body]);
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    } 
}

export async function getProdByBizId(req: Request, res: Response) {
    try 
    {
        const product = await db.any('SELECT * FROM prod_get_by_biz_id($1)', [req.body]);
        res.status(200).json(product);
        // res.json(req.body)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error....' });
    } 
}

export async function getProdByCatId(req: Request, res: Response) {
    try 
    {
        const product = await db.any('SELECT * FROM prod_get_by_cat_id($1)', [req.body]);
        res.status(200).json(product);
        // res.json(req.body)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error....' });
    } 
}

// INSERT
/*** Sample
{
   "prod_name": "Head Speed Pro",
   "prod_description": "Long story",
   "prod_price": 299.55,
   "prod_stockqty": 6,
   "prod_modelnum": "J100",
   "cat_id": "C0035",
   "sub_cat": "Racket",
   "biz_id": "B0014"
}

 */
export async function insertNewProduct(req: Request, res: Response) {
    try {
        const result = await db.one(
            'SELECT * FROM prod_insert_new($1)', [req.body]);

        if (result.prod_insert_new === 1) {
            res.status(200).json({ message: 'New product added successfully.' });
        } else if (result.prod_insert_new  === -1) {
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

        if (result.prod_update_details === 1) {
            res.status(200).json({ message: 'Product details updated successfully.' });
        } else if (result.prod_update_details === -1) {
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
/**********PRODUCT CATEGORY */
/**get all prod cat */
export async function getProdCatAll(req: Request, res: Response) {
    try 
    {
        const product = await db.any('SELECT * FROM cat_get_all()');
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    } 
}