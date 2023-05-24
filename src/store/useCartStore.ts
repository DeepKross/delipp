import {create} from 'zustand';
import {ProductType} from "~/components/Products/Products";
import {immer} from "zustand/middleware/immer";
import {persist} from "zustand/middleware";

export interface UserType {
    name: string;
    email: string;
    phone: string;
    address: string;
}

// Defining the store state
interface CartState {
    user: UserType;
    shopId: string | null;
    cartItems: {
        product: ProductType;
        quantity: number;
    }[],
    //updateUser: (userUpdate: UserType) => void,
    addItem: (productItem: ProductType, shopId: string) => void,
    removeItem: (productItem: ProductType) => void,
    clearCart: () => void,
}


/*const user = useUser();

let fullName = user.user?.fullName;

if(!fullName){
    fullName = "Invalid Username while authorization"
}*/

// Store creator function
const useCartStore = create<CartState>()(
    persist(immer(
            (set) => ({
                user: {
                    name: '',
                    email: '',
                    phone: '',
                    address: '',
                },
                cartItems: [],
                shopId: null,
                addItem: (productItem: ProductType, shopId: string) =>
                    set((state) => {
                        const existingItem = state.cartItems.find(
                            (item) => item.product.id === productItem.id
                        );

                        if (existingItem) {
                            existingItem.quantity += 1;
                        } else {
                            state.cartItems.push({
                                product: productItem,
                                quantity: 1,
                            });
                            if(shopId !== `noChangeRequired`)
                            {
                                state.shopId = shopId;
                            }
                        }
                    }),
                removeItem: (productItem: ProductType) =>
                    set((state) => {
                        const existingItem = state.cartItems.find(
                            (item) => item.product.id === productItem.id
                        );

                        if (!existingItem) {
                            return;
                        }

                        if (existingItem.quantity === 1) {
                            state.cartItems = state.cartItems.filter((item) => item.product.id !== productItem.id);
                        } else {
                            existingItem.quantity -= 1;
                        }
                        if(state.cartItems.length === 0){
                            state.shopId = null;
                        }
                    }),
                clearCart: () =>
                    set((state) => {
                        state.cartItems = [];
                        state.shopId = null;
                    }),
            })),
        {
            name: 'CartStore',
            version: 1
        }
    ));


export default useCartStore;
