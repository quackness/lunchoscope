"use client"
import React, { useState } from 'react';
import axios from "axios";
import { useRouter } from 'next/navigation';
import Layout from '../components/Frontend/layout';
import * as yup from 'yup';
import { Toaster, toast } from 'sonner'
import { signIn } from "next-auth/react";
import Link from 'next/link';
import test from 'node:test';

export default function LoginForm() {
    const router = useRouter();
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const registerUser = async (e: any) => {
        e.preventDefault();
        console.log("User:", {
            email: data.email,
            name: data.name,
            password: data.password
        });

        try {
            const response = await axios.post('http://localhost:3000/registeruser', {
                name: data.name,
                email: data.email,
                hashedPassword: data.password,
                isAdmin: false,
                sentimentLeft: 5,
                subscribed: false,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const user = response.data;
            console.log(user)
            console.log("test")
            //     if (!response.ok) {
            //         throw new Error('Network response was not ok');
            //     }

            //     const user = await response.json();
            //     console.log(user)
            //     router.push("/login");
            // } catch (error) {
            //     console.error('Error registering user:', error);
            // }

            router.push('/login');
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    return (
        <Layout>
            <div className="flex justify-center mt-20 mx-auto max-w-screen-xl">

                <form className="p-16 rounded shadow-md w-3/4 sm:w-3/6 md:w-3/6 lg:w-5/12 xl:w-2/6"
                    onSubmit={registerUser}>
                    <Toaster richColors position="bottom-center" />
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-semibold ">Name</label>
                        <input className="mt-1 block w-full rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-green-300"
                            id="name" type="name" name="name" value={data.name}
                            onChange={(e) => {
                                setData({ ...data, name: e.target.value })
                            }}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-semibold ">Email</label>
                        <input className="mt-1 block w-full rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-green-300"
                            id="email" type="email" name="email" value={data.email}
                            onChange={(e) => {
                                setData({ ...data, email: e.target.value })
                            }}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-semibold">Password</label>
                        <input className="mt-1 block w-full rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-green-300"
                            id="password" type="password" name="password" value={data.password}
                            onChange={(e) => {
                                setData({ ...data, password: e.target.value })
                            }} />
                    </div>

                    <div>
                        <button type="submit"
                            className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-5 py-2.5 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2">
                            Sign Up
                        </button>
                    </div>
                    <div><p>Already have an account?</p>
                        <Link href="/login" className=" text-violet-600 hover:underline">Log in here.</Link>
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