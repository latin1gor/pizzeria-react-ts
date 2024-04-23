"use client"
import React, {ChangeEvent, useState} from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input,
    Tooltip
} from "@nextui-org/react";
import {EditIcon} from "@nextui-org/shared-icons";
import {useAppDispatch, useAppSelector} from "@/hooks/useStore";
import {postItem, postRecipe, updateItem} from "@/store/services/customerService";
import {CgAdd} from "react-icons/cg";
import {getProducts} from "@/store/services/productService";

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
        postRecipe(recipeName).then((res) => res && setCreatedRecipe(res.data.recipeId))
    }

    console.log(image)
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
                                    type={"file"}
                                    onChange={selectFile}
                                    variant="bordered"
                                /> }

                                {isPost && <> <Input
                                    value={recipeName}
                                    onChange={(e) => setRecipeName(e.target.value)}
                                    label="Recipe name"
                                    placeholder="Enter recipe name"
                                    variant="bordered"
                                    disabled={!!createdRecipe}

                                />
                                    {!createdRecipe && <Button onClick={createRecipe}>Create recipe</Button> }
                                </>}



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
