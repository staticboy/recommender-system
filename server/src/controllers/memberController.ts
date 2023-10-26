import { Request, Response } from 'express';
import { db } from '../../db';


// GET 

export async function getMemberAll(req: Request, res: Response) {
    try 
    {
        const members = await db.any('SELECT * FROM mem_get_all_with_lastlogin()');
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

export async function getMemberTransactions(req: Request, res: Response) {
    try 
    {
        const member = await db.any('SELECT * FROM mem_get_transactions($1)', [req.body]);
        res.status(200).json(member);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    } 
}

// DELETE

export async function deleteMemberPreferenceInfo(req: Request, res: Response) {
    try {
        const result = await db.one(
            'SELECT * FROM mem_delete_preference_info($1)', [req.body]);

        if (result === 1) {
            res.status(200).json({ message: 'Preference deleted successfully.' });
        } else if (result === -1) {
            res.status(404).json({ message: 'Preference record not found.' });
        } else {
            res.status(500).json({ error: 'Internal server error.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Oops, something broke.' });
    }
}

export async function deleteMemberCartItem(req: Request, res: Response) {
    try {
        const result = await db.one(
            'SELECT * FROM mem_delete_from_cart($1)', [req.body]);

        if (result === 1) {
            res.status(200).json({ message: 'Cart item deleted successfully.' });
        } else if (result === -1) {
            res.status(404).json({ message: 'Cart item not found.' });
        } else {
            res.status(500).json({ error: 'Internal server error.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Oops, something broke.' });
    }
}

export async function deleteMemberWishItem(req: Request, res: Response) {
    try {
        const result = await db.one(
            'SELECT * FROM mem_delete_from_wishlist($1)', [req.body]);

        if (result === 1) {
            res.status(200).json({ message: 'Wishlist item deleted successfully.' });
        } else if (result === -1) {
            res.status(404).json({ message: 'Wishlist item not found.' });
        } else {
            res.status(500).json({ error: 'Internal server error.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Oops, something broke.' });
    }
}

// INSERT

export async function insertPreferenceInfo(req: Request, res: Response) {
    try {
        const result = await db.one(
            'SELECT * FROM mem_insert_preference_info($1)', [req.body]);

        if (result === 1) {
            res.status(200).json({ message: 'Preference inserted successfully.' });
        } else if (result === -1) {
            res.status(500).json({ error: 'DB error: Preference insertion failed.' });
        } else {
            res.status(500).json({ error: 'Internal server error.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Oops, something broke.' });
    }
}

export async function insertProdRating(req: Request, res: Response) {
    try {
        const result = await db.one(
            'SELECT * FROM mem_insert_prod_rating($1)', [req.body]);

        if (result === 1) {
            res.status(200).json({ message: 'Product rated successfully.' });
        } else if (result === 0) {
            res.status(500).json({ error: 'DB error: Prod raiting insert failed.' });
        } else {
            res.status(500).json({ error: 'Internal server error.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Oops, something broke.' });
    }
}

export async function insertProdWishlist(req: Request, res: Response) {
    try {
        const result = await db.one(
            'SELECT * FROM mem_insert_to_wishlist($1)', [req.body]);

        if (result === 1) {
            res.status(200).json({ message: 'Wishlist item added successfully.' });
        } else if (result === 0) {
            res.status(500).json({ error: 'DB error: Prod wishlist insert failed.' });
        } else {
            res.status(500).json({ error: 'Internal server error.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Oops, something broke.' });
    }
}

export async function insertNewMember(req: Request, res: Response) {
    try {
        const result = await db.one(
            'SELECT * FROM mem_register_acct($1)', [req.body]);

        if (result.result_code === 1) {
            res.status(200).json({ user_id: result.user_id });
        } else if (result.result_code === -1) {
            res.status(500).json({ error: 'Duplicate member email found.' });
        } else {
            res.status(500).json({ error: 'Internal server error.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Oops, something broke.' });
    }
}

export async function insertMemberCartItem(req: Request, res: Response) {
    try {
        const result = await db.one(
            'SELECT * FROM mem_insert_to_cart($1)', [req.body]);

        if (result === 1) {
            res.status(200).json({ message: 'Added to cart.' });
        } else if (result === -1) {
            res.status(404).json({ message: 'Item already added to cart.' });
        } else {
            res.status(500).json({ error: 'Internal server error.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Oops, something broke.' });
    }
}

// UPDATE

export async function updateMemberPreferenceInfo(req: Request, res: Response) {
    try {
        const result = await db.one(
            'SELECT * FROM mem_update_preference_info($1)', [req.body]);

        if (result === 1) {
            res.status(200).json({ message: 'Preference information updated successfully.' });
        } else if (result === -1) {
            res.status(500).json({ error: 'DB error: Preference update failed.' });
        } else {
            res.status(500).json({ error: 'Internal server error.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Oops, something broke.' });
    }
}

export async function updateMemberProfileInfo(req: Request, res: Response) {
    try {
        const result = await db.one(
            'SELECT * FROM mem_update_profile_info($1)', [req.body]);

        if (result.mem_update_profile_info === 1) {
            res.status(200).json({ message: 'Profile information updated successfully.' });
        } else if (result.mem_update_profile_info === -1) {
            res.status(500).json({ error: 'DB error: Profile update failed.' });
        } else {
            res.status(500).json({ error: 'Internal server error.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Oops, something broke.' });
    }
}

//Purchase 
export async function memberSendTransaction(req: Request, res: Response) {
    try {
        const result = await db.one(
            'SELECT * FROM mem_insert_transaction($1)', [req.body]);

        if (result.mem_insert_transaction === 1) {
            res.status(200).json({ message: 'Transaction successfully completed' });
        } else if (result.mem_insert_transaction === -1) {
            res.status(500).json({ error: 'Please check user input.' });
        } else {
            res.status(500).json({ error: 'Internal server error.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Oops, something broke.' });
    }
}