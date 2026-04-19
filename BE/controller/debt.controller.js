import Debt from "../model/debt.model.js";

export const getAllDebts = async (req, res) => {
    try {
        const userId = req.user.id;
        const { data, error } = await Debt.getAllDebts(userId);
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

export const createDebt = async (req, res) => {
    try {
        const userId = req.user.id;
        req.body.userid = userId;
        const { data, error } = await Debt.createDebt(req.body);
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
