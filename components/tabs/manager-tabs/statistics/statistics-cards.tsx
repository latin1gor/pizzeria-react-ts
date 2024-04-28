
import React, {useEffect, useState} from 'react';
import StatisticCard from "@/components/tabs/manager-tabs/statistics/statistics-card";
import {useAppDispatch} from "@/hooks/useStore";
import {getMonthSoldProductsCount} from "@/store/services/productService";
import {setTotalCount} from "@/store/features/product/productSlice";

const StatisticsCards = () => {
    const dispatch = useAppDispatch()
    const [burger, setBurger] = useState<number>(0)
    const [hotdog, setHotdog] = useState<number>(0)
    const [fries, setFries] = useState<number>(0)
    const [pizza, setPizza] = useState<number>(0)

    useEffect(() => {


        const getPizzaCounter = async () => {
            const res = await getMonthSoldProductsCount({dateStart: getDateOneMonthAgo(), dateEnd:  getCurrentDate(), itemCategory: "Pizza"})

            if(res) setPizza(res)
        }
        const getBurgerCounter = async () => {
            const res = await getMonthSoldProductsCount({dateStart:  getDateOneMonthAgo(), dateEnd: getCurrentDate(), itemCategory: "Burger"})
                
            if(res) setBurger(res)
        }
        const getHotdogCounter = async () => {
            const res = await getMonthSoldProductsCount({dateStart: getDateOneMonthAgo(), dateEnd:  getCurrentDate(), itemCategory: "Hotdog"})
            
            if(res) setHotdog(res)
        }
        const getFriesCounter = async () => {
            const res = await getMonthSoldProductsCount({dateStart: getDateOneMonthAgo(), dateEnd:  getCurrentDate(), itemCategory: "Fries"})
            
            if(res)setFries(res)
        }

        getBurgerCounter()
        getPizzaCounter()
        getHotdogCounter()
        getFriesCounter()

    }, []);
    return (
        <div className={"flex items-center justify-center gap-10"}>
            <StatisticCard name={"Burgers"} quantity={burger} />
            <StatisticCard name={"Hotdogs"} quantity={hotdog} />
            <StatisticCard name={"Fries"} quantity={fries} />
            <StatisticCard name={"Pizza"} quantity={pizza} />
        </div>
    );
};

export default StatisticsCards;