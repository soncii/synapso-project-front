// components
import Spring from '@components/Spring';
import BasicTable from '@components/BasicTable';
import TopSellingCollapse from '@components/TopSellingCollapse';

// hooks
import {useWindowSize} from 'react-use';
import {useState, useEffect} from 'react';

// constants
import {TOP_SELLING_COLUMN_DEFS} from '@constants/columnDefs';

// data placeholder
import top_selling from '@db/top_selling';

const TopSelling = () => {
    const {width} = useWindowSize();
    const [activeCollapse, setActiveCollapse] = useState('');

    useEffect(() => {
        window.addEventListener('resize', () => {
            setActiveCollapse('');
        });

        return () => {
            window.removeEventListener('resize', () => {
                setActiveCollapse('');
            });
        }
    }, []);

    return (
        <Spring className="card flex flex-col gap-4 p-5 xs:p-6 h-full">
            <h2>Top Selling</h2>
            {
                width < 768 ?
                    <div className="flex flex-col gap-4">
                        {
                            top_selling.map((product, index) => (
                                <TopSellingCollapse key={index}
                                                    product={product}
                                                    active={activeCollapse}
                                                    setActive={setActiveCollapse}
                                                    index={index}/>
                            ))
                        }
                    </div>
                    :
                    <BasicTable dataSource={top_selling}
                                columns={TOP_SELLING_COLUMN_DEFS}
                                scroll={{y: 230}}
                                rowKey="id"
                                showSorterTooltip={false}
                                pagination={false}/>
            }
        </Spring>
    )
}

export default TopSelling