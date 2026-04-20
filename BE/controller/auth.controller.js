import User from "../model/user.model.js";
import supabase from '../config/supabase.js';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Valid inputs
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Vui lòng nhập đầy đủ email và mật khẩu!",
            })
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email: req.body.email,
            password: req.body.password,
        })

        if (error) {
            return res.status(401).json({ success: false, message: error.message });
        }

        // Set HttpOnly cookie for the access token to prevent XSS
        // Use sameSite='none' in production so cookies work across Vercel <> Render domains.
        const sameSiteOption = process.env.NODE_ENV === 'production' ? 'none' : 'lax';
        console.log("sameSiteOption", sameSiteOption);
        console.log("HELLO");
        res.cookie('access_token', data.session.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: sameSiteOption,
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        // Don't leak session token directly to frontend body anymore, just user data
        res.status(200).json({
            success: true,
            data: { user: data.user, fullName: data.user?.user_metadata?.name || '', phoneNumber: data.user?.user_metadata?.phone || '' },
            message: "Đăng nhập thành công"
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Lỗi Server" });
    }
}

export const logout = async (req, res) => {
    try {
        const data = await supabase.auth.signOut();

        // Clear the token cookie
        res.clearCookie('access_token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
        });

        return res.status(200).json({
            success: true,
            data: data,
            message: "Đăng xuất thành công"
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Lỗi Server" });
    }
}

export const register = async (req, res) => {
    try {
        const { email, password, fullName, phoneNumber } = req.body;

        // Valid inputs
        if (!email || !password || !fullName || !phoneNumber) {
            return res.status(400).json({
                success: false,
                message: "Vui lòng nhập đầy đủ email, mật khẩu, họ tên và số điện thoại!",
            })
        }

        const userData = {
            email,
            password,
            fullName,
            phoneNumber,
        }

        const data = await User.createUser(userData);

        return res.status(200).json({
            success: true,
            data: data,
            message: "Đăng ký thành công!",
        })
    } catch (error) {
        console.error(error);
    }
}