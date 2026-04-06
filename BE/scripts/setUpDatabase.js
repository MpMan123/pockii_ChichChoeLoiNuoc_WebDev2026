import { pool } from '../config/database.js';

async function setUpDatabase() {
    try {
        const connection = await pool.getConnection();
        console.log(await connection.query('USE pockii_db;'));
        console.log(await connection.query('SHOW TABLES;'));
        connection.release();
        return true;
    } catch (error) {
        console.error('❌❌❌ Database connection failed:', error.message);
        return false;
    }
}

setUpDatabase();

export default setUpDatabase;
