"use client"
import React, { useState, useEffect } from 'react'
import { FaUserLarge } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const page = () => {
    const router = useRouter();
    const [user, setUser] = useState({ username: "", email: "", password: "" });
    const [disable, setDisable] = useState(true);
    useEffect(() => {
        if (user.email.length > 4 && user.password.length > 4 && user.username.length > 4) {
            setDisable(false);
        } else {
            setDisable(true);
        }
    }, [user])


    const buttonClicked = async (e: any) => {
       if(disable){
        toast.error("Enter full data");
        return  false;
       }
        e.preventDefault() ;
         try {

            let response = await fetch("http://localhost:3000/api/user/signup",{
            method:"POST",
            body:JSON.stringify({user})
                   })
                   router.push("/login")
                   let res = await response.json()
                   
                   if(res.exist){
                    toast.warn(res.exist)
                   }else{
                   toast.success(res.message);
                   }

        } catch (error) {
            toast.error("Something went wrong");
        }

    }
    return (
        <main className="bg-gray-100 h-screen flex justify-center items-center">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-8">Sign Up</h2>
                <form action="#" method="POST">
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 font-semibold mb-2"><FaUserLarge /></label>
                        <input value={user.username} onChange={(e) => { setUser({ ...user, username: e.target.value }) }} type="text" id="username" name="username" className="w-full rounded-lg px-4 py-2 border-zinc-300  focus:outline-none focus:border-zinc-500 focus:ring focus:ring-zinc-200" placeholder="Username" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2"><MdEmail /></label>
                        <input value={user.email} onChange={(e) => { setUser({ ...user, email: e.target.value }) }} type="email" id="email" name="email" className="w-full border-zinc-300 rounded-lg px-4 py-2 focus:outline-none focus:border-zinc-500 focus:ring focus:ring-zinc-200" placeholder="Email" required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 font-semibold mb-2"><FaLock /></label>
                        <input value={user.password} onChange={(e) => { setUser({ ...user, password: e.target.value }) }} type="password" id="password" name="password" className="w-full border-zinc-300 rounded-lg px-4 py-2 focus:outline-none focus:border-zinc-500 focus:ring focus:ring-zinc-200" placeholder="Password" required />
                    </div>
                    <button onClick={buttonClicked} type="submit" className={disable ? `w-full bg-zinc-300 text-white font-semibold rounded-lg px-4 py-2 transition-colors duration-300 focus:outline-none cursor-not-allowed`
                        : `w-full bg-zinc-800 text-white font-semibold rounded-lg px-4 py-2 transition-colors duration-300 hover:bg-zinc-500 focus:outline-none focus:bg-zinc-600`}>SignUp</button>
                    <p className='mt-4 text-center'>Already have an account? <Link className=' font-bold text-blue-500 hover:text-blue-800 hover:underline' href="/login">Login !</Link> </p>
                </form>
            </div>
        </main>
    )
}

export default page
