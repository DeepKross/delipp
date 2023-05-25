import {useState} from "react";
import {api} from "~/utils/api";
import {DefaultSkeleton, ListSkeleton} from "~/components/Skeletons/Skeletons";
import {type inferRouterOutputs} from "@trpc/server";
import {AppRouter} from "~/server/api/root";
import CardComponent from "~/components/Products/CardComponent/CardComponent";
import useCartStore from "~/store/useCartStore";
import {useUser} from "@clerk/nextjs";


type RouterOutput = inferRouterOutputs<AppRouter>;

export type ProductType = RouterOutput["products"]["getAll"][0];


const Products = () => {
    const [selectedShop, setSelectedShop] = useState("");
    const products = api.products.getByShop.useQuery({shopId: selectedShop});
    const shops = api.products.getShops.useQuery();
    const {shopId} = useCartStore();
    const {user} = useUser();

    if (shops.isLoading) return (<DefaultSkeleton/>);
    if (shops.isError) return <div>Error: {shops.error.message}</div>;

    //console.log(selectedShop);

    return (
        <main className="flex justify-center h-screen">
            <div className="w-full  md:max-w-4xl">
                <div className="flex justify-center">
                    <h1 className="content-center text-3xl md:text-6xl font-bold text-transparent bg-clip-text
                         bg-gradient-to-r from-purple-500 to-pink-500">DELIPP</h1>
                </div>
                <div
                    className="text-lg m-8 leading-relaxed text-center text-yellow-600 px-4 md:px-8 lg:px-16 bg-clip-text ">
                    Hello <span className={"italic font-bold text-emerald-400" +
                    ""}>{user?.username}</span>. <p>This is your favourite delivery company that has a great site but
                    does not deliver anything). We keep partnership with several shops like: <span
                        className={"italic text-emerald-400"}>
                        FirstShop </span> and <span className={"italic text-emerald-400"}> SecondShop</span>.
                    You can select a shop and see what products they have. You can add products to cart and then place
                    an order.
                    You can see that SecondShop does not have any products yet. It is made for you to see how it looks
                    like
                    when there is any error.</p> <p> You can also see that there is a skeleton loader when data is
                    loading.
                    You can not order from different shops at the same time. After adding any product to the cart, the
                    cart
                    stays even if you decided to leave and come back later. Don`t forget to fill the form before placing
                    an order
                    . Your orders are kept safely in database and maybe some day your clock for 0$ will come to you
                    (Don`t loose hope).</p>
                    <p>Everything is done for you convenience. <span className={"font-bold"}>Enjoy!</span>
                    </p>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="countries"
                           className="block mb-2 text-xl p-4 font-medium text-gray-900 dark:text-white">Select
                        an option</label>

                    <select
                        value={selectedShop}
                        onChange={event => setSelectedShop(event.target.value)}
                        className="bg-gray-50 m-4 border border-gray-300 text-gray-900 text-lg  rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option value="" disabled={true}>Select a shop...</option>

                        {(shopId === null) && shops.data.map(shop => (
                            <option key={shop.id} value={shop.id}>
                                {shop.name}
                            </option>
                        ))}

                        {(shopId !== null) && //render option with id of shopId
                            <option key={shopId} value={shopId}>
                                {shops.data.find(shop => shop.id === shopId)?.name}
                            </option>}
                    </select>

                    {products.isFetching && <ListSkeleton/>}
                    {products.isLoading && <ListSkeleton/>}
                    {products.isError && <div>Error occured</div>}

                    {products.data && products.data.length === 0 &&
                        <div
                            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                            role="alert">
                            <span className="font-medium">Danger alert!</span> Change a few things up and try submitting
                            again.
                        </div>}

                    <div className="flex flex-col">
                        {products && products.data?.map((product) => (
                            <div key={product.id}
                                 className="flex flex-col items-center p-4 m-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                                <CardComponent key={product.id}
                                               product={product} shopId={selectedShop}
                                />
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </main>

    )
        ;
}

export default Products;