"use client"


import StatisticsCards from "@/components/tabs/manager-tabs/statistics/statistics-cards";
import StatisticChart from "@/components/tabs/manager-tabs/statistics/statistics-chart";

const Statistics = ( ) => {
    return <div className={"flex flex-col items-center gap-7 py-7"}>
        <StatisticsCards/>
        <StatisticChart/>
    </div>
}

export default Statistics