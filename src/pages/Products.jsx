// components
import AppBar from '@components/AppBar';
import FilterMenu from '@components/FilterMenu';
import ProductsDisplay from '@widgets/ProductsDisplay';
import Loader from '@components/Loader';

// hooks
import {useState, useEffect} from 'react';
import {useWindowSize} from 'react-use';

const Products = () => {
    const [loading, setLoading] = useState(false);
    const {width} = useWindowSize();
    const [view, setView] = useState('list');
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        setMenuOpen(false);

        if (width >= 1280 && view === 'list') {
            setMenuOpen(true);
        }

    }, [view, width]);

    useEffect(() => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [view]);

    return (
        <>
            {
                loading ? (
                    <Loader />
                ) : (
                    <>
                        <AppBar title={`Experiments ${view.charAt(0).toUpperCase() + view.slice(1)}`}/>
                        <div className="layout-wrapper grid flex-1 gap-8 items-start">
                            <ProductsDisplay view={view}
                                             setView={setView}
                                             open={menuOpen}
                                             handler={setMenuOpen}/>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default Products