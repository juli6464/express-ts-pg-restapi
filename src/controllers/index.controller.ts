import { Request, Response } from 'express'
import { QueryResult} from 'pg'

import { pool } from '../database'

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await pool.query('SELECT * FROM users');
        return res.status(200).json(response.rows)
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal server error')
    }

}

export const getUserById = async (req: Request, res: Response): Promise<Response> => {
        const id = parseInt(req.params.id);
        const response: QueryResult  = await pool.query('SELECT * FROM users WHERE id= $1', [id]);
        return res.json(response.rows)


}

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    const { name,email, password } = req.body
    const response: QueryResult = await pool.query('INSERT INTO users (name,email,password) VALUES ($1,$2,$3)', [name,email,password])
    return res.json({
        message: 'User created successfully',
        body: {
            user: { name, email, password }
        }

    })
}

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    const { name, email, password } = req.body
    await pool.query('UPDATE users SET name=$1, email=$2, password=$3 WHERE id=$4', [name, email, password, id])
    return res.json({
        message: `User ${id} updated successfully`,
        body: {
            user: { name, email, password }
        }
    })
}

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM users WHERE id= $1', [id]);
    return res.json(`User ${id} deleted successfully`)
}