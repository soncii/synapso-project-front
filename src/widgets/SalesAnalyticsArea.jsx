// components
import Spring from '@components/Spring';
import Select from '@ui/Select';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';

// hooks
import {useState} from 'react';
import {useTheme} from '@contexts/themeContext';
import {useWindowSize} from 'react-use';

// utils
import {generateGridPoints, numFormatter} from '@utils/helpers';

// constants
import {PERIODS} from '@constants/options';

// data placeholder
import sales_chart from '@db/sales_chart';

const CustomTooltip = ({active, payload, label}) => {
    if (active) {
        return (
            <div className="bg-peach p-2.5 rounded-md dark:shadow-md">
                <p className="text-[18px] font-semibold !text-white mb-1">{label}</p>
                <p className="text-[15px] font-semibold text-white">
                    Sales: ${payload[0].value}
                </p>
            </div>
        );
    }

    return null;
}

const SalesAnalyticsArea = () => {
    const {width} = useWindowSize();
    const {theme} = useTheme();
    const [period, setPeriod] = useState(PERIODS[0]);
    const points = generateGridPoints('salesAnalytics', 50, 'x');

    return (
        <Spring className="card flex flex-col gap-[22px] h-[392px] xs:h-[315px] p-5 xs:p-6 md:h-full">
            <div className="flex flex-col gap-2.5 xs:flex-row xs:items-center xs:justify-between xs:gap-5">
                <h2>Sales Analytics</h2>
                <div className="min-w-[105px]">
                    <Select value={period}
                            variant="minimal"
                            onChange={setPeriod}
                            options={PERIODS}/>
                </div>
            </div>
            <div className="flex-1 overflow-hidden -mr-2 md:-ml-11 md:-mr-4">
                <ResponsiveContainer width="99%" height="100%" id="salesAnalytics">
                    <AreaChart data={sales_chart[period.value].data} margin={{top: 0, right: 7, left: 7, bottom: 0}}>
                        <defs>
                            <linearGradient id="salesAnalyticsFill" x1="-124.434" y1="-94.766" x2="-124.434"
                                            y2="227.785" gradientUnits="userSpaceOnUse">
                                <stop stopColor="var(--peach)"/>
                                <stop offset="1" stopColor={theme === 'light' ? 'white' : 'transparent'}
                                      stopOpacity="0.01"/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false}
                                       horizontalPoints={points}
                                       strokeWidth={1}
                                       stroke="var(--cartesian-grid)"
                                       strokeDasharray="8 8"/>
                        <XAxis dataKey="name"
                               dy={10}
                               axisLine={false}
                               tickLine={false}
                               hide={width < 768}/>
                        <YAxis tickCount={7}
                               tickFormatter={(value) => numFormatter(value, 0)}
                               axisLine={false}
                               tickLine={false}
                               hide={width < 768}/>
                        <Tooltip cursor={{strokeDasharray: '8 8', stroke: 'var(--peach)'}}
                                 content={<CustomTooltip/>}/>
                        <Area type="monotone"
                              dataKey="b"
                              stroke="var(--peach)"
                              strokeWidth={3}
                              strokeLinecap="round"
                              fill="url(#salesAnalyticsFill)"/>
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Spring>
    )
}

export default SalesAnalyticsArea