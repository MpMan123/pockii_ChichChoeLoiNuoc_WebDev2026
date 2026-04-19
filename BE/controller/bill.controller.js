import Bill from '../model/bill.model.js';

export const getAllBills = async (req, res) => {
    try {
        const filter = {
            userid: req.user.id,
            search: req.query.search,
            category: req.query.category,
            isPaid: req.query.isPaid,
            inOrder: req.query.inOrder,
        }

        const { data, error } = await Bill.findAll(filter);
        if (error) console.error('error', error);
        res.status(200).json({
            status: "success",
            data: data
        });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error: error.message });
    }
}

export const getBillById = async (req, res) => {
    try {
        const userId = req.user.id;
        const billId = req.params.id;
        const { data, error } = Bill.findBillById(billId, userId);
        res.status(200).json({
            success: true,
            message: "Lấy chi tiết hóa đơn thành công",
            data: data
        })
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ error: error.message });
    }
}

export const createBill = async (req, res) => {
    try {
        const { data, error } = Bill.createBill(req.body);
        res.status(201).json({
            success: true,
            message: "Tạo hóa đơn thành công",
            data: data,
        });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ error: error.message });
    }
}

export const updateBill = async (req, res) => {
    try {
        const { data, error } = Bill.updateBill(req.user.id, req.params.id, req.body);
        res.status(200).json({
            success: true,
            message: "Cập nhật hóa đơn thành công",
            data: data,
        });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ error: error.message });
    }
}