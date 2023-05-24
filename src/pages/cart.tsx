import NavBar from '~/components/NavBar/NavBar';
import useCartStore from "~/store/useCartStore";
import CardComponent from "~/components/Products/CardComponent/CardComponent";
import React from "react";
import {ProductType} from "~/components/Products/Products";
import {api} from "~/utils/api";

const Cart = () => {
    const {user, cartItems, removeItem} = useCartStore();

    const {mutate} = api.orders.create.useMutation();

    const handleDeleteFromCart = (product: ProductType) => {
        removeItem(product);
    }

    const handleOrderPlaced = () => {

        mutate(
            {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                items: cartItems.map((item) => ({
                    productId: item.product.id,
                    quantity: item.quantity
                }))
            }
        )
    }


    console.log(cartItems)

    return (
        <div>
            <NavBar/>
            <h2>Cart</h2>
            <div>
                <h3>User Info</h3>
                <input
                    type="text"
                    placeholder="Email"
                    value={user.email}
                    //onChange={handleEmailChange}
                />
                <input
                    type="text"
                    placeholder="Phone"
                    value={user.phone}

                />
                <input
                    type="text"
                    placeholder="Address"
                    value={user.address}

                />
            </div>

            <h3>Cart Items</h3>
            {cartItems && cartItems.map((item) => (
                <div key={item.product.id}>
                    <CardComponent product={item.product}/>
                    <div>Number of orders - {item.quantity}</div>
                    <button
                        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        onClick={(e) => handleDeleteFromCart(item.product)}>Remove one
                    </button>
                </div>
            ))}

            <button
                className="m-8 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                onClick={(e) => handleOrderPlaced()}>Place Order
            </button>
        </div>
    );
}

export default Cart;