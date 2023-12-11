import { PieChart } from '@mui/x-charts';
import { BarChart } from '@mui/x-charts/BarChart';
import { Typography } from '@mui/material';
import { useState } from 'react';
import Dropdown from '../../components/Dropdown';

const Results = () => {
    const [type, setType] = useState('pie');

    const handleType = (value) => {
        setType(value);
    };

    return (
        <div>
            <h1 className="rounded-tl-3xl rounded-br-3xl mx-[0.5rem] my-[0.5rem] p-[1rem] text-themePurple text-[2.25rem] font-[500] bg-white">
                Result
            </h1>

            <div className="flex w-3/4 gap-4 mx-auto my-8 ">
                <Dropdown />
                <Dropdown />
                <Dropdown />
                <Dropdown />
                <Dropdown />
            </div>

            <div className="flex items-center justify-between w-2/5 mx-auto mt-8 bg-themePurple rounded-xl">
                <button
                    onClick={() => handleType('pie')}
                    className={`w-1/2 py-3  transition delay-75 hover:bg-white hover:text-themePurple rounded-tl-xl rounded-bl-xl ${
                        type === 'pie' ? 'bg-white text-themePurple' : 'text-white'
                    }`}
                >
                    Pie Chart
                </button>
                <button
                    onClick={() => handleType('bar')}
                    className={`w-1/2 py-3  transition delay-75 hover:bg-white hover:text-themePurple rounded-tr-xl rounded-br-xl ${
                        type === 'bar' ? 'bg-white text-themePurple' : 'text-white'
                    }`}
                >
                    Bar Graph
                </button>
            </div>

            <div className="flex flex-col justify-center items-center m-[1rem]">
                {/* <label htmlFor="piechart" className="text-3xl font-semibold font-poppins mb-[1rem]">
                    Pie chart based on election results
                </label> */}
                {type === 'pie' ? (
                    <PieChart
                        series={[
                            {
                                data: [
                                    { id: 0, value: 10, label: 'series A' },
                                    { id: 1, value: 15, label: 'series B' },
                                    { id: 2, value: 20, label: 'series C' },
                                    { id: 4, value: 10, label: 'series D' },
                                    { id: 5, value: 15, label: 'series E' },
                                    { id: 6, value: 60, label: 'series F' },
                                ],
                            },
                        ]}
                        width={800}
                        height={600}
                    />
                ) : null}

                {type === 'bar' ? (
                    <BarChart
                        xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
                        series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
                        width={800}
                        height={600}
                    />
                ) : null}
            </div>
        </div>
    );
};

export default Results;
