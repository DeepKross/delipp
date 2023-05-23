import {type NextPage} from "next";
import Head from "next/head";

import {api} from "~/utils/api";
import { SignInButton, useUser} from "@clerk/nextjs";
import {SignOutButton} from "@clerk/clerk-react";

const Home: NextPage = () => {
    const products = api.products.getAll.useQuery();

    const user = useUser();

    console.log(products)
    
    return (
        <>
            <Head>
                <title>Delipp</title>
            </Head>
            <header>
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        {!user.isSignedIn && <SignInButton/>}
                        {user.isSignedIn && <SignOutButton/>}
                    </div>
                </div>
            </header>
            <main>
                <h1>Delipp</h1>

                <div>
                    <h2>Products</h2>
                    {products.data?.map((product) => (
                        <div key={product.id}>
                            {product.name} - {product.price}
                        </div>
                        ))}
                </div>
            </main>
        </>
    );
};

export default Home;
