import { config } from 'dotenv'
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
config({ path: envFile });

console.log("Version", envFile);

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