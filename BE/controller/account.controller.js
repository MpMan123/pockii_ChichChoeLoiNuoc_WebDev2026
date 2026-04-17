import supabase from "../config/database.js";
import Account from "../model/account.model.js";

export const getAllAccounts = async (req, res) => {
    try {
        const userId = req.user.id;
        const { data, error } = await supabase
            .from('accounts')
            .select('*')
            .eq('user_id', userId);
        if (error) {
            console.error('error', error);
        }
        res.status(200).json({
            status: "success",
            data: data
        });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error: error.message });
    }
}

export const createAccount = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('accounts')
            .insert([req.body])
            .select('*')
            .single();
        if (error) {
            console.error('error', error);
        }
        res.status(201).json({
            success: true,
            message: "Tạo tài khoản thành công",
            data: data,
        });
    } catch (error) {
        console.error('error', error);
        res.status(500).json({ error: error.message });
    }
}

export const updateAccount = async (req, res) => {
    try {
        const { data, error } = await Account.updateAccount(req.user.id, req.params.id, req.body);
        if (error) console.error('error', error);
        res.status(200).json({
            success: true,
            message: "Cập nhật tài khoản thành công",
            data: data,
        });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ error: error.message });
    }
}