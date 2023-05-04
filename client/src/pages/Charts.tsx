import React from 'react'
import { BarChart } from '../components/Graph/BarChart'
import { Dounghnut } from '../components/Graph/DoughnutChart'

const Charts = () => {
    return (
        <div>
            <div>
                <BarChart />
                <Dounghnut />
            </div>
        </div>
    )
}

export default Charts