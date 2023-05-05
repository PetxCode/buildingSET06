import React from 'react';
import lodash from "lodash"
import { useMediaQuery } from 'react-responsive'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];


const arr1 = [1, 7, 4, 9, 10, 66, 75]
const arr2 = [90, 6, 4, 99, 30, 60, 33]

const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

const players = [
    { name: "Antoine Griezmann", team: "France" },
    { name: "Luka Modrić", team: "Croatia" },
    { name: "Ivan Rakitić", team: "Croatia" },
    { name: "Paul Pogba", team: "France" },
];

const player = lodash.groupBy(players, "team")

console.log(lodash.sortBy(players, "team"))

const dataData2: any = []
const dataData: any = []

Array.from({ length: 10, }, () => {
    const letters: string = 'abcdefghijklmnopqrstuvwxyz'
    dataData.push(
        {
            items: letters[Math.floor(Math.random() * letters.length)],
            cost: random(20, 100)
        })
})

Array.from({ length: 10, }, () => {
    const letters: string = 'abcdefghijklmnopqrstuvwxyz'
    dataData2.push(
        {
            items: letters[Math.floor(Math.random() * letters.length)],
            value: random(82, 109)
        })
})

export const data: any = {
    labels: dataData.map((el: any) => el.items),
    datasets: [
        {
            label: 'Dataset 1',
            data: dataData.map((el: any) => el.cost),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Dataset 2',
            data: dataData2.map((el: any) => el.value),
            backgroundColor: 'rgba(16, 86, 143, 0.5)',
        },

    ],
};

export function BarChart() {
    return <div>

        <div className="w-40%" >
            <Bar options={options} data={data} />
        </div>

        <div>

        </div>
    </div>;
}