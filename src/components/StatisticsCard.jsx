// components
import Spring from '@components/Spring';
import Trend from '@ui/Trend';
import Counter from '@components/Counter';
import IconHeader from '@components/IconHeader';
import {ResponsiveContainer, Area, AreaChart, Tooltip} from 'recharts';

const placeholder = {
    title: 'Statistics',
    iconClass: 'wallet-solid',
    value: 0,
    valuePrefix: '',
    trend: 0,
    data: [
        {value: 3500},
        {value: 2598},
        {value: 1500},
        {value: 5980},
        {value: 3400},
        {value: 2900},
        {value: 7100},
        {value: 6500},
        {value: 7500},
        {value: 5120},
    ]
}

const CustomTooltip = ({active, payload}) => {
    if (active && payload && payload.length) {
        return (
            <div className="basic-tooltip">
                {payload[0].value}
            </div>
        );
    }

    return null;
}

const StatisticsCard = ({data = placeholder, chartClass}) => {
    const isPositive = data.trend > 0;

    return (
        <Spring className="card min-h-[180px] h-full p-5 xs:p-6">
            <IconHeader title={data.title || placeholder.title}
                        iconClass={data.iconClass || placeholder.iconClass}/>
            <div className="flex justify-between items-start">
                <div>
                    <Counter className="block font-extrabold text-header text-[42px] mt-4 mb-[18px]"
                             value={data.value || placeholder.value}
                             prefix={data.valuePrefix || placeholder.valuePrefix}/>
                    <Trend value={data.trend || placeholder.trend}/>
                </div>
                <div className={`w-[130px] h-[75px] mt-2 overflow-hidden hidden xs:block md:hidden lg:block ${chartClass || ''}`}>
                    <ResponsiveContainer width="99%" height="100%">
                        <AreaChart data={data.data || placeholder.data} margin={false}>
                            <defs>
                                <linearGradient id="positive" x1="-7.85916" y1="1.60426" x2="-7.85916" y2="74.7098"
                                                gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#15CAB8"/>
                                    <stop offset="0.926382" stopColor="#15CAB8" stopOpacity="0.01"/>
                                    <stop offset="1" stopColor="#24BF4A" stopOpacity="0.01"/>
                                </linearGradient>
                                <linearGradient id="negative" x1="0" y1="5.72894" x2="0" y2="75"
                                                gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#FB3B3A"/>
                                    <stop offset="1" stopColor="#EC424D" stopOpacity="0.01"/>
                                </linearGradient>
                            </defs>
                            <Area type="monotone"
                                  dataKey="value"
                                  stroke={isPositive ? 'var(--turquoise)' : 'var(--red)'}
                                  strokeWidth={2}
                                  activeDot={false}
                                  fill={isPositive ? 'url(#positive)' : 'url(#negative)'}
                            />
                            <Tooltip cursor={false} content={<CustomTooltip/>}/>
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </Spring>
    )
}

export default StatisticsCard