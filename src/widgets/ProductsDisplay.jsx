// components
import Spring from '@components/Spring';
import Search from '@ui/Search';
import SubmenuButton from '@ui/SubmenuButton';
import IconButton from '@ui/IconButton';
import FilterItem from '@ui/FilterItem';
import ProductGridItem from '@components/ProductGridItem';
import BasicTable from '@components/BasicTable';
import Pagination from '@ui/Pagination';
import TopSellingCollapse from '@components/TopSellingCollapse';
import Empty from '@components/Empty';
import Tag from '@ui/Tag';

import { Menu, Dropdown, Button } from 'antd'; // Ensure you have 'antd' installed
import { MoreOutlined } from '@ant-design/icons'; // Import necessary icons

// hooks
import {useState, useEffect} from 'react';
import usePagination from '@hooks/usePagination';
import {useWindowSize} from 'react-use';
import useMeasure from 'react-use-measure';

// constants
import {PRODUCT_STATUSES} from '@constants/options';
import {TOP_SELLING_COLUMN_DEFS} from '@constants/columnDefs';

// utils
import PropTypes from 'prop-types';
import classNames from 'classnames';

// data placeholder
import products from '@db/products';

const token = window.localStorage.getItem('authToken');

// Placeholder function for fetching experiments data
const fetchExperiments = async () => {
    try {
        const response = await fetch('https://synapso-19c916bc2798.herokuapp.com/api/researcher/experiment', {
            headers: {
                'Authorization': token, // Replace with your actual token
                // Add other necessary headers here
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch experiments:', error);
        return []; // Return an empty array in case of an error
    }
};

const fetchExperimentDetails = async (experimentType, experimentId) => {
    try {
        const url = `https://synapso-19c916bc2798.herokuapp.com/api/researcher/${experimentType}/${experimentId}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': token, // Replace with your actual token
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Failed to fetch experiment details:', error);
        return null; // or handle error appropriately
    }
};

const ProductsDisplay = ({view, setView, open, handler}) => {

    // New state for experiments data
    const [experiments, setExperiments] = useState([]);

    const {width} = useWindowSize();
    const [ref, {height}] = useMeasure();
    const [query, setQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');
    const [activeCollapse, setActiveCollapse] = useState('');

    // const filteredProducts = products.filter(product => {
    //     return product.name.toLowerCase().includes(query.toLowerCase())
    // }).filter(product => {
    //     if (activeFilter === 'all') return product;
    //     return product.status === activeFilter;
    // })

    // const getQty = (value) => {
    //     if (value === 'all') return products.length;
    //     return products.filter(product => product.status === value).length;
    // }

    const step = view === 'grid' ? (width < 1280 ? 10 : 12) : 10;

    // const pagination = usePagination(filteredProducts, step);

    // Placeholder for export function
    const exportFunction = async (experimentId, experimentType) => {
        try {
            const url = `https://synapso-19c916bc2798.herokuapp.com/api/researcher/result/${experimentId}?experimentType=${experimentType}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': token, // Replace with your actual token
                    // Add other necessary headers here
                }
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            // Getting the text from the response
            const text = await response.text();
    
            // Creating a Blob from the text
            const blob = new Blob([text], { type: 'text/csv' });
    
            // Creating a URL for the Blob
            const downloadUrl = window.URL.createObjectURL(blob);
    
            // Creating a temporary link element to download the Blob
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = `experiment_${experimentId}_${experimentType}.csv`; // Naming the download file
            document.body.appendChild(a);
            a.click();
            a.remove();
    
            // Releasing the created object URL
            window.URL.revokeObjectURL(downloadUrl);
        } catch (error) {
            console.error('Failed to export experiment:', error);
            // Handle error scenarios here
        }
    };

    const [showModal, setShowModal] = useState(false);
    const [currentExperiment, setCurrentExperiment] = useState(null);

    const viewExperiment = async (experimentId) => {
        const details = await fetchExperimentDetails(experimentId);
        if (details) {
            setCurrentExperiment(details);
            setShowModal(true);
        }
    };

    const menu = (experiment) => (
        <Menu>
            <Menu.Item key="1" onClick={() => exportFunction(experiment.id, experiment.type)}>
                Export
            </Menu.Item>
            <Menu.Item key="2" onClick={() => viewExperiment(experiment.id)}>
                View
            </Menu.Item>
        </Menu>
    );

    useEffect(() => {
        document.documentElement.style.setProperty('--products-display-height', `${height.toFixed(2)}px`);
    }, [height]);

    // Fetch and set experiments data
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchExperiments();
            setExperiments(data);
        };
        fetchData();
    }, []);

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Type', dataIndex: 'type', key: 'type' },
        { title: 'Distraction Type', dataIndex: 'distractionType', key: 'distractionType' },
        { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt' },
        { title: 'Stimulus Type', dataIndex: 'stimulusType', key: 'stimulusType' },
        { title: 'Users Responded', dataIndex: 'usersResponded', key: 'usersResponded' },
        {
            title: 'Action',
            key: 'action',
            render: (_, experiment) => ( // Here, experiment represents the entire experiment object for the row
                <Dropdown overlay={menu(experiment)} trigger={['click']}>
                    <Button type="text">
                        <MoreOutlined style={{ fontSize: '20px' }} />
                    </Button>
                </Dropdown>
            ),
        },
    ];

    return (
        <>
            <div className="experiments-display">
                <BasicTable
                    columns={columns}
                    dataSource={experiments}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                    locale={{ emptyText: <Empty text="No Experiments Found"/> }}
                />
            </div>
            {
                showModal && (
                    <Spring className="layout-wrapper h-full">
                        <div className="modal-content">
                            <button onClick={() => setShowModal(false)}>Close</button>
                            <form className="h-full grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
                                {/* Experiment Name */}
                                <div className="field-wrapper">
                                    <label className="field-label" htmlFor="expname">Experiment Name</label>
                                    <input className="field-input"
                                        id="expname"
                                        value={currentExperiment.name}
                                        readOnly />
                                </div>

                                {/* Experiment Type */}
                                <div className="field-wrapper">
                                    <label className="field-label" htmlFor="type">Experiment Type</label>
                                    <input className="field-input"
                                        id="type"
                                        value={currentExperiment.type}
                                        readOnly />
                                </div>

                                {/* Experiment Instruction */}
                                <div className="field-wrapper">
                                    <label className="field-label" htmlFor="expinstr">Experiment Instruction</label>
                                    <textarea className="field-input !h-[88px] !py-4"
                                            id="expinstr"
                                            value={currentExperiment.instructionText}
                                            readOnly />
                                </div>

                                {/* Inter Stimuli Delay */}
                                <div className="field-wrapper">
                                    <label className="field-label" htmlFor="interStimuliDelay">Inter Stimuli Delay</label>
                                    <input className="field-input"
                                        type="number"
                                        id="interStimuliDelay"
                                        value={currentExperiment.interStimuliDelay}
                                        readOnly />
                                </div>

                                {/* Distraction Enabled */}
                                <div className="field-wrapper">
                                    <label className="field-label" htmlFor="isDistractionEnabled">Enable Distraction</label>
                                    <input className="field-input"
                                        type="checkbox"
                                        id="isDistractionEnabled"
                                        checked={currentExperiment.isDistractionEnabled}
                                        readOnly />
                                </div>

                                {/* Distraction Duration */}
                                {currentExperiment.isDistractionEnabled && (
                                    <div className="field-wrapper">
                                        <label className="field-label" htmlFor="distractionDuration">Distraction Duration</label>
                                        <input className="field-input"
                                            type="number"
                                            id="distractionDuration"
                                            value={currentExperiment.distractionDuration}
                                            readOnly />
                                    </div>
                                )}

                                {/* Distraction Text */}
                                {currentExperiment.isDistractionEnabled && (
                                    <div className="field-wrapper">
                                        <label className="field-label" htmlFor="distractionText">Distraction Text</label>
                                        <input className="field-input"
                                            type="text"
                                            id="distractionText"
                                            value={currentExperiment.distractionText}
                                            readOnly />
                                    </div>
                                )}

                                {/* Data Fields */}
                                {currentExperiment.data && currentExperiment.data.map((field, index) => (
                                    <div key={index} className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
                                        <div className="field-wrapper">
                                            <label className="field-label">Displayed Data</label>
                                            <input className="field-input"
                                                type="text"
                                                value={field.displayed}
                                                readOnly />
                                        </div>
                                        <div className="field-wrapper">
                                            <label className="field-label">Hidden Data</label>
                                            <input className="field-input"
                                                type="text"
                                                value={field.hidden}
                                                readOnly />
                                        </div>
                                        <div className="field-wrapper">
                                            <label className="field-label">Duration</label>
                                            <input className="field-input"
                                                type="number"
                                                value={field.delay}
                                                readOnly />
                                        </div>
                                    </div>
                                ))}

                                {/* Buttons */}
                                <div className="grid grid-cols-2 gap-4 md:gap-6 md:flex md:ml-auto">
                                    <button className="btn btn--base md:w-[120px]" type="reset" onClick={() => setShowModal(false)}>
                                        Close
                                    </button>
                                </div>
                            </form>
                        </div>
                    </Spring>
                )
            }
        </>
    );
}

ProductsDisplay.propTypes = {
    view: PropTypes.string.isRequired,
    setView: PropTypes.func.isRequired
}

export default ProductsDisplay

