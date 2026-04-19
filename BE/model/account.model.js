import supabase from "../config/supabase.js";


class Account {
    static getAllAccounts = async (userId) => {
        try {
            const { data, error } = await supabase
                .from('accounts')
                .select('*')
                .eq('user_id', userId);
            if (error) throw error;
            return { data, error };
        } catch (error) {
            console.error('error', error);
        }
    }

    static createAccount = async (account) => {
        try {
            const { data, error } = await supabase
                .from('accounts')
                .insert([account])
                .select('*')
                .single();
            if (error) throw error;
            return { data, error };
        } catch (error) {
            console.error('error', error);
        }
    }

    static getAccountById = async (id) => {
        try {
            const { data, error } = await supabase
                .from('accounts')
                .select('*')
                .eq('id', id)
                .single();
            if (error) throw error;
            return { data, error };
        } catch (error) {
            console.error('error', error);
        }
    }

    static getAccountStatus = async (id) => {
        try {
            const { data, error } = await supabase
                .from('accounts')
                .select('status')
                .eq('id', id)
                .single();
            if (error) throw error;
            return { data, error };
        } catch (error) {
            console.error('error', error);
        }
    }

    static updateAccount = async (userId, accountId, payload) => {
        try {
            const { data, error } = await supabase
                .from('accounts')
                .update(payload)
                .eq('id', accountId)
                .eq('user_id', userId)
                .select('*')
                .single();
            return { data, error };
        } catch (error) {
            console.error('error', error);
        }
    }
}


export default Account;