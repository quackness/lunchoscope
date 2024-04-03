"use client"
import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../components/Frontend/layout';
import { Toaster, toast } from 'sonner'
import { signIn } from "next-auth/react";
import Link from 'next/link';
import axios from 'axios';
import { useAuth } from '@/Context/userAuth';

export default function LoginForm() {

    const { addUser } = useAuth();

    const router = useRouter();
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const { email, password } = data;

        if (password === '' || email === '') {
            toast.error('Fill all fields!');
            return;
        }

        if (password.length < 6) {
            toast.error('Password must be at least 6 characters long');
            return;
        }

        try {
            // const res = await signIn('credentials', { email, password, redirect: false });

            // console.log("login res", res);


            // if (res?.error == null) {
            //     router.push('/');
            // } else {
            //     toast.error('Error occurred while logging in');
            // }
            const response = await axios.post('http://localhost:3000/loginuser', { email, password })
            console.log("login res", response);

            const { user } = response.data;

            if (response.data.success) {
                toast.success('You have logged in successfully!')
                addUser(user);
                console.log("Added");

                // router.push('/')
            }
            else {
                toast.error(response.data.msg)
            }



        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout>
            <div className="flex justify-center mt-20 mx-auto max-w-screen-xl">

                <form className="p-16 rounded shadow-md w-3/4 sm:w-3/6 md:w-3/6 lg:w-5/12 xl:w-2/6"
                    onSubmit={handleSubmit}>
                    <Toaster richColors position="bottom-center" />
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-semibold ">Email</label>
                        <input id="email" name="email" type="email" value={data.email}
                            onChange={(e) => {
                                setData({ ...data, email: e.target.value });
                            }}
                            className="mt-1 block w-full rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-green-300" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-semibold">Password</label>
                        <input id="password" name="password" type="password" value={data.password}
                            onChange={(e) => {
                                setData({ ...data, password: e.target.value });
                            }}
                            className="mt-1 block w-full rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-green-300" />

                    </div>

                    <div>
                        <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-5 py-2.5 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2">
                            Login
                        </button>

                        <p>Don't have account?</p>
                        <Link href="/signup" className=" text-violet-600 hover:underline">Click here to Sign up.</Link>
                    </div>

                    <div>
                        <button className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-5 py-2.5 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                            onClick={() => { signIn("github") }}
                        >
                            or Login with Github</button>
                    </div>

                </form>
            </div>
        </Layout>
    );
}


// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcrypt";

// const prisma = new PrismaClient();

// async function createAdmin() {
//   const password = "toor"; // Contraseña
//   const hashedPassword = await bcrypt.hash(password, 10);

//   await prisma.admin.create({
//     data: {
//       email: "root", // NOmbre de usuario
//       password: hashedPassword,
//     },
//   });

//   console.log("Admin created");
// }

// createAdmin();
