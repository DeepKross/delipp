import {type NextPage} from "next";
import Head from "next/head";

import {api} from "~/utils/api";
import { useUser} from "@clerk/nextjs";

import UserWizard from '~/components/NavBar/UserWizard';
import {useState} from "react";
import Products from "~/components/Products";

const Home: NextPage = () => {

    const user = useUser();

    return (
        <>
            <Head>
                <title>Delipp</title>
            </Head>
            <header>
                <div className="flex justify-end items-center p-3 ">
                    <UserWizard/>
                </div>
            </header>
            <main className="flex justify-center h-screen">
                <div className="w-full  md:max-w-4xl md:border-x-2 ">
                    <div className="flex justify-center">
                        <h1 className="content-center text-3xl md:text-6xl font-bold text-transparent bg-clip-text
                         bg-gradient-to-r from-purple-500 to-pink-500">Delipp</h1>
                    </div>
                    <Products/>
                </div>
            </main>
        </>
    );
};

export default Home;
