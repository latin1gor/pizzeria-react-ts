import {FetchProductsParams} from "@/store/services/productService";
import {instance} from "@/api/axiosInstance";
import {DateValue} from "@internationalized/date";

export interface IStatisticParams {
    dateStart?: string | DateValue,
    dateEnd?: string | DateValue
}

export interface IGet extends IStatisticParams {
    date?: string
    itemCategory?: "Pizza" | "Hotdog" | "Fries" | "Burger"
    uri: string
    entity: string
}
export const getStaffPayroll = async ({dateStart, dateEnd}: IStatisticParams) => {
    console.log(dateStart, dateEnd)
    try {
        const params: IStatisticParams = {}
        if (dateStart) params.dateStart = dateStart
        if (dateEnd) params.dateEnd = dateEnd
        const response = await instance.get("/Statistics/GetStaffPayroll", {params}  );
        return response.data;
    } catch (error) {
        console.error("Error while checking authentication:", error);
    }
}
export const getStatistics = async ({date, dateStart, dateEnd, uri, entity, itemCategory}: IGet) => {
    console.log(dateStart, dateEnd)
    try {
        const params: any = {}
        if (dateStart) params.dateStart = dateStart
        if (dateEnd) params.dateEnd = dateEnd
        if (itemCategory) params.itemCategory = itemCategory
        if (date) params.date = date
        const response = await instance.get(`/Statistics/${uri}/${entity}`, {params}  );
        return response.data;
    } catch (error) {
        console.error("Error while checking authentication:", error);
    }
}

