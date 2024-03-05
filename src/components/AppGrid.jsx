// components
import {Responsive, WidthProvider} from 'react-grid-layout';
import {withSize} from 'react-sizeme';

// layouts
import layouts from '../layouts';

// hooks
import {useWindowSize} from 'react-use';

// utils
import PropTypes from 'prop-types';

const ResponsiveGridLayout = withSize({refreshMode: 'debounce'})(WidthProvider(Responsive));

const AppGrid = ({widgets, id, cols, gridBreakpoints}) => {
    const {width} = useWindowSize();
    const breakpoints = {
        md: width >= 768 && width < 1280,
        lg: width >= 1280 && width < 1440,
        xl: width >= 1440
    }

    const drawWidgets = () => {
        return Object.keys(widgets).map(widget => {
            return (
                <div key={widget}>
                    {widgets[widget]}
                </div>
            )
        })
    }

    return (
        <div className="p-4 !pt-0 md:p-6 xl:p-8 4xl:p-0">
            {
                width >= 768 ?
                    <ResponsiveGridLayout
                        className="layout overflow-hidden"
                        layouts={layouts[id]}
                        breakpoints={gridBreakpoints || breakpoints}
                        cols={cols ? cols : {xl: 3, lg: 3, md: 2}}
                        rowHeight={width >= 1280 ? 180 : 188}
                        isDraggable={false}
                        isResizable={false}
                        margin={{xl: [32, 32], lg: [32, 32], md: [24, 24]}}
                        useCSSTransforms={false}
                    >
                        {drawWidgets()}
                    </ResponsiveGridLayout>
                    :
                    <div className="grid grid-cols-1 gap-6">
                        {drawWidgets()}
                    </div>
            }
        </div>
    )
}

AppGrid.propTypes = {
    widgets: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    cols: PropTypes.object,
    gridBreakpoints: PropTypes.object
}

export default AppGrid