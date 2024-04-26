"use client"
import {createAsyncThunk} from "@reduxjs/toolkit";
import {instance} from "@/api/axiosInstance";
import Cookies from "js-cookie";

export interface FetchProductsParams {
    pageNumber?: number | null
    pageSize?: number | null
    itemCategory?: string | null
    userEmail?: string
}
export const getProducts = createAsyncThunk<any, FetchProductsParams>("product/getProducts", async ({ pageNumber, pageSize, itemCategory}, { rejectWithValue }) => {
    try {
        const params: FetchProductsParams = {};
        if (pageNumber) params.pageNumber = pageNumber;
        if (pageSize) params.pageSize = pageSize;
        if (itemCategory) params.itemCategory = itemCategory;
        const response = await instance.get("/Items", {params});
        return response.data;
    } catch (error) {
        console.error("Error while checking authentication:", error);
    }
});

export const getOrders = createAsyncThunk<any, FetchProductsParams>("orders/getOrders", async ({ pageNumber, pageSize, userEmail}, { rejectWithValue }) => {
    try {
        const params: FetchProductsParams = {};
        if (pageNumber) params.pageNumber = pageNumber;
        if (pageSize) params.pageSize = pageSize;
        const response = await instance.get(`/Orders/user/${userEmail}`, {params});
        return response.data;
    } catch (error) {
        console.error("Error while checking authentication:", error);
    }
});


export const getProductsCount = async ({ pageNumber, pageSize, itemCategory}: FetchProductsParams) => {
    try {
        const params: FetchProductsParams = {};
        if (pageNumber) params.pageNumber = pageNumber;
        if (pageSize) params.pageSize = pageSize;
        if (itemCategory) params.itemCategory = itemCategory;
        const response = await instance.get("/Items", {params});

        return response.data;
    } catch (error) {
        console.error("Error while checking authentication:", error);
    }

}





export const getOneProduct = async (id: string | undefined) => {
    try {
        const response = await instance.get("/Items/" + id);
        return response;
    } catch (error: any) {
        return error.response.data.message;
    }
};