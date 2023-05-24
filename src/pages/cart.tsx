import NavBar from '~/components/NavBar/NavBar';
import useCartStore from "~/store/useCartStore";
import CardComponent from "~/components/Products/CardComponent/CardComponent";
import React from "react";
import {ProductType} from "~/components/Products/Products";
import {api} from "~/utils/api";
import {useUser} from "@clerk/nextjs";

const Cart = () => {
    const {cartItems, removeItem, clearCart} = useCartStore();

    const {mutate} = api.orders.create.useMutation();

    const handleDeleteFromCart = (product: ProductType) => {
        removeItem(product);
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
        clearCart();
        setEmail('');
        setPhone('');
        setAddress('');
    }

    const [email, setEmail] = React.useState('')
    const [phone, setPhone] = React.useState('')
    const [address, setAddress] = React.useState('')

    return (
        <div>
            <NavBar/>
            <h2>Cart</h2>
            <div>
                <h3>User Info</h3>
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}

                />
                <input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>

            <h3>Cart Items</h3>
            {cartItems && cartItems.map((item) => (
                <div key={item.product.id}>
                    <CardComponent product={item.product} shopId={`noChangeRequired`}/>
                    <div>Number of orders - {item.quantity}</div>
                    <button
                        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        onClick={(e) => handleDeleteFromCart(item.product)}>Remove one
                    </button>
                </div>
            ))}

            {cartItems.length === 0 && <div>Cart is empty</div>}
            {cartItems.length !== 0 && <button
                className="m-8 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                onClick={(e) => handleOrderPlaced()}>Place Order
            </button>
            }
        </div>
    );
}

export default Cart;