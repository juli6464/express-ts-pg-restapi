import { Request, Response } from 'express'
import { QueryResult} from 'pg'
import bcrypt from 'bcrypt'
import { pool } from '../database'
import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.SECRET_KEY as string

export const loginUser = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body

    const result: QueryResult = await pool.query('SELECT * FROM users WHERE email = $1', [email])
    const user = result.rows[0]

    if (!user) {
        return res.status(404).json({ message: 'User not found' })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
        return res.status(401).json({ message: 'Incorrect password' })
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' })

    return res.json({ message: 'Login successful', token })
}


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
    const hashedPassword = await bcrypt.hash(password, 10)
    const response: QueryResult = await pool.query(
        'INSERT INTO users (name,email,password) VALUES ($1,$2,$3)', 
        [name,email,hashedPassword]
    )
    return res.json({
        message: 'User created successfully',
        body: {
            user: { name, email }
        }

    })
}

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    const { name, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    await pool.query('UPDATE users SET name=$1, email=$2, password=$3 WHERE id=$4', 
        [name, email, hashedPassword, id])
    return res.json({
        message: `User ${id} updated successfully`,
        body: {
            user: { name, email }
        }
    })
}

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM users WHERE id= $1', [id]);
    return res.json(`User ${id} deleted successfully`)
}

export const logoutUser = (req: Request, res: Response): Response => {
    
    return res.json({ 
        message: 'Logged out. Please delete the token from client storage (e.g., localStorage or cookies).' 
    })
}