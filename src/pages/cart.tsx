import NavBar from '~/components/NavBar/NavBar';
import useCartStore from "~/store/useCartStore";
import CardComponent from "~/components/Products/CardComponent/CardComponent";
import React from "react";
import {ProductType} from "~/components/Products/Products";
import {api} from "~/utils/api";
import {useUser} from "@clerk/nextjs";
import SimpleMap from "~/components/Map";
import Layout from "~/components/Layout/Layout";
import toast from "react-hot-toast";

const Cart = () => {
    const {cartItems, removeItem, clearCart} = useCartStore();

    const {mutate, isLoading, isError} = api.orders.create.useMutation({
        onSuccess: () => {
            clearCart();
            setEmail('');
            setPhone('');
            setAddress('');
            toast.success("Order placed successfully")
        },
        onError: (error) => {
            console.log(error);
        }
    });

    const handleDeleteFromCart = (product: ProductType) => {
        removeItem(product);
        toast.error("Item removed from cart")
    }

    const user = useUser();

    let fullName = user.user?.fullName;

    if (!fullName) {
        fullName = "User name not found"
    }

    const handleOrderPlaced = () => {
        mutate(
            {
                name: fullName as string,
                email: email,
                phone: phone,
                address: address,
                items: cartItems.map((item) => ({
                    productId: item.product.id,
                    quantity: item.quantity
                }))
            }
        )

    }

    const [email, setEmail] = React.useState('')
    const [phone, setPhone] = React.useState('')
    const [address, setAddress] = React.useState('')

    return (
        <Layout title="Cart">
        <div className="flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
            <SimpleMap/>

            <h1 className="m-4 mt-14 text-5xl md:text-6xl lg:text-7xl font-extrabold text-center text-blue-600 dark:text-blue-400">Cart</h1>

            <div className="m-4 p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white">User Info</h3>

                <label htmlFor="input-group-1" className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Your
                    Email</label>

                <div className="relative m-4">

                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor"
                             viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                        </svg>
                    </div>

                    <input type="email" id="input-group-1"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="example@gmail.com"/>
                </div>

                <div className="mb-6">

                    <label htmlFor="input-group-1" className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Phone
                        Number</label>

                    <input type="text" id="default-input"
                           placeholder="Phone ex. 0971234567"
                           value={phone}
                           minLength={10}
                           onChange={(e) => setPhone(e.target.value)}
                           className="m-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </div>

                <div className="mb-6">

                    <label htmlFor="input-group-1"
                           className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Address</label>

                    <input type="text" id="default-input"
                           placeholder="Address"
                           value={address}
                           minLength={1}
                           onChange={(e) => setAddress(e.target.value)}
                           className=" m-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </div>

            </div>

            <h3 className="m-4 text-2xl font-bold text-center text-gray-800 dark:text-white">Cart Items</h3>
            {cartItems && cartItems.map((item) => (
                <div key={item.product.id}
                     className="flex flex-col items-center p-4 m-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <CardComponent product={item.product} shopId={`noChangeRequired`}/>
                    <div className="mt-4 text-xl font-bold text-gray-900 dark:text-white">Number of orders
                        - {item.quantity}</div>
                    <button
                        className="mt-4 bg-red-700 hover:bg-red-800 focus:ring-red-300 focus:outline-none text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        onClick={(e) => handleDeleteFromCart(item.product)}>Remove one
                    </button>
                </div>
            ))}

            {cartItems.length === 0 &&
                <div className="m-4 text-xl font-medium text-gray-800 dark:text-white">Cart is empty</div>}
            {isError &&
                <div className="m-4 text-xl font-medium text-red-800 dark:text-red-600">Please be sure form is completed
                    correctly.</div>}
            {cartItems.length !== 0 && <button disabled={isLoading}
                                               className="m-8 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                               onClick={(e) => handleOrderPlaced()}>Place Order</button>}
        </div>
        </Layout>
    );
}

export default Cart;