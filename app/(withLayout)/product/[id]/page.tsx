"use client"
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {IProduct} from "@/store/features/product/productSlice";
import {getOneProduct} from "@/store/services/productService";
import {FaApple} from "react-icons/fa";
import {Image} from "@nextui-org/image";
import {Button} from "@nextui-org/button";
import {Table, TableBody, TableCell, TableHeader, TableRow} from "@nextui-org/table";

interface Props {
    params: {
        id: string
    }
}

export default function ProductPage({params: {id}}: Props) {
    const router = useRouter()

    const [product, setProduct] = useState<IProduct | null>(null);
    console.log(product);
    useEffect(() => {
        const getProduct = async () => {
            const response = await getOneProduct(id);
            return response.data;
        };

        getProduct().then((data) => setProduct(data));
    }, [id]);

    return (
        <>
            {product && (
                <div
                    className={
                        "mx-24 mt-28 mb-20  pr-10 border-4 border-orange-300 flex flex-col rounded-2xl"
                    }
                >
                    <div className={"flex w-full justify-between"}>
                        <Image
                            className={"w-[500px] h-[500px] rounded-t-lg rounded-b-none object-cover rounded-2xl pr-8"}
                            src={process.env.NEXT_PUBLIC_API_URL + "/" + product.imagePath}
                            alt={"image"}
                        />
                        <div className={"flex flex-col justify-around w-[55%]"}>
                            <div className={"flex flex-col space-y-3"}>
                                <h1 className={"text-4xl font-bold"}>{product.itemName}</h1>

                                <h2 className={"text-4xl font-bold"}>{product.itemPrice + "$"} </h2>
                                <div>Size: ................... {product.itemSize} </div>
                                <div>Category: ........... {product.recipeId} </div>
                            </div>

                            <div className={"flex flex-col w-[40%]"}>
                                <div className={"flex space-x-3"}>
                                    <div className={"flex flex-grow space-x-3"}>
                                        <Button
                                            className={
                                                " transition duration-300 ease-in-out flex-grow"
                                            }
                                        >
                                            Buy now
                                        </Button>
                                        <Button variant={"solid"} className={"flex-grow"}>
                                            Add to bag
                                        </Button>
                                    </div>
                                </div>
                                <div className={"flex mt-2"}>
                                    <Button
                                        className={
                                            "bg-gray-100 text-black hover:bg-gray-200 transition duration-300 flex items-center justify-center flex-grow"
                                        }
                                    >
                                        <FaApple className={"text-xl"}/> <span>Pay</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            )}
        </>
    );
};