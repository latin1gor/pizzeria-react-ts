"use client"
import { FC } from "react";
import {IProduct} from "@/store/features/product/productSlice";
import {useRouter} from "next/navigation";
import {Image} from "@nextui-org/image";

const ProductItem: FC<{ product: IProduct }> = ({ product }) => {
    const router = useRouter()
    return (
        <div
            className={
                "flex flex-col items-center justify-between h-72 w-full text-center border-2 border-stone-300 rounded-xl cursor-pointer hover:bg-stone-200 transition duration-300 ease-in-out"
            }
        >
            <div
                className={
                    "flex flex-col items-center text-center justify-between h-full w-full"
                }
                onClick={() => {
                    router.push(`/product/${product.itemId}`);
                }}
            >
                <Image
                    src={process.env.NEXT_PUBLIC_API_URL + "/" + product.imagePath}
                    className={"h-44 w-full rounded-t-lg rounded-b-none"}
                />
                <h2 className={"font-bold w-full px-2 text-sm text-center pb-3"}>
                    {product.itemName}
                </h2>
            </div>
            <div className={"w-full px-2 "}>
                <div className={"flex items-center justify-between px-2"}>
                    <h3 className={"pb-1 font-bold"}>{product.itemPrice + "$"}</h3>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;
