import { Request, Response, response } from 'express';
import { db } from '../../db';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

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

// GET Products per cat sorted by purchase frequenct
export async function getBestProdPerCat(req: Request, res: Response) {
    try 
    {
        const product = await db.any('SELECT * FROM vw_ranked_prod_per_cat');
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
            'SELECT * FROM prod_insert_new2($1)', [req.body]);
        res.json({result})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Oops, something broke.' });
    }
}

export async function insertBatchProduct(req: Request, res: Response) {
    try {
        const batch = await db.any('SELECT prod_insert_new_batch($1::jsonb[])', [req.body]);
        res.json({ batch });
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
        if (result.prod_delete_by_id === 1) {
            res.status(200).json({ message: 'deleted successfully.' });
        } else if (result.prod_delete_by_id === -1) {
            res.status(404).json({ message: 'record not found.' });
        } else {
            res.status(500).json({ error: 'Internal server error.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Oops, something broke.' });
    }
}

// POST - IMAGES
export const uploadImages = async (req: Request, res: Response) => {
    try {
      const prod_id = req.params.prod_id;
      if (!prod_id) {
        return res.status(400).json({ error: 'prod_id is missing.' });
      }
  
      const destination = path.join(`${process.env.IMAGE_URL}`, prod_id);
  
      const multerStorage = multer.diskStorage({
        destination: destination,
        filename: (req: Request, file: any, callback: any) => {
          const fileName = file.originalname;
          callback(null, fileName);
        },
      });
  
      const upload = multer({ storage: multerStorage }).array('images', 5);
  
      upload(req, res, (err: any) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to upload images.' });
        }
        return res.status(200).json({ message: 'Images uploaded successfully.' });
      });
    } catch (error) {
        console.error('Error while uploading images:', error);
        res.status(500).json({ error: 'Something went wrong.' });
    }
};

// GET - IMAGES
export const getImages = async (req: Request, res: Response) => {
    try {
      const prod_id = req.params.prod_id;
      if (!prod_id) {
        return res.status(400).json({ error: 'prod_id is missing.' });
      }
  
      const imageFolder = path.join(`${process.env.IMAGE_URL}`, prod_id);
  
      if (!fs.existsSync(imageFolder)) {
        return res.status(404).json({ error: 'No images found for this product.' });
      }
  
      const imageFiles = fs.readdirSync(imageFolder);

      return res.status(200).json({ imageFiles });
    } catch (error) {
      console.error('Error while getting images:', error);
      res.status(500).json({ error: 'Something went wrong.' });
    }
  };


