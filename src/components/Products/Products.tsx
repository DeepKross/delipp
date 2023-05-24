import {useState} from "react";
import {api} from "~/utils/api";
import {DefaultSkeleton, ListSkeleton} from "~/components/Skeletons/Skeletons";
import {type inferRouterOutputs} from "@trpc/server";
import {AppRouter} from "~/server/api/root";
import CardComponent from "~/components/Products/CardComponent/CardComponent";


type RouterOutput = inferRouterOutputs<AppRouter>;

export type ProductType = RouterOutput["products"]["getAll"][0];

const Products = () => {
    const [selectedShop, setSelectedShop] = useState("");
    const products = api.products.getByShop.useQuery({shopId: selectedShop});
    const shops = api.products.getShops.useQuery();

    if (shops.isLoading) return (<DefaultSkeleton/>);
    if (shops.isError) return <div>Error: {shops.error.message}</div>;

    return (
        <main className="flex justify-center h-screen">
            <div className="w-full  md:max-w-4xl md:border-x-2 ">
                <div className="flex justify-center">
                    <h1 className="content-center text-3xl md:text-6xl font-bold text-transparent bg-clip-text
                         bg-gradient-to-r from-purple-500 to-pink-500">Delipp</h1>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="countries" className="block mb-2 text-xl p-4 font-medium text-gray-900 dark:text-white">Select
                        an option</label>

                    <select
                        value={selectedShop}
                        onChange={event => setSelectedShop(event.target.value)}
                        className="bg-gray-50 m-4 border border-gray-300 text-gray-900 text-lg  rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option value="">Select a shop</option>
                        {shops.data.map(shop => (
                            <option key={shop.id} value={shop.id}>
                                {shop.name}
                            </option>
                        ))}
                    </select>

                    {products.isFetching && <ListSkeleton/>}
                    {products.isLoading && <ListSkeleton/>}
                    {products.isError && <div>Error occured</div> }

                    {products.data && products.data.length === 0 &&
                        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                             role="alert">
                            <span className="font-medium">Danger alert!</span> Change a few things up and try submitting again.
                        </div>}

                    <div className="flex flex-col">
                        {products && products.data?.map((product) => (
                            <CardComponent key={product.id}
                                product={product}
                            />
                        ))}
                    </div>

                </div>
            </div>
        </main>

    );
}

export default Products;