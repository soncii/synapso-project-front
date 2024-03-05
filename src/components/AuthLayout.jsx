// components
import Spring from '@components/Spring';
import {Helmet} from 'react-helmet';
import {ReactComponent as LogoIconLight} from '@assets/logo-alt-light.svg';
import LogoImage from '@assets/synapso_logo.jpg';

// utils
import PropTypes from 'prop-types';

const AuthLayout = ({title, children}) => {
    return (
        <>
            <Helmet>
                <title>{title} | Synapso Mind App</title>
            </Helmet>
            <div className="flex flex-col flex-1 justify-center items-center">
                <Spring className="bg-widget rounded-[20px] w-full p-5 xs:p-6 md:p-20" type="slideUp">
                    <div className="flex flex-col items-center text-center mb-6">
                        <h1 style={{ fontSize: '48px', color: '#1454D4' }}>Synapso</h1>
                        <h1 className="mt-4 mb-2">{title}</h1>
                        <p className="text-label">
                            Exploring the depths of memory, for a brighter, clearer tomorrow
                        </p>
                    </div>
                    {children}
                </Spring>
            </div>
        </>
    )
}

AuthLayout.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired
}

export default AuthLayout