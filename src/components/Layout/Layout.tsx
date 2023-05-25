import React, { ReactNode } from 'react';
import Head from 'next/head';
import NavBar from "~/components/NavBar/NavBar";

type Props = {
    children: ReactNode;
    title: string;
};

const Layout = ({ children, title }: Props) => {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <NavBar/>
            <main>{children}</main>

        </div>
    );
};

export default Layout;