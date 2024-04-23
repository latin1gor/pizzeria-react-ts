import {createAsyncThunk} from "@reduxjs/toolkit";
import {instance} from "@/api/axiosInstance";
import Cookies from "js-cookie";
import {FetchProductsParams} from "@/store/services/productService";

export const getCustomers = createAsyncThunk<any, FetchProductsParams>("customer/getCustomers", async ({ pageNumber, pageSize}) => {
    try {
        const params: FetchProductsParams = {};
        if (pageNumber) params.pageNumber = pageNumber;
        if (pageSize) params.pageSize = pageSize;
        const response = await instance.get("/Customers", {params});
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error("Error while checking authentication:", error);
    }
});


export const getCustomerCount = async ({ pageNumber, pageSize, itemCategory}: FetchProductsParams) => {
    try {
        const params: FetchProductsParams = {};
        if (pageNumber) params.pageNumber = pageNumber;
        if (pageSize) params.pageSize = pageSize;
        const response = await instance.get("/Customers", {params});

        return response.data;
    } catch (error) {
        console.error("Error while checking authentication:", error);
    }
}


export const deleteCustomer = async (id: string) => {
    try {
        await instance.delete(`/Customers/${id}`);
    } catch (error) {
        console.error("Error while checking authentication:", error);
    }
}
export const deleteItem = async (id: string) => {
    console.log(id)
    try {
        await instance.delete(`/Items/${id}`);
    } catch (error) {
        console.error("Error while checking authentication:", error);
    }
}


export const updateCustomer = async (customerId: string | undefined, firstName: string, lastName: string, phoneNumber: string) => {
    try {
        await instance.put(`/Customers/${customerId}`, { firstName, lastName, phoneNumber})


    } catch (error) {
        console.error("Error while checking authentication:", error);
    }
}

export const updateItem = async (id: string | undefined, data: FormData) => {
    try {
        await instance.put(`/Items/${id}`, data)


    } catch (error) {
        console.error("Error while checking authentication:", error);
    }
}

export const postItem = async (data: FormData) => {
    console.log(data)
    try {
        await instance.post("/Items", data)


    } catch (error) {
        console.error("Error while checking authentication:", error);
    }
}


export const postCustomer = async (firstName: string, lastName: string, phoneNumber: string, email: string, password: string ) => {
    try {

        await instance.post(`/Customers`, {firstName, lastName, phoneNumber, email, password})


    } catch (error) {
        console.error("Error while checking authentication:", error);
    }
}


export const postRecipe = async (recipeName: string) => {
    try {
        const res = await instance.post("/Recipes", {recipeName, cookingTime: "00:30:00", recipeIngredients: [{ingredientId: '18deeee7-756d-42f6-9f76-a52fe810de89', ingredientWeight: "30"}]})
        return res
    } catch (e){
        console.log(e)
    }
}



