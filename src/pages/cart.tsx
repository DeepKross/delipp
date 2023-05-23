import {useCartStore} from "~/store/useCartStore";
import {ProductType} from "~/components/Products";
import NavBar from "~/components/NavBar/NavBar";

export default function Cart( ){
    const { products, addProduct } = useCartStore();

    return (
        <div>
            <NavBar/>
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