import { Request, Response } from 'express'
import { QueryResult} from 'pg'
import { pool } from '../database'

export const getWallets = async (req: Request, res: Response): Promise<Response> => {
    try {
        const user_id = req.user.id;
        const response: QueryResult = await pool.query(
            'SELECT * FROM wallets WHERE user_id = $1',
            [user_id]
        );        
        return res.status(200).json(response.rows)
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal server error')
    }

}

export const getWalletById = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    const user_id = req.user.id;

    const response: QueryResult = await pool.query(
        'SELECT * FROM wallets WHERE id = $1 AND user_id = $2',
        [id, user_id]
    );

    if (response.rows.length === 0) {
        return res.status(404).json({ message: 'Wallet not found or not authorized' });
    }

    return res.status(200).json(response.rows[0]);
}

export const createWallet = async (req: Request, res: Response): Promise<Response> => {
    const { tag, chain, address } = req.body;
    const user_id = req.user.id;

    if (!chain || !address) {
        return res.status(400).json({ message: 'Missing required fields: chain or address' });
    }

    const query = tag
        ? 'INSERT INTO wallets (tag, chain, address, user_id) VALUES ($1, $2, $3, $4)'
        : 'INSERT INTO wallets (chain, address, user_id) VALUES ($1, $2, $3)';
    
    const values = tag ? [tag, chain, address, user_id] : [chain, address, user_id];

    try {
        const response: QueryResult = await pool.query(query, values);

        return res.json({
            message: 'Wallet created successfully',
            body: {
                wallet: { tag: tag || null, chain, address, user_id }
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error creating wallet' });
    }
}

export const updateWallet = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    const { tag, chain, address } = req.body;
    const user_id = req.user.id;

    const walletCheck = await pool.query(
        'SELECT * FROM wallets WHERE id = $1 AND user_id = $2',
        [id, user_id]
    );

    if (walletCheck.rowCount === 0) {
        return res.status(403).json({ message: 'Unauthorized or wallet not found' });
    }

    if (!chain || !address) {
        return res.status(400).json({ message: 'chain and address are required' });
    }

    if (tag !== undefined) {
        await pool.query(
            'UPDATE wallets SET tag = $1, chain = $2, address = $3 WHERE id = $4 AND user_id = $5',
            [tag, chain, address, id, user_id]
        );
    } else {
        await pool.query(
            'UPDATE wallets SET chain = $1, address = $2 WHERE id = $3 AND user_id = $4',
            [chain, address, id, user_id]
        );
    }

    return res.json({
        message: `Wallet ${id} updated successfully`,
        body: {
            user: { tag, chain, address }
        }
    });
}

export const deleteWallet = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    const user_id = req.user.id;

    const walletCheck = await pool.query(
        'SELECT * FROM wallets WHERE id = $1 AND user_id = $2',
        [id, user_id]
    );

    if (walletCheck.rowCount === 0) {
        return res.status(403).json({ message: 'Unauthorized or wallet not found' });
    }

    await pool.query('DELETE FROM wallets WHERE id = $1 AND user_id = $2', [id, user_id]);

    return res.json({ message: `Wallet ${id} deleted successfully` });
}