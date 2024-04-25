"use client"
import React, {PureComponent, useEffect, useState} from 'react';
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart
} from 'recharts';
import {getStaffPayroll, IStatisticParams} from "@/store/services/statisticService";
import {Button, CalendarDate, DateInput, TimeInput} from "@nextui-org/react";
import {DateValue, parseDate} from "@internationalized/date";
import {CalendarBoldIcon} from "@nextui-org/shared-icons";
import {formatDate, formatTime} from "@/lib/utils";



const StatisticChart1 = () => {
    const [data, setData] = useState(null)
    const [startDate, setStartDate] = useState<DateValue>(parseDate("2024-01-01"));
    const [endDate, setEndDate] = useState<DateValue>(parseDate("2024-01-02"))

    const getPayroal = async ({dateStart, dateEnd}: any) => {
        const formattedStart = formatDate(dateStart)
        const formattedEnd = formatDate(dateEnd)
        getStaffPayroll({dateStart: formattedStart, dateEnd: formattedEnd}).then((res) => {
            setData(res)
        } )
    }
    useEffect(() => {
        getStaffPayroll({dateStart: "2024-01-01",  dateEnd: "2024-01-02" }).then((res) => {
            setData(res)
        })
    }, []);


    return<div className={"flex flex-col items-center py-28"}>
        <h1 className={"font-bold text-2xl p-3"}>Payroll staff</h1>
        <div className={"flex justify-between h-96 w-[125vh] bg-gray-50 rounded-2xl p-4 m-2"}>

        {data &&
        <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                width={500}
                height={400}
                data={data}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >

                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="firstName"  />
                <YAxis />
                <Tooltip />
                  <Area  dataKey="hourlyRate" stackId="1" stroke="#e2cc00" fill="#edbb09" />
                  <Area type="monotone" dataKey="hoursWorked"  stackId="1" stroke="orange" fill="#F0811D" />
                <Area type="monotone" dataKey="payroll" stackId="1" stroke="red" fill="#FF4A1C"  />
            </AreaChart>
        </ResponsiveContainer>
        }

    </div>
        <div className={"w-full flex justify-between items-end p-5"}>
            <DateInput
                className={"w-80"}
                label="Start date"
                defaultValue={parseDate("2024-01-01")}
                value={startDate}
                onChange={setStartDate}
                labelPlacement="outside"
                endContent={
                    <CalendarBoldIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
            />
            <Button className={"w-80"} color={"primary"} onClick={() => getPayroal({dateStart: startDate, dateEnd: endDate})}>Apply</Button>
            <DateInput
                className={"w-80"}
                value={endDate}
                onChange={setEndDate}
                label="End date"
                defaultValue={parseDate("2024-01-01")}
                labelPlacement="outside"
                endContent={
                    <CalendarBoldIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
            />

        </div>
    </div>
}

export default StatisticChart1