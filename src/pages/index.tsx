import {type NextPage} from "next";
import Head from "next/head";
import NavBar from "~/components/NavBar/NavBar";
import {useRouter} from "next/router";
import Products from "~/components/Products/Products";
import Cart from "~/pages/cart";
import Layout from "~/components/Layout/Layout";

const Home: NextPage = () => {

    const router = useRouter();

    return (
        <Layout title="Home">
            <Products/>
        </Layout>
    );
};

export default Home;
