import supabase from '../config/supabase.js';

class Saving {
    static CreateSaving = async (payload) => {
        try {
            const { data, error } = await supabase
                .from('saving_plans')
                .insert([payload])
                .select('*')
                .single();
            if (error) {
                console.error('error', error);
            }
            return { data, error };
        } catch (error) {
            console.error('error', error);
        }
    }

    static GetAllSavings = async (userId) => {
        try {
            const { data, error } = await supabase
                .from('saving_plans')
                .select('*')
                .eq('user_id', userId);
            if (error) {
                console.error('error', error);
            }
            return { data, error };
        } catch (error) {
            console.error('error', error);
        }
    }

    static GetSavingById = async (userId, savingId) => {
        try {
            const { data, error } = await supabase
                .from('saving_plans')
                .select('*')
                .eq('id', savingId)
                .eq('user_id', userId)
                .single();
            if (error) {
                console.error('error', error);
            }
            return { data, error };
        } catch (error) {
            console.error('error', error);
        }
    }

    static MakeDeposit = async (userId, savingId, payload) => {
        try {
            const { data, error } = await supabase
                .rpc('make_deposit', {
                    p_user_id: userId,
                    p_saving_id: savingId,
                    p_amount: payload.amount,
                    p_account_id: payload.account_id,
                })
            console.error(error);
            return { data, error };
        } catch (error) {
            console.error('error', error);
        }
    }

    static DeleteSaving = async (userId, savingId) => {
        try {
            const { data, error } = await supabase
                .from('saving_plans')
                .delete()
                .eq('id', savingId)
                .eq('user_id', userId)
                .select('*')
                .single();
            if (error) throw error;
            return { data, error };
        } catch (error) {
            console.error('error', error);
        }
    }
}

export default Saving;