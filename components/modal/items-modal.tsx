"use client"
import React, {ChangeEvent, useEffect, useState} from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input,
    Tooltip, Chip, Select, SelectItem, TimeInput
} from "@nextui-org/react";

import {EditIcon} from "@nextui-org/shared-icons";
import {useAppDispatch, useAppSelector} from "@/hooks/useStore";
import {getIngredients, postItem, postRecipe, updateItem} from "@/store/services/customerService";
import {CgAdd} from "react-icons/cg";
import {getProducts} from "@/store/services/productService";
import {Divider} from "@nextui-org/divider";
import {TimeValue} from "@react-types/datepicker";

interface ItemsModalProps {
    ItemName?: string
    ItemCategory?: string
    ItemSize?: string
    ItemPrice?: string
    isPost?: boolean
    ItemId?: string
    RecipeId?: string
    ImagePath?: string
}

interface Iingredients {
    ingredientId: string,
    ingredientName: string,
    ingredientWeightMeasure: string,
    ingredientPrice: number,
    quantityInStock: number
}
export default function ItemsModal({ItemName, ItemCategory, ItemSize, ItemPrice, RecipeId, isPost, ItemId, ImagePath}: ItemsModalProps) {
    const dispatch = useAppDispatch()
    const {activePage, limit} = useAppSelector(state => state.product)

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const [name, setName] = useState<string>(ItemName || '')
    const [category, setCategory] = useState<string>(ItemCategory || '')
    const [size, setSize] = useState<string>(ItemSize || '')
    const [price, setPrice] = useState<string>(ItemPrice || '')
    const [recipe, setRecipe] = useState<string>(RecipeId || '')
    const [createdRecipe, setCreatedRecipe] = useState<string | null>(null)
    const [recipeName, setRecipeName] = useState<string>("")
    const [image, setImage] = useState<Blob | string>( ImagePath || '')
    const [ingredients, setIngredients] = useState<Iingredients[] | null>(null)
    const [time, setTime] = useState<TimeValue>()
    const [values, setValues] = React.useState<Selection>(new Set([]));

    const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setValues(new Set(e.target.value.split(",")));
    };
    useEffect(() => {
        getIngredients().then((res) => setIngredients(res))
    }, []);


    function formatTime(time: TimeValue) {
        if (time) {
            const { hour, minute, second } = time;
            const formattedHour = String(hour).padStart(2, '0');
            const formattedMinute = String(minute).padStart(2, '0');
            const formattedSecond = String(second).padStart(2, '0');
            return `${formattedHour}:${formattedMinute}:${formattedSecond}`;
        }

    }


    const changeItems = async () => {
            const formData = new FormData()
            formData.append("ItemName", name)
            formData.append("ItemCategory", category)
            formData.append("ItemSize", size)
            formData.append("ItemPrice", price.replace(".", ","))
            formData.append("Image", image)
            formData.append("RecipeId", createdRecipe ? createdRecipe : recipe)

            if (!isPost) {

                updateItem(ItemId, formData).then(() => {
                    dispatch(
                        getProducts({pageNumber: activePage, pageSize: limit, itemCategory: ItemCategory}),
                    );
                })
            } else {
                postItem(formData).then(() => {
                    dispatch(
                        getProducts({pageNumber: activePage, pageSize: limit, itemCategory: category})
                    )
                })
            }
    }

    const selectFile = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files;
        if (!file) return;
        setImage(file[0]);
    };

    const createRecipe = async () => {
        const payload = {
            recipeName: recipeName,
            cookingTime: time ? formatTime(time) : "00:30:00",
            recipeIngredients: Array.from(values).map(ingredient => ({
                ingredientId: ingredient,
                ingredientWeight: 30
            }))
        };
        postRecipe(payload).then((res) => res && setCreatedRecipe(res.data.recipeId))
    }
    console.log(values)

    // @ts-ignore
    return (
        <>
            {isPost ?
                <Tooltip content="Add item">
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={onOpen}>
                <CgAdd color={"gray"} className={"cursor-pointer"} />
              </span>
                </Tooltip>

                :

                <Tooltip content="Edit item">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={onOpen}>
                <EditIcon/>
              </span>
                </Tooltip>
            }


            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{isPost ? <div>Add </div> : <div>Update </div>} </ModalHeader>
                            <ModalBody>
                                <Input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    defaultValue={ItemName}
                                    autoFocus
                                    label="Name"
                                    placeholder="Enter item's name"
                                    variant="bordered"

                                />


                                    <Input
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        defaultValue={ItemCategory}
                                        label="Category"
                                        placeholder="Enter item's category"
                                        variant="bordered"
                                    />

                                    <Input
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        defaultValue={ItemPrice}
                                        label="Price"
                                        placeholder="Enter price"
                                        variant="bordered"
                                    />
                                {isPost && <Input
                                    className={"pt-3"}
                                    type={"file"}
                                    onChange={selectFile}
                                    variant="bordered"
                                /> }

                                {isPost && <div className={" rounded-md  p-4"}
                                >
                                    <Divider className={"my-4"}/>
                                    <h2 className={"text-center "}>Create recipe</h2> <Input
                                    value={recipeName}
                                    onChange={(e) => setRecipeName(e.target.value)}
                                    label="Recipe name"
                                    placeholder="Enter recipe name"
                                    variant="bordered"
                                    disabled={!!createdRecipe}

                                />
                                    {ingredients ?  <div className="flex w-full max-w-xs flex-col gap-2">
                                        <Select
                                            label="Favorite Animal"
                                            selectionMode="multiple"
                                            placeholder="Select an animal"
                                            selectedKeys={values}
                                            className="max-w-xs"
                                            onChange={handleSelectionChange}
                                        >
                                            {ingredients.map((i) => (
                                                <SelectItem key={i.ingredientId} value={i.ingredientName}>
                                                    {i.ingredientName}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                        <p className="text-small text-default-500">Selected: {Array.from(values).join(", ")}</p>
                                    </div>      : <div className={"py-4"}>Loading ingredients...</div>}
                                    <TimeInput    className={"pb-3"} value={time} onChange={setTime}  label="Cooking time"


                                    />
                                    {!createdRecipe && <Button isDisabled={!ingredients && !recipeName.length} color={"primary"} onClick={createRecipe}>Create recipe</Button>}
                                    <Divider className={"my-4"}/>

                                </div>}



                                <Input
                                    value={size}
                                    onChange={(e) => setSize(e.target.value)}
                                    defaultValue={ItemSize}
                                    label="Size"
                                    placeholder="Enter size"
                                    variant="bordered"
                                />

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="secondary" onPress={() => {
                                    onClose()
                                    changeItems()
                                }}>
                                    Save changes
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
