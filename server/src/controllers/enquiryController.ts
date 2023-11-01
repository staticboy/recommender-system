import { Request, Response } from 'express';
import { db } from '../../db';

// GET ALL
export async function getAllEnquiries(req: Request, res: Response) {
    try 
    {
        const enquiry = await db.any('SELECT * FROM enq_get_all2()');
        res.json(enquiry);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    } 
}


//GET BY ID
export async function getEnquiryById(req: Request, res: Response) {
    try 
    {
        const enquiry = await db.one('SELECT * FROM enq_get_by_id($1)', [req.body]);
        res.status(200).json(enquiry);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    } 
}

//GET BY SUBMIT ID
export async function getEnquiryBySubmitId(req: Request, res: Response) {
    try 
    {
        const enquiry = await db.any('SELECT * FROM enq_get_by_submitid($1)', [req.body]);
        res.status(200).json(enquiry);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    } 
}

//GET BY enquiry types
export async function getEnquiryTypes(req: Request, res: Response) {
    try 
    {
        const enquiry = await db.any('select * from enq_get_enq_types()');
        res.status(200).json(enquiry);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    } 
}

//GET BY Daterange sort by
/*
sample 
{  
    "start_date": "2023-09-30 12:19:30",
    "end_date": "2024-09-30 12:19:30",
    "sort_order": "descending"
}
 */
export async function getEnquiryBySubmitDateSorted(req: Request, res: Response) {
    try 
    {
        const enquiry = await db.any('SELECT * FROM enq_get_by_submitdate($1)', [req.body]);
        res.status(200).json(enquiry);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    } 
}




//INSERT
export async function insertEnquiry(req: Request, res: Response) {
    try {
        const result = await db.one(
            'SELECT * FROM enq_insert_new($1)', [req.body]);

    
        if (result.enq_insert_new === 1) {
            res.status(200).json({ message: 'Enquiry sent successfully.' });
        } else if (result.enq_insert_new === -1) {
            res.status(500).json({ error: 'DB error: Enquiry insertion failed.' });
        } else {
        
        res.status(500).json({ error: 'Internal server error.' });

        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Oops, something broke.' });
    }
}


//UPDATE
export async function updateEnqByAdm(req: Request, res: Response) {
    try {


        const result = await db.one(
            'SELECT * FROM enq_update_by_adm($1)', [req.body]);

    
        if (result.enq_update_by_adm === 1) {
            res.status(200).json({ message: 'Response to enquiry has been sent to the user' });
        } else if (result.enq_update_by_adm === -1) {
            res.status(500).json({ error: 'DB error: Enquiry no longer in OPEN state.' });
        } else {
        
        res.status(500).json({ error: 'Internal server error.' });

        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Oops, something broke.' });
    }
}

