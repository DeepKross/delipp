import {ProductType} from "~/components/Products/Products";
import useCartStore from "~/store/useCartStore";


interface CardComponentProps {
    product: ProductType;
}

const CardComponent = (props: CardComponentProps) => {

    const {addItem} = useCartStore();
    const handleAddToCart = (product: ProductType) => {
        addItem(product);
    };

    const product = props.product;

    return (
        <>
            <div
                 className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a>
                    <img className="p-8 rounded-t-lg" src={product.image} alt="product image"/>
                </a>
                <div className="px-5 pb-5">
                    <a>
                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
                    </a>
                    <p className="text-gray-700 dark:text-gray-300">{product.description}</p>
                    <div className="flex items-center mt-2.5 mb-5">
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">${product.price}</span>
                        <button
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={(e) => handleAddToCart(product)}>Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardComponent;