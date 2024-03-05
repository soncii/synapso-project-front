// components
import {Helmet} from 'react-helmet';
import Headroom from 'react-headroom';
import {NavLink} from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import Collapse from '@mui/material/Collapse';

// hooks
import {useTheme} from '@contexts/themeContext';
import {useSidebar} from '@contexts/sidebarContext';
import {useWindowSize} from 'react-use';
import {useState, useEffect, useRef} from 'react';

// utils
import PropTypes from 'prop-types';
import loadable from '@loadable/component'

// assets
import user from '@assets/synapso_logo.jpg';

const Notifications = loadable(() => import('@components/Notifications'));
const ShoppingCart = loadable(() => import('@components/ShoppingCart'));
const SearchModal = loadable(() => import('@components/SearchModal'));

const AppBar = ({title}) => {
    const {theme, toggleTheme} = useTheme();
    const {setOpen} = useSidebar();
    const {width} = useWindowSize();
    const [query, setQuery] = useState('');
    const [searchModalOpen, setSearchModalOpen] = useState(false);
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const inputRef = useRef(null);

    const AppBarWrapper = width < 1280 ? Headroom : 'div';

    useEffect(() => {
        setSearchModalOpen(false);
        setIsSearchExpanded(false);
    }, [width]);

    const handleInput = () => {
        setIsSearchExpanded(!isSearchExpanded);
    }

    useEffect(() => {
        if (isSearchExpanded) {
            inputRef.current.focus();
        } else {
            inputRef.current.blur();
        }
    }, [isSearchExpanded]);

    return (
        <>
            <Helmet>
                <title>{title} | Synapso Mind App</title>
            </Helmet>
            <AppBarWrapper>
                <div className="flex gap-8 items-center justify-end relative py-4 md:gap-0 xl:py-6 xl:px-8 xl:mb-2
                     4xl:p-0 4xl:mb-[18px]">
                    <h1 className="flex-1 hidden xl:block">{title}</h1>
                    <div className="flex gap-8">
                        <div className="flex items-center">
                            <button className="btn-icon"
                                    aria-label="Search"
                                    onClick={width < 768 ? () => setSearchModalOpen(true) : handleInput}>
                                <i className="icon-magnifying-glass-regular"/>
                            </button>
                            <Collapse in={isSearchExpanded}
                                      collapsedSize={0}
                                      orientation="horizontal"
                                      timeout={400}>
                                <input className="bg-transparent h-8 !rounded-[0px] border-b border-sidebar dark:border-border -mt-2
                                       ml-6 w-[180px] 3xl:w-[300px]"
                                       type="text"
                                       ref={inputRef}
                                       value={query}
                                       onChange={e => setQuery(e.target.value)}
                                       onBlur={() => {
                                           query.length === 0 && setIsSearchExpanded(false);
                                       }}
                                       placeholder="Search for anything..."
                                />
                            </Collapse>
                        </div>
                        <button className="btn-icon"
                                aria-label="Change mode"
                                onClick={toggleTheme}>
                            <i className={`icon-${theme === 'light' ? 'sun-bright' : 'moon-stars'}-regular`}/>
                        </button>
                    </div>
                    <span className="hidden h-[55px] border-l mr-[35px] ml-[30px] md:block"/>
                    <div className="hidden items-center gap-2.5 md:flex">
                        <NavLink to="/settings">
                            <img className="w-10 h-10 rounded-full" src={user} alt="user"/>
                        </NavLink>
                        <div className="flex flex-col">
                            <span className="text-[15px] font-semibold text-header">
                                Antonio Cerone
                            </span>
                            <span className="text-xs">Admin</span>
                        </div>
                    </div>
                    <button className="btn-icon md:ml-10 4xl:hidden"
                            aria-label="Open menu"
                            onClick={() => setOpen(true)}>
                        <i className="icon-bars-regular"/>
                    </button>
                </div>
            </AppBarWrapper>
            <h1 className="px-4 md:px-6 mb-4 md:mb-6 xl:hidden">
                {title}
            </h1>
            <SearchModal open={searchModalOpen} setOpen={setSearchModalOpen}/>
        </>
    )
}

AppBar.propTypes = {
    title: PropTypes.string.isRequired,
}

export default AppBar