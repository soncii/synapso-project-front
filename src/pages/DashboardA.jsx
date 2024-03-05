import AppBar from '@components/AppBar';
import AppGrid from '@components/AppGrid';
import Statistics from '@widgets/Statistics';
import SalesAnalyticsArea from '@widgets/SalesAnalyticsArea';
import SalesByCategory from '@widgets/SalesByCategory';
import TopSelling from '@widgets/TopSelling';
import TrendingProduct from '@widgets/TrendingProduct';

const widgets = {
    statistics: <Statistics/>,
    sales_analytics: <SalesAnalyticsArea/>,
    sales_by_category: <SalesByCategory/>,
    top_selling: <TopSelling/>,
    trending_product: <TrendingProduct/>,
}

const DashboardA = () => {
    return (
        <>
            <AppBar title="Dashboard"/>
            <AppGrid id="dashboard_a" widgets={widgets} cols={{xl: 4, lg: 3, md: 2}}/>
        </>
    )
}

export default DashboardA