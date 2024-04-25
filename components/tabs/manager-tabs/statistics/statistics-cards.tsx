
import React, {useEffect, useState} from 'react';
import StatisticCard from "@/components/tabs/manager-tabs/statistics/statistics-card";
import {useAppDispatch} from "@/hooks/useStore";
import {getProductsCount} from "@/store/services/productService";
import {setTotalCount} from "@/store/features/product/productSlice";

const StatisticsCards = () => {
    const dispatch = useAppDispatch()
    const [burger, setBurger] = useState<number>(0)
    const [hotdog, setHotdog] = useState<number>(0)
    const [fries, setFries] = useState<number>(0)
    const [pizza, setPizza] = useState<number>(0)

    useEffect(() => {
        const getPizzaCounter = async () => {
            const res =  getProductsCount({pageNumber: null, pageSize: null, itemCategory: "Pizza"})
            res.then(res => {
                let count = 0
                res.map(() => count++)

                setPizza(count)
            })
        }
        const getBurgerCounter = async () => {
            const res =  getProductsCount({pageNumber: null, pageSize: null, itemCategory: "Burger"})
            res.then(res => {
                let count = 0
                res.map(() => count++)

                setBurger(count)
            })
        }
        const getHotdogCounter = async () => {
            const res =  getProductsCount({pageNumber: null, pageSize: null, itemCategory: "Hotdog"})
            res.then(res => {
                let count = 0
                res.map(() => count++)

                setHotdog(count)
            })
        }
        const getFriesCounter = async () => {
            const res =  getProductsCount({pageNumber: null, pageSize: null, itemCategory: "Fries"})
            res.then(res => {
                let count = 0
                res.map(() => count++)

                setFries(count)
            })
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