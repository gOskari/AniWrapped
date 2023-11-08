"use client"

import React from "react";
import { Chart } from "react-google-charts";


const PieChart = () => {
    const data = [
        ["Genre", "Hours Watched"],
        ["Action", 269],
        ["Romance", 150],
        ["Fantasy", 54],
        ["Slice of life", 10],
    ];
    
    const options = {
        title: "Genres Watched",
    };
    return (
        <Chart 
            chartType="PieChart"
            data={data}
            options={options}
            width={"100%"}
            height={"400px"}
        />
    )
}

export default PieChart;