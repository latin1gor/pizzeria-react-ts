"use client"


import StatisticsCards from "@/components/tabs/manager-tabs/statistics/statistics-cards";
import StatisticChart1 from "@/components/tabs/manager-tabs/statistics/charts/statistics-chart1";
import StatisticsChart2 from "@/components/tabs/manager-tabs/statistics/charts/statistics-chart2";
import StatisticsChart3 from "@/components/tabs/manager-tabs/statistics/charts/statistics-chart3";
import StatisticsChart4 from "@/components/tabs/manager-tabs/statistics/charts/statistics-chart4";
import StatisticsChart6 from "@/components/tabs/manager-tabs/statistics/charts/statistics-chart6";
import StatisticsChart5 from "@/components/tabs/manager-tabs/statistics/charts/statistics-chart5";

const Statistics = ( ) => {
    return <div className={"flex flex-col items-center gap-7 py-7"}>
        <StatisticsCards/>
        <StatisticChart1/>
        {/*<StatisticsChart2/>*/}
        <StatisticsChart3/>
        <StatisticsChart4/>
        <StatisticsChart5/>
        {/*<StatisticsChart6/>*/}
    </div>;

}

export default Statistics