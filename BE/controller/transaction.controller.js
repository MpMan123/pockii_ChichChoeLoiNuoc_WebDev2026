import supabase from "../config/supabase.js";

export const getAllTransactions = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('transactions')
            .eq('user_id', req.user.id)
            .select(`*`);
        res.status(200).json({
            status: "success",
            data: data
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

export const createTransaction = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('transactions')
            .insert([req.body])
            .select('*')
            .single();
        res.status(201).json({
            status: "success",
            data: data
        });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error: error.message });
    }
}

export const getTransactionById = async (req, res) => {
    try {
        const userId = req.user.id;
        const transactionId = req.params.id;
        const { data, error } = await supabase
            .from('transactions')
            .select('*')
            .eq('id', transactionId)
            .eq('userid', userId)
            .single();
        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}