import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";
import LoginPage from "../Login_Register/LoginPage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
    const { user, logout } = useAuth() || {};
    const navigate = useNavigate();
    const [isClickedLogin, setIsClickedLogin] = useState(false);

    const reverseLogin = () => {
        setIsClickedLogin(prev => !prev);
    };

    const handleLogout = () => {
        logout();
        setIsClickedLogin(false);
    };

    console.log("Người dùng header", user);

    return (
        <>
            <div className="bg-[#111111] h-[10vh] flex flex-row items-center justify-between">
                <p className="text-white text-2xl font-bold ml-10">TRENDY STORE</p>
                {user ? (
                    <div className="flex flex-row items-center mr-7">
                        <p className="text-white">Xin chào, {user.name || 'Người dùng'}!</p>
                        <button onClick={handleLogout} className="ml-4 text-white underline">
                            Đăng xuất
                        </button>
                    </div>
                ) : (
                    <div>
                        <button
                            className="text-black bg-white h-[5vh] w-[12rem] mr-[2rem] px-2 py-5 flex items-center justify-center text-md font-bold border rounded-3xl hover:bg-[#eeeeee] hover:-translate-y-0.5 hover:scale-105 hover:shadow-lg transition-all duration-300 ease-out"
                            onClick={reverseLogin}
                        >
                            Đăng nhập / Đăng ký
                        </button>

                        <AnimatePresence>
                            {isClickedLogin && (
                                <LoginPage onClose={() => setIsClickedLogin(false)} />
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </div>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
            />
        </>

    );
};

export default Header;