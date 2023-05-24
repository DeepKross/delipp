import Link from "next/link";
import UserWizard from "~/components/NavBar/UserWizard";

const NavBar = () => {
    return(
        <>

            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link href={`/`} className="flex items-center">
                        <img src="https://www.ikea.com/images/pictogram-of-a-parcel-and-a-truck-6086b2d89492fe83cb3c8c20b1657f31.jpg?f=s" className="h-8 mr-3" alt="Flowbite Logo"/>
                        <span
                            className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Delipp</span>
                    </Link>

                    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <Link href={`/`}
                                   className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                                   aria-current="page">Home</Link>
                            </li>
                            <li>
                                <Link href={`/cart`}
                                   className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                                >Shopping Cart</Link>
                            </li>
                        </ul>
                    </div>

                    <UserWizard/>
                </div>
            </nav>

        </>
    )
}

export default NavBar;