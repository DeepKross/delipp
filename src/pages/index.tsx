import {type NextPage} from "next";
import Head from "next/head";
import Products from "~/components/Products/Products";
import NavBar from "~/components/NavBar/NavBar";

const Home: NextPage = () => {

    return (
        <>
            <Head>
                <title>Delipp</title>
            </Head>
            <header>
                <NavBar/>
            </header>
            <Products/>

        </>
    );
};

export default Home;
