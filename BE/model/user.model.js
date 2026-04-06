import { pool } from '../config/database.js';

class User {
    static createUser = async (userData) => {
        const { name, age, address } = userData;

        const [result] = await pool.execute(
            `INSERT INTO user (name, age, address) VALUES (?, ?, ?)`,
            [name, age, address]
        );
        return result;
    }

    static getAllUser = async () => {
        const [rows] = await pool.execute(
            `SELECT * FROM user`
        );
        return rows;
    }

    static findUserById = async (id) => {
        const [rows] = await pool.execute(
            `SELECT * FROM user WHERE id=?`
            , [id]);
        return rows[0];
    }

    static findUserByAddress = async (address) => {
        const [rows] = await pool.execute(
            `SELECT * FROM user WHERE address=?`
            , [address]);
        return rows[0];
    }
}
export default User;