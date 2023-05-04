import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);




const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

const dataData: any = []
const dataData1: any = []
const dataData2: any = []
const dataData3: any = []
const dataData4: any = []

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

Array.from({ length: 10, }, () => {
    const letters: string = 'abcdefghijklmnopqrstuvwxyz'
    dataData3.push(
        {
            items: letters[Math.floor(Math.random() * letters.length)],
            value: random(82, 109)
        })
})


Array.from({ length: 10, }, () => {
    const letters: string = 'abcdefghijklmnopqrstuvwxyz'
    dataData4.push(
        {
            items: letters[Math.floor(Math.random() * letters.length)],
            value: random(82, 109)
        })
})


Array.from({ length: 10, }, () => {
    const letters: string = 'abcdefghijklmnopqrstuvwxyz'
    dataData1.push(
        {
            items: letters[Math.floor(Math.random() * letters.length)],
            value: random(82, 109)
        })
})

export const data2: any = {
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

dataData.reduce((a: any, b: any) => a + b)
console.log(dataData2)

console.log("showing: ",
    dataData.map((el: any) => el.cost).reduce((a: number, b: number) => a + b),
    dataData1.map((el: any) => el.value).reduce((a: number, b: number) => a + b),
    dataData2.map((el: any) => el.value).reduce((a: number, b: number) => a + b),
    dataData3.map((el: any) => el.value).reduce((a: number, b: number) => a + b),
    dataData4.map((el: any) => el.value).reduce((a: number, b: number) => a + b)
)

export const data: any = {
    labels: ['sales', 'report', 'strategy', 'hopes', 'game'],



    datasets: [
        {
            label: '# of Votes',
            data: [
                dataData.map((el: any) => el.cost).reduce((a: number, b: number) => a + b),
                dataData1.map((el: any) => el.value).reduce((a: number, b: number) => a + b),
                dataData2.map((el: any) => el.value).reduce((a: number, b: number) => a + b),
                dataData3.map((el: any) => el.value).reduce((a: number, b: number) => a + b),
                dataData4.map((el: any) => el.value).reduce((a: number, b: number) => a + b)
            ],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                // 'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

export function Dounghnut() {
    return (
        <div>
            <div className='w-[400px] h-[400px]' ><Doughnut data={data} /></div>
        </div>
    )
}