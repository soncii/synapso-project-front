// components
import Spring from '@components/Spring';
import Select from '@ui/Select';
import {ResponsiveContainer, Tooltip, Pie, PieChart, Cell} from 'recharts';

// hooks
import {useState} from 'react';
import {useTheme} from '@contexts/themeContext';
import {useWindowSize} from 'react-use';

// constants
import {PERIODS} from '@constants/options';

// utils
import {commaFormatter, numFormatter} from '@utils/helpers';

const data = [
    {
        name: 'Clothing',
        data: {
            week: {
                products: 1348,
                profit: 3020,
            },
            month: {
                products: 2485,
                profit: 6500,
            },
            year: {
                products: 9047,
                profit: 10544,
            }
        },
        color: 'turquoise',
        darkAura: '#1B3838',
        lightAura: '#F4FFFF'
    },
    {
        name: 'Lingerie & Nightwear',
        data: {
            week: {
                products: 3459,
                profit: 6700,
            },
            month: {
                products: 4008,
                profit: 3560,
            },
            year: {
                products: 6987,
                profit: 10245,
            }
        },
        color: 'blue',
        darkAura: '#14344A',
        lightAura: '#F1F7FF'
    },
    {
        name: 'Body Fit',
        data: {
            week: {
                products: 9874,
                profit: 1897,
            },
            month: {
                products: 6644,
                profit: 9580,
            },
            year: {
                products: 1505,
                profit: 7890,
            }
        },
        color: 'yellow',
        darkAura: '#3B300A',
        lightAura: '#FFFBF0'
    },
    {
        name: 'Sportswear',
        data: {
            week: {
                products: 4874,
                profit: 4854,
            },
            month: {
                products: 4700,
                profit: 5698,
            },
            year: {
                products: 8900,
                profit: 6542,
            }
        },
        color: 'peach',
        darkAura: '#3B300A',
        lightAura: '#FFFBF0'
    },
    {
        name: 'Accessories',
        data: {
            week: {
                products: 7845,
                profit: 2955,
            },
            month: {
                products: 8066,
                profit: 12845,
            },
            year: {
                products: 3459,
                profit: 2280,
            }
        },
        color: 'red',
        darkAura: '#4E3130',
        lightAura: '#FFF3F4'
    }
]

const CustomTooltip = ({active, payload}) => {
    if (active && payload && payload.length) {
        return (
            <div className="basic-tooltip">
                {numFormatter(payload[0].value, 0, '$')}
            </div>
        );
    }

    return null;
}

const LegendItem = ({item, period}) => {
    const {theme} = useTheme();

    const getCategoryPercentage = () => {
        const total = data.reduce((acc, curr) => acc + curr.data[period].products, 0);
        const percentage = (item.data[period].products / total) * 100;
        return percentage.toFixed(2);
    }

    return (
        <div className="flex gap-2.5">
           <span className="flex items-center justify-center w-[15px] h-[15px] rounded-full mt-1 shrink-0"
                 style={{backgroundColor: theme === 'dark' ? item.darkAura : item.lightAura}}>
                <span className={`w-[7px] h-[7px] rounded-full bg-${item.color}`}/>
            </span>
            <div className="flex flex-col flex-1 gap-1">
                <p className="flex justify-between font-medium text-[15px] text-header">
                    {item.name} ({getCategoryPercentage()}%)
                    <span>${commaFormatter(item.data[period].profit)}</span>
                </p>
                <p className="uppercase text-xs text-label">
                    {commaFormatter(item.data[period].products)} Category Products
                </p>
            </div>
        </div>
    )
}

const SalesByCategory = () => {
    const {width} = useWindowSize();
    const [period, setPeriod] = useState(PERIODS[0]);

    const getTotal = () => {
        return data.reduce((acc, curr) => acc + curr.data[period.value].profit, 0);
    }

    return (
        <Spring className="card flex flex-col gap-4 p-5 h-full xs:p-6">
            <div className="flex flex-col gap-2.5 xs:flex-row xs:items-center xs:justify-between">
                <h2>Sales By Category</h2>
                <div className="min-w-[105px]">
                    <Select options={PERIODS} value={period} onChange={setPeriod}/>
                </div>
            </div>
            <div className="flex flex-col items-start gap-6 flex-1 md:flex-row md:items-center md:gap-[65px]">
                <div className="relative overflow-hidden min-h-[240px] min-w-[240px] xs:min-w-[294px]
                     xs:min-h-[294px] m-auto md:m-0 md:w-[294px] md:h-[294px]">
                    <ResponsiveContainer width="99%" height="99%">
                        <PieChart>
                            <Pie data={data}
                                 dataKey={`data.${period.value}.profit`}
                                 nameKey="name"
                                 cx="50%"
                                 cy="50%"
                                 outerRadius={width < 414 ? 118 : 140}
                                 innerRadius={95}
                                 strokeWidth={0}
                                 fill="#8884d8">
                                {
                                    data.map((item, index) => (
                                        <Cell key={index} fill={`var(--${item.color})`}/>
                                    ))
                                }
                            </Pie>
                            <Tooltip cursor={false} content={<CustomTooltip/>}/>
                        </PieChart>
                    </ResponsiveContainer>
                    <span className="counter absolute-center">
                        {numFormatter(getTotal(), 0, '$')}
                    </span>
                </div>
                <div className="flex flex-col flex-1 w-full gap-4">
                    {
                        data.map((item, index) => (
                            <LegendItem key={index} item={item} period={period.value}/>
                        ))
                    }
                </div>
            </div>
        </Spring>
    )
}

export default SalesByCategory