"use client"
import { useState, useEffect} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
    const router = useRouter();
    const [isNavOpen, setIsNavOpen] = useState(false);
    
    const handleNavToggle = () => {
        setIsNavOpen(!isNavOpen);
    };
    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/user/logout")
            let res:any = response.json();
            router.push("/login")
            toast.success("logout successfully")
        } catch (error) {
            toast.error("Something went wrong")
        }
    }


    return (
        <header className="bg-zinc-100 shadow-md">
            <div className="container mx-auto px-4 flex justify-between items-center py-4">
                <div className="text-xl font-bold">OMAIR.com</div>
                <nav className="hidden md:flex space-x-6">
                    <Link href="#" className="text-gray-600 hover:text-gray-900">Home</Link>
                    <Link href="#" className="text-gray-600 hover:text-gray-900">About</Link>
                    <Link href="#" className="text-gray-600 hover:text-gray-900">Services</Link>
                    <Link href="#" className="text-gray-600 hover:text-gray-900">Contact</Link>
                </nav>
                <div className="hidden md:block">
                    <a onClick={handleLogout} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Logout</a>
                </div>
                <button className="md:hidden flex items-center px-3 py-2 border rounded text-gray-600 border-gray-600 hover:text-gray-900 hover:border-gray-900" onClick={handleNavToggle}>
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                </button>
            </div>
            <div className={`md:hidden  ${isNavOpen ? 'block' : 'hidden'}`} id="nav-content">
                <ul className="px-2 pt-2 pb-4 space-y-1">
                    <li><a href="#" className="block px-2 py-1 text-gray-600 rounded hover:bg-gray-300">Home</a></li>
                    <li><a href="#" className="block px-2 py-1 text-gray-600 rounded hover:bg-gray-300">About</a></li>
                    <li><a href="#" className="block px-2 py-1 text-gray-600 rounded hover:bg-gray-300">Services</a></li>
                    <li><a href="#" className="block px-2 py-1 text-gray-600 rounded hover:bg-gray-300">Contact</a></li>
                    <li><a onClick={handleLogout} className="block px-2 py-1 text-gray-600 rounded hover:bg-gray-200">Logout</a></li>
                </ul>
            </div>
        </header>
    );
}
