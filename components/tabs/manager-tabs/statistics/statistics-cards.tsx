
import React from 'react';
import StatisticCard from "@/components/tabs/manager-tabs/statistics/statistics-card";

const StatisticsCards = () => {
    return (
        <div className={"flex items-center justify-center gap-10"}>
            <StatisticCard name={"Products"} quantity={32} />
            <StatisticCard name={"Items"} quantity={10} />
            <StatisticCard name={"S"} quantity={5} />
            <StatisticCard name={"Product"} quantity={7} />
        </div>
    );
};

export default StatisticsCards;