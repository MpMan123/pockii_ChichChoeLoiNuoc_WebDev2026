import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MessageSquare } from "lucide-react";
import { Form, Input, Button, message } from 'antd';
import { login, register } from "../services/auth.service";
import logo from "../assets/logo.png";
import pawel from "../assets/pawel.jpg";
import { useAuth } from "../context/AuthContext";

// Xử lý loại bỏ dấu / ở cuối URL nếu có
const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/$/, '');

const Login = () => {
    const { loginUser } = useAuth();
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        setLoading(true);
        const { email, password } = values;

        try {
            if (isLoginMode) {
                const res = await login(email, password);
                console.log(res.data);
                if (res.data.success) {
                    message.success("Đăng nhập thành công!");
                    // Token is now secured automatically by HttpOnly Cookie from Backend
                    if (res.data.data?.user) {
                        loginUser(res.data.data.user);
                    }
                    navigate(from, { replace: true });
                }
            } else {
                const res = await register(email, password);
                if (res.data.success) {
                    message.success("Đăng ký thành công! Vui lòng đăng nhập.");
                    // Chuyển về chế độ đăng nhập để login
                    setIsLoginMode(true);
                    navigate(from, { replace: true });
                }
            }
        } catch (err: any) {
            const errorMsg = err.response?.data?.message || err.message || "Đã xảy ra lỗi!";
            message.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    const toggleMode = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsLoginMode(!isLoginMode);
    };

    const validateGmail = (_: any, value: string) => {
        if (!value) return Promise.resolve(); // Bỏ qua nếu rỗng (vì đã có rules required = true xử lý rồi)
        return value.toLowerCase().endsWith('@gmail.com')
            ? Promise.resolve()
            : Promise.reject(new Error("Email bắt buộc phải có đuôi @gmail.com"));
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden font-sans z-0 bg-bg gap-10">
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none -z-10" style={{ backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(220, 210, 190, 0.4) 0%, transparent 40%), radial-gradient(circle at 80% 80%, rgba(200, 230, 210, 0.5) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.5) 0%, transparent 60%)' }}></div>

            {/* 3D sphere (3 layers) */}
            <div className="absolute bottom-10 left-10 w-[20vh] h-[20vh] md:w-[25vh] md:h-[25vh] max-w-[200px] max-h-[200px] z-0">
                <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-white/10 backdrop-blur-sm rounded-[2rem] shadow-xl border border-white/20">
                    <div className="w-full flex-1 rounded-2xl overflow-hidden shadow-inner rotate-3 hover:rotate-0 transition-transform duration-500">
                        <img src={pawel} alt="Decoration" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>

            <div className="w-full max-w-[460px] z-10 animate-fade-in mt-10 px-4">
                <div className="flex flex-col items-center mb-6">
                    <img src={logo} alt="Logo" className="w-18 h-18 rounded-2xl mb-4" />
                    <h1 className="font-heading text-3xl text-primary-dark tracking-tight mb-1 font-bold">Pockii</h1>
                    <p className="text-text-muted text-sm font-medium">The Serene Ledger</p>
                </div>

                <div className="bg-white/85 backdrop-blur-[20px] border border-white/60 rounded-[28px] p-8 md:p-10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)]">
                    <h2 className="font-heading text-2xl md:text-3xl text-text text-center mb-8">
                        {isLoginMode ? "Welcome back" : "Create an Account"}
                    </h2>

                    <Form
                        layout="vertical"
                        onFinish={onFinish}
                        requiredMark={false}
                        className="w-full"
                    >
                        <Form.Item
                            label={<span className="text-[11px] font-bold text-text-muted tracking-wider">EMAIL ADDRESS</span>}
                            name="email"
                            rules={[
                                { required: true, message: 'Vui lòng nhập email!' },
                                { type: 'email', message: 'Email không hợp lệ!' },
                                { validator: validateGmail }
                            ]}
                            className="mb-4"
                        >
                            <Input
                                size="large"
                                placeholder="name@gmail.com"
                                className="rounded-xl border-transparent bg-[#F4F4F4] focus:bg-white hover:bg-white transition-all text-[15px] p-[10px_16px]"
                            />
                        </Form.Item>

                        <Form.Item
                            label={
                                <div className="flex justify-between items-center w-full">
                                    <span className="text-[11px] font-bold text-text-muted tracking-wider">PASSWORD</span>
                                    {isLoginMode && <a href="#" className="text-[11px] font-bold text-primary tracking-wider hover:underline ml-auto">FORGOT?</a>}
                                </div>
                            }
                            name="password"
                            rules={[
                                { required: true, message: 'Vui lòng nhập mật khẩu!' },
                                { min: 6, message: 'Mật khẩu phải chứa ít nhất 6 ký tự!' }
                            ]}
                            className="mb-6"
                        >
                            <Input.Password
                                size="large"
                                placeholder="••••••••"
                                className="rounded-xl border-transparent bg-[#F4F4F4] focus:bg-white hover:bg-white transition-all text-[15px] p-[10px_16px]"
                            />
                        </Form.Item>

                        <Form.Item className="mb-0">
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                className="w-full h-12 bg-primary hover:!bg-primary-dark rounded-xl font-bold border-none text-[15px] shadow-sm transform transition-all hover:-translate-y-px"
                            >
                                {isLoginMode ? "Log In" : "Sign Up"}
                            </Button>
                        </Form.Item>
                    </Form>

                    <p className="text-center text-sm text-text mt-6">
                        {isLoginMode ? "Don't have an account? " : "Already have an account? "}
                        <a href="#" onClick={toggleMode} className="font-bold text-primary hover:underline">
                            {isLoginMode ? "Sign up for free" : "Log in"}
                        </a>
                    </p>
                </div>
            </div>

            {/* Floating Chat Button */}
            <button className="fixed bottom-10 right-10 w-16 h-16 rounded-full bg-white flex items-center justify-center border-none shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] cursor-pointer z-50 transition-transform hover:scale-105">
                <MessageSquare size={24} className="text-primary-dark" />
            </button>
        </div>
    );
};

export default Login;
