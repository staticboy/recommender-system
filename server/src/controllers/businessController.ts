import { Request, Response } from 'express';
import { db } from '../../db';


// GET 

export async function getBusinessAll(req: Request, res: Response) {
    try 
    {
        const business = await db.any('SELECT * FROM biz_get_all()');
        res.json(business);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    } 
}

export async function getBusinessById(req: Request, res: Response) {
    try 
    {
        const business = await db.one('SELECT * FROM biz_get_by_id($1)', [req.body]);
        res.status(200).json(business);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    } 
}

export async function getBusinessByRegdate(req: Request, res: Response) {
    try 
    {
        const business = await db.any('SELECT * FROM biz_get_by_regdate($1)', [req.body]);
        res.status(200).json(business);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    } 
}

export async function getBusinessTxn(req: Request, res: Response) {
    try 
    {
        const business = await db.any('SELECT * FROM biz_get_transaction($1)', [req.body]);
        res.status(200).json(business);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    } 
}

// INSERT

export async function insertNewBusiness(req: Request, res: Response) {
    try {
        const result = await db.one(
            'SELECT * FROM biz_register_acct($1)', [req.body]);

        if (result.result_code === 1) {
            res.status(200).json({ user_id: result.biz_id });
        } else if (result.result_code === -1) {
            res.status(500).json({ error: 'Duplicate business email found.' });
        } else {
            res.status(500).json({ error: 'Internal server error.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Oops, something broke.' });
    }
}

// UPDATE

export async function updateBusinessStatus(req: Request, res: Response) {
    try {
        const result = await db.one(
            'SELECT * FROM biz_update_account_status($1)', [req.body]);

        if (result.biz_update_account_status === 1) {
            res.status(200).json({ message: 'Business account status updated successfully.' });
        } else if (result.biz_update_account_status === -1) {
            res.status(500).json({ error: 'DB error: Preference update failed.' });
        } else {
            res.status(500).json({ error: 'Internal server error.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Oops, something broke.' });
    }
}

export async function updateBusinessProfile(req: Request, res: Response) {
    try {
        const result = await db.one(
            'SELECT * FROM biz_update_profile($1)', [req.body]);

        if (result.biz_update_profile === 1) {
            res.status(200).json({ message: 'Profile information updated successfully.' });
        } else if (result.biz_update_profile === -1) {
            res.status(500).json({ error: 'DB error: Profile update failed.' });
        } else {
            res.status(500).json({ error: 'Internal server error.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Oops, something broke.' });
    }
}

export async function bizAccountVerify(req: Request, res: Response) {
    try {
        const result = await db.one(
            'SELECT * FROM biz_verify_account($1)', [req.body]);

        if (result.biz_verify_account === 1) {
            res.status(200).json({ message: 'Business account approved successfully.' });
        } else if (result.biz_verify_account === -1) {
            res.status(500).json({ error: 'DB error: business account update failed.' });
        } else {
            res.status(500).json({ error: 'Internal server error.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Oops, something broke.' });
    }
}

export async function bizAccountDisable(req: Request, res: Response) {
    try {
        const result = await db.one(
            'SELECT * FROM biz_disable_account($1)', [req.body]);

        if (result.biz_disable_account === 1) {
            res.status(200).json({ message: 'Business account disabled successfully.' });
        } else if (result.biz_disable_account === -1) {
            res.status(500).json({ error: 'DB error: business account update failed.' });
        } else {
            res.status(500).json({ error: 'Internal server error.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Oops, something broke.' });
    }
}

export async function getBusinessInsights(req: Request, res: Response) {
    try 
    {
        const insight = await db.any('SELECT * FROM biz_get_insights($1)', [req.body]);
        res.status(200).json(insight);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    } 
}

export async function getAdminPerformance(req: Request, res: Response) {
    try 
    {
        const perf = await db.any('SELECT * FROM admin_performance($1)', [req.body]);
        res.status(200).json(perf);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    } 
}