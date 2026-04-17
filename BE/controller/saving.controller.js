import Saving from "../model/saving.model.js";

export const CreateSaving = async (req, res) => {
    try {
        const { data, error } = await Saving.CreateSaving(req.body);
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        return res.status(200).json({ data });
    } catch (error) {
        console.error('error', error);
        return res.status(500).json({ error: error.message });
    }
}

export const GetAllSavings = async (req, res) => {
    try {
        const { data, error } = await Saving.GetAllSavings(req.user.id);
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        return res.status(200).json({ data });
    } catch (error) {
        console.error('error', error);
        return res.status(500).json({ error: error.message });
    }
}

export const GetSavingById = async (req, res) => {
    try {
        const { data, error } = await Saving.GetSavingById(req.user.id, req.params.id);
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        return res.status(200).json({ data });
    } catch (error) {
        console.error('error', error);
        return res.status(500).json({ error: error.message });
    }
}

export const MakeDeposit = async (req, res) => {
    try {
        const { data, error } = await Saving.MakeDeposit(req.user.id, req.params.id, req.body);
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        return res.status(200).json({ data });
    } catch (error) {
        console.error('error', error);
        return res.status(500).json({ error: error.message });
    }
}

export const DeleteSaving = async (req, res) => {
    try {
        const { data, error } = await Saving.DeleteSaving(req.user.id, req.params.id);
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        return res.status(200).json({ data });
    } catch (error) {
        console.error('error', error);
        return res.status(500).json({ error: error.message });
    }
}