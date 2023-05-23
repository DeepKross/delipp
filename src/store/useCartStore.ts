import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {ProductType} from "~/components/Products";


// Defining the store state
interface CartState {
    products: ProductType[];
    addProduct: (product: ProductType) => void;
    removeProduct: (productId: string) => void;
    removeAllProducts: () => void;
}

// Store creator function
const createStore = (set: any) => ({
    products: [],
    addProduct: (product: ProductType) => set((state: CartState) => ({ products: [...state.products, product] })),
    removeProduct: (productId: string) => set((state: CartState) => ({ products: state.products.filter((product) => product.id !== productId) })),
    removeAllProducts: () => set({ products: [] }),
})

// Using Zustand and middleware to create a persistent store
export const useCartStore = create<CartState>(

        createStore,


);
