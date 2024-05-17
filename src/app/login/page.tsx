"use client"
import React, { useState, useEffect } from 'react'
import { FaUserLarge } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const page = () => {
    let router = useRouter();

    const [user, setUser] = useState({ email: "", password: "" });
    const [disable, setDisable] = useState(true);
    useEffect(() => {
        if (user.email.length > 5 && user.password.length > 5) {
            setDisable(false);
        } else {
            setDisable(true);
        }
    }, [user])


    const buttonClicked = async (e: any) => {
        e.preventDefault();

        try {
            let response = await fetch("http://localhost:3000/api/user/login", {
                method: "POST",
                body: JSON.stringify({ user })
            })
            let res = await response.json()
            if (res.notFound) {
                toast.error(res.notFound)
                return false;
            }
            if(res.invalid){
                toast.error(res.invalid)
                return false;
            }
            else{
                toast.success(res.message)
                router.push("/")
                return false;
            }
        } catch (error) {
            toast.error("Something went wrong")

        }


    }

    return (
        <div className="bg-gray-100 h-screen flex justify-center items-center">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-8">Login</h2>
                <form action="#" method="POST">
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 font-semibold mb-2"><FaUserLarge /></label>
                        <input value={user.email} onChange={(e) => { setUser({ ...user, email: e.target.value }) }} type="email" id="username" name="username" className="w-full  rounded-lg px-4 py-2 focus:outline-none border-zinc-300 focus:border-zinc-500 focus:ring focus:ring-zinc-200 " placeholder="username" required></input>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 font-semibold mb-2"><FaLock /></label>
                        <input onChange={(e) => { setUser({ ...user, password: e.target.value }) }} value={user.password} type="password" id="password" name="password" className="w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring focus:ring-zinc-200" placeholder="password" required></input>
                    </div>
                    <button onClick={buttonClicked} type="submit" className={disable ? `w-full bg-zinc-300 text-white font-semibold rounded-lg px-4 py-2 transition-colors duration-300 focus:outline-none cursor-not-allowed`
                        : `w-full bg-zinc-800 text-white font-semibold rounded-lg px-4 py-2 transition-colors duration-300 hover:bg-zinc-500 focus:outline-none focus:bg-zinc-600`}>Login</button>
                    <p className='mt-4 text-center'>Don't have an account? <Link className=' font-bold text-blue-500 hover:text-blue-800 hover:underline' href="/signup">SignUp !</Link> </p>

                </form>
            </div>
        </div>

    )
}

export default page



