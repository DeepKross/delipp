import React from "react";
import GoogleMapReact from 'google-map-react';
import {api} from "~/utils/api";
import {inferRouterOutputs} from "@trpc/server";
import {AppRouter} from "~/server/api/root";

interface AnyReactComponentProps{
    text: string;
    lng: number;
    lat: number;
}

type RouterOutput = inferRouterOutputs<AppRouter>;
export type ShopType = RouterOutput["products"]["getShops"][0];



const MarkerComponent = ({ text }: AnyReactComponentProps) =>  <div className="relative">
    <div className="w-8 h-8 bg-blue-500 rounded-full border border-white shadow-md transform -translate-x-1/2 -translate-y-1/2">
        <div className="absolute inset-0 flex items-center justify-center text-amber-950 font-bold text-sm">
            {text}
        </div>
    </div>
    <div className="w-4 h-4 bg-blue-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
</div>;

export default function SimpleMap(){
    const defaultProps = {
        center: {
            lat: 50.450001,
            lng: 30.523333
        },
        zoom: 11
    };

    const shops = api.products.getShops.useQuery();

    return (
        <div style={{ height: '40vh', width: '40vw' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "" }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >

                {
                    shops.data?.map((shop: ShopType) => (
                        <MarkerComponent
                            lat={shop.latitude}
                            lng={shop.longitude}
                            text={shop.name}
                        />
                    ))
                }
            </GoogleMapReact>
        </div>
    );
}