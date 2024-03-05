import {ReactComponent as Infinity} from '@assets/loader.svg';

const Loader = () => {
    return (
        <div className="w-full h-full flex flex-1 items-center justify-center">
            <Infinity className="text-sidebar dark:text-peach"/>
        </div>
    )
}

export default Loader