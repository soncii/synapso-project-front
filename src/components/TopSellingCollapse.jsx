// components
import Spring from '@components/Spring';
import Collapse from '@mui/material/Collapse';
import TopSellingProductItem from '@components/TopSellingProductItem';

// constants
import {PRODUCT_STATUSES} from '@constants/options';

// utils
import PropTypes from 'prop-types';

const TopSellingCollapse = ({product, active, setActive, index}) => {
    const status = PRODUCT_STATUSES.find(item => item.value === product.status);

    const toggleCollapse = () => {
        if (active === product.id) {
            setActive('');
        } else {
            setActive(product.id);
        }
    }

    return (
        <Spring className="card-container card-container--light p-4 rounded-2xl" type="slideUp" index={index}>
            <div className="flex items-center justify-between gap-5">
                <TopSellingProductItem
                    titleClass="truncate max-w-[120px] xxs:max-w-[170px]"
                    subtitleClass="truncate max-w-[120px] xxs:max-w-[170px]"
                    product={product}
                    imgSize={40}/>
                <button className={`btn-collapse ${active === product.id ? 'active' : ''}`}
                        onClick={toggleCollapse}
                        aria-label="Toggle">
                    <i className="icon-chevron-down-regular"/>
                </button>
            </div>
            <Collapse in={active === product.id}>
                <ul className="flex flex-col gap-2 mt-4">
                   <li className="flex items-center justify-between pb-2 border-b">
                       <span className="uppercase text-label text-xs font-medium">
                           Price:
                       </span>
                       <span className="text-header font-semibold">
                           ${product.price}
                       </span>
                   </li>
                    <li className="flex items-center justify-between pb-2 border-b">
                        <span className="uppercase text-label text-xs font-medium">
                            Status:
                        </span>
                        <span className="font-semibold" style={{color: `var(--${status.color})`}}>
                            {status.label}
                        </span>
                    </li>
                    <li className="flex items-center justify-between pb-2 border-b">
                        <span className="uppercase text-label text-xs font-medium">
                            Sold:
                        </span>
                        <span className="text-header font-semibold">
                            {product.sold} pcs
                        </span>
                    </li>
                    <li className="flex items-center justify-between">
                        <span className="uppercase text-label text-xs font-medium">
                            Earned:
                        </span>
                        <span className="text-header font-semibold">
                            ${(product.sold * product.price).toFixed(2)}
                        </span>
                    </li>
                </ul>
            </Collapse>
        </Spring>
    )
}

TopSellingCollapse.propTypes = {
    product: PropTypes.object.isRequired,
    active: PropTypes.string.isRequired,
    setActive: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired
}

export default TopSellingCollapse