import mysql from 'mysql2/promise';
import {
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME
} from './env.js';

const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    timezone: '+07:00' // Vietnam
});

const testDatabaseConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('✅✅✅ Database connected successfully')
        connection.release();
        return true;
    } catch (error) {
        console.error('❌❌❌ Database connection failed:', error.message);
        return false;
    }
}

export { pool, testDatabaseConnection };