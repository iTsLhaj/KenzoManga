import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from '../logo.svg';

const Header: React.FC = () => {
    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-12">
                    <Link to="/" className="text-2xl font-bold text-gray-800 mr-8">
                        <Logo className="h-8" />
                    </Link>
                    <nav>
                        <ul className="flex space-x-12">
                            <li><Link to="/" className="text-gray-600 hover:text-purple-500">Home</Link></li>
                            <li><Link to="/discover" className="text-gray-600 hover:text-purple-500">Discover</Link></li>
                            <li><Link to="/about" className="text-gray-600 hover:text-purple-500">About</Link></li>
                        </ul>
                    </nav>
                </div>
                <div className="flex space-x-4">
                    <Link 
                        to="/register" 
                        className="bg-black text-white px-4 py-2 rounded-full transition-opacity hover:opacity-70"
                    >
                        Register
                    </Link>
                    <Link 
                        to="/login" 
                        className="bg-[#FEFEFE] text-[#1D1D1D] px-4 py-2 rounded-full border border-[#1D1D1D] transition-colors hover:bg-[#1D1D1D] hover:text-[#FEFEFE]"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Header;
