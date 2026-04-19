import supabase from '../config/supabase.js';

class Bill {
    static findAll = async (filter) => {
        try {
            const { search, category, isPaid, inOrder, userid } = filter;

            // Khởi tạo query mặc định (bắt buộc phải có userid để bảo mật)
            let query = supabase.from('bills').select('*').eq('userid', userid);

            // Chỉ thêm vào query nếu biến đó có tồn tại (khác undefined và rỗng)
            if (search) {
                query = query.ilike('billname', `%${search}%`); // Dùng ilike để tìm kiếm không phân biệt hoa thường
            }

            if (category) {
                query = query.eq('category', category);
            }

            if (isPaid !== undefined) { // So sánh !== undefined vì isPaid có thể là boolean (false)
                query = query.eq('ispaid', isPaid);
            }
            else query = query.eq('ispaid', false);

            if (inOrder !== undefined) {
                if (inOrder === 'true') {
                    query = query.order('priority', { ascending: true });
                } else {
                    query = query.order('priority', { ascending: false });
                }
            }

            // Cuối cùng mới thực thi (await) query đã được nối hoàn chỉnh
            const { data, error } = await query;
            return { data, error };
        } catch (error) {
            console.error('error', error);
            throw error;
        }
    }

    static findBillById = async (billId, userId) => {
        try {
            const { data, error } = await supabase
                .from('bills')
                .select('*')
                .eq('id', billId)
                .eq('userid', userId)
                .single();
            return { data, error };
        } catch (error) {
            console.error('error', error);
        }
    }

    static createBill = async (bill) => {
        try {

        } catch (error) {
            console.error(error);
        }
    }

    static updateBill = async (userId, billId, payload) => {
        try {
            const { data, error } = await supabase
                .rpc('pay_user_bill', {
                    p_user_id: userId,
                    p_bill_id: billId,
                    p_account_id: payload.account_id,
                    p_amount: payload.amount,
                })
            return { data, error };
        } catch (error) {
            console.error('error', error);
        }
    }
}

export default Bill;
