// components
import {NavLink} from 'react-router-dom';

// utils
import PropTypes from 'prop-types';

const TopSellingProductItem = ({product, imgSize = 60, withCategory, titleClass, subtitleClass}) => {
    return (
        <div className="flex items-center gap-4">
            <div className="rounded-lg overflow-hidden aspect-square shrink-0" style={{width: imgSize}}>
                <img width={imgSize}
                     height={imgSize}
                     style={{
                         width: imgSize,
                         height: imgSize,
                     }}
                     src={product.img}
                     alt={product.name}/>
            </div>
            <div className="flex flex-col items-start">
                <NavLink className={`font-medium text-[15px] text-header hover:text-turquoise ${titleClass || ''}`}
                         to="/product">
                    {product.name}
                </NavLink>
                {
                    withCategory ?
                        <span
                            className={`capitalize text-xs text-label dark:text-[var(--border-light)] mt-0.5 ${subtitleClass || ''}`}>
                            Category: {product.category}
                        </span>
                        :
                        <span className={`font-medium uppercase text-xs text-label mt-1 ${subtitleClass || ''}`}>
                            Product ID: {product.id}
                        </span>
                }
            </div>
        </div>
    )
}

TopSellingProductItem.propTypes = {
    product: PropTypes.object.isRequired,
    imgSize: PropTypes.number,
    withCategory: PropTypes.bool,
    titleClass: PropTypes.string,
    subtitleClass: PropTypes.string
}

export default TopSellingProductItem