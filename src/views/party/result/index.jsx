import { PieChart } from '@mui/x-charts';
import { BarChart } from '@mui/x-charts/BarChart';
import { Typography } from '@mui/material';

const Results = () => {
    return (
        <div>
            <h1 className="rounded-tl-3xl rounded-br-3xl mx-[1rem] my-[1rem] p-[1rem] text-themePurple text-[2.25rem] font-[500] bg-white">Result</h1>

            <div className="flex flex-col justify-center items-center m-[1rem]">
                {/* <label htmlFor="piechart" className='text-3xl font-semibold font-poppins mb-[1rem]'>Pie chart based on election results</label> */}
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

                {/* <BarChart
                    xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
                    series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
                    width={800}
                    height={600}
                /> */}
            </div>
        </div>
    );
};

export default Results;
