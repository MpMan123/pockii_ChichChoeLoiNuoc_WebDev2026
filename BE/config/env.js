import { config } from 'dotenv'
config({ path: '.env' });

export const {
    PORT,
    NODE_ENV,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    FRONTEND_URL,
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    GROQ_API_KEY,
    SUPABASE_URL,
    SUPABASE_ANON_KEY
} = process.env;