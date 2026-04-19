import supabase from "../config/supabase.js";

class Debt {
    static getAllDebts = async (userId) => {
        try {
            const { data, error } = await supabase
                .from('debts')
                .select('*')
                .eq('userid', userId);
            if (error) {
                console.error(error);
            }
            return { data, error };
        } catch (error) {
            console.error('Error fetching debts:', error);
            throw error;
        }
    }

    static createDebt = async (debt) => {
        try {
            console.log("debt", debt);
            const { data, error } = await supabase
                .from('debts')
                .insert([debt])
                .select('*')
                .single();
            if (error) {
                console.error(error);
            }
            return { data, error };
        } catch (error) {
            console.error('Error creating debt:', error);
        }
    }
}

export default Debt;