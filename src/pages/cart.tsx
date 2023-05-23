import {useCartStore} from "~/store/useCartStore";
import {ProductType} from "~/components/Products";

export default function Cart( ){
    const { products, addProduct, removeProduct, removeAllProducts } = useCartStore();

    return (
        <div>
            <button onClick={() => {
                let tmp: ProductType = {
                    // add new random product
                    id: "negr",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    price: 1,
                    name: 'zalupa',
                    description: "pnh",
                    image: "osloeb.png",
                    shopId: "pidar"
                }

                addProduct(tmp)
            }}>
                Add random product
            </button>
            <pre>{JSON.stringify(products, null, 2)}</pre>
        </div>
    )
}