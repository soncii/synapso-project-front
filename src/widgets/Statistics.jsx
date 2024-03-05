import StatisticsCard from '@components/StatisticsCard';

const placeholder = [
    {
        title: 'Today Revenue',
        iconClass: 'wallet-solid',
        value: 2189,
        valuePrefix: '$',
        trend: 12,
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
    },
    {
        title: 'Today Visitors',
        iconClass: 'user-plus-solid',
        value: 512,
        valuePrefix: '',
        trend: 4,
        data: [
            {value: 512},
            {value: 113},
            {value: 280},
            {value: 689},
            {value: 235},
            {value: 580},
            {value: 313},
            {value: 290},
            {value: 570},
            {value: 620},
        ]
    },
    {
        title: 'Today Transactions',
        iconClass: 'arrow-down-to-line-solid',
        value: 325,
        valuePrefix: '$',
        trend: -0.89,
        data: [
            {value: 8900},
            {value: 6890},
            {value: 3854},
            {value: 5980},
            {value: 3400},
            {value: 2900},
            {value: 7100},
            {value: 2540},
            {value: 7500},
            {value: 4200},
        ]
    },
    {
        title: 'Total Products',
        iconClass: 'bag-shopping-solid',
        value: 980,
        trend: 2,
        data: [
            {value: 512},
            {value: 1000},
            {value: 280},
            {value: 689},
            {value: 1500},
            {value: 580},
            {value: 800},
            {value: 290},
            {value: 570},
            {value: 620},
        ]
    }
]

const Statistics = ({data = placeholder}) => {
    return (
        <div className="grid grid-cols-1 h-full gap-6 md:grid-cols-2 xl:gap-8 3xl:grid-cols-4">
            {
                data.map((item, index) => (
                    <StatisticsCard key={index}
                                    data={item}
                                    chartClass="xl:w-[250px] 3xl:hidden min-[1800px]:block min-[1800px]:w-[110px] 5xl:w-[130px]"/>
                ))
            }
        </div>
    )
}

export default Statistics