// components
import Spring from '@components/Spring';
import { toast } from 'react-toastify';
import Select from '@ui/Select';

// hooks
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';

// constants
import { PRODUCT_CATEGORIES } from '@constants/options';
import { DISTRACTION_TYPES } from '@constants/options';

// utils
import classNames from 'classnames';
import '@styles/CustomToastify.css';

const ProductCreator = () => {

    const [isDistractionEnabled, setIsDistractionEnabled] = useState(false);
    const [distractionType, setDistractionType] = useState('');
    const [distractionText, setDistractionText] = useState('');
    const [distractionDuration, setDistractionDuration] = useState(0);
    const [interStimuliDelay, setInterStimuliDelay] = useState(0);
    const { register, handleSubmit, control, formState: { errors }, reset, watch } = useForm();

    const [dataFields, setDataFields] = useState([
        { dispdata: '', hiddata: '', duration: '' }
    ]);

    const checkKeydown = e => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    }

    const onSubmit = async (formData) => {
        const experimentData = {
                instructionText: formData.expinstr,
                recallInstructionText: formData.recallexpinstr,
                name: formData.expname,
                type: formData.exptype.value,
                data: dataFields.map(field => ({
                    displayed: field.dispdata,
                    hidden: field.hiddata,
                    delay: parseInt(field.duration, 10)
                })),
                isDistractionEnabled: isDistractionEnabled,
                distractionType: formData.distractionType ? formData.distractionType.value : '',
                distractionText: distractionText,
                distractionDuration: parseInt(distractionDuration, 10),
                interStimuliDelay: parseInt(interStimuliDelay, 10)
        };

        const token = window.localStorage.getItem('authToken');

        try {
            const response = await fetch('https://synapso-19c916bc2798.herokuapp.com/api/researcher/recognition', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(experimentData) // Sending experimentData instead of payload
            });
    
            if (response.ok) {
                toast.success('Experiment created successfully');
            } else {
                toast.error('Error creating experiment');
            }
        } catch (error) {
            toast.error('Network error');
        }
    };

    const addFieldGroup = () => {
        setDataFields([...dataFields, { dispdata: '', hiddata: '', duration: '' }]);
    };

    const handleReset = () => {
        // Reset form fields managed by useForm
        reset({
            expname: '',
            expinstr: '',
            exptype: '',
            recallexpinstr: '',
        });

        // Reset the states managed by useState
        setIsDistractionEnabled(false);
        setDistractionType('');
        setDistractionText('');
        setDistractionDuration(0);
        setInterStimuliDelay(0);
        setDataFields([{ dispdata: '', hiddata: '', duration: '' }]); // Resets to initial state
    };
         

    return (
        <Spring className="layout-wrapper h-full">
            <form className="h-full grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2"
                  onSubmit={handleSubmit(onSubmit)}
                  onKeyDown={checkKeydown}>
                <div className="card p-5 flex flex-col gap-4 xs:p-6 md:gap-6">
                    <div className="flex flex-col gap-3 md:gap-4">
                        <h2>Description</h2>
                        <div
                            className="card-container card-container--light p-4 rounded-2xl flex flex-col gap-3 md:gap-5">
                            <div className="field-wrapper">
                                <label className="field-label" htmlFor="expname">
                                    Experiment Name
                                </label>
                                <input className={classNames('field-input', {'field-input--error': errors.name})}
                                       id="expname"
                                       placeholder="Enter Experiment Name"
                                       {...register('expname', {required: true})} />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 md:gap-4">
                        <h2>Experiment Type</h2>
                        <div
                            className="card-container card-container--light p-4 rounded-2xl flex flex-col gap-3 md:gap-5">
                            <div className="field-wrapper">
                                <label className="field-label" htmlFor="type">
                                    Experiment Type
                                </label>
                                <Controller name="exptype"
                                            control={control}
                                            rules={{required: true}}
                                            render={({field}) => (
                                                <Select
                                                    className={classNames('field-input', {'field-input--error': errors.category})}
                                                    id="exptype"
                                                    placeholder="Select Type"
                                                    options={PRODUCT_CATEGORIES}
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    innerRef={field.ref}
                                                    variant="basic"
                                                />
                                            )}/>
                            </div>
                            <div className="field-wrapper">
                                <label className="field-label" htmlFor="expinstr">
                                    Experiment Instruction
                                </label>
                                <textarea className="field-input !h-[88px] !py-4"
                                          id="expinstr"
                                          placeholder="Enter Experiment Instruction"
                                          {...register('expinstr')} />
                            </div>
                            <div className="field-wrapper">
                                <label className="field-label" htmlFor="recallexpinstr">
                                    Pre-Recognition Stage Instruction
                                </label>
                                <textarea className="field-input !h-[88px] !py-4"
                                          id="recallexpinstr"
                                          placeholder="Please choose one word that you have seen before. Press start if you are ready to begin."
                                          {...register('recallexpinstr')} />
                            </div>
                        </div>
                    </div>

                    <div
                        className="card-container card-container--light p-4 rounded-2xl flex flex-col gap-3 md:gap-5">
                        <div className="field-wrapper">
                            <label className="field-label" htmlFor="interStimuliDelay">
                                Inter Stimuli Delay
                                </label>
                            <input className={classNames('field-input', {'field-input--error': errors.name})}
                                    type="number"
                                    placeholder="Type a number"
                                    value={interStimuliDelay}
                                    onChange={e => setInterStimuliDelay(e.target.value)} />
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 md:gap-4">
                        <h2>Distraction</h2>
                        <div
                            className="card-container card-container--light p-4 rounded-2xl flex flex-col gap-3 md:gap-5">
                            <div className="field-wrapper">
                                <label className="field-label" htmlFor="isDistractionEnabled">
                                    Enable Distraction
                                    </label>
                                    <input className={classNames('field-input', {'field-input--error': errors.name})}
                                    type="checkbox"
                                    checked={isDistractionEnabled}
                                    onChange={e => setIsDistractionEnabled(e.target.checked)} />
                            </div>

                            {isDistractionEnabled && (
                                <>
                                    <div className="field-wrapper">
                                        <label className="field-label" htmlFor="distractionDuration">
                                            Enter Distraction Duration
                                            </label>
                                            <input className={classNames('field-input', {'field-input--error': errors.name})}
                                            type="number"
                                            placeholder="Distraction Duration"
                                            value={distractionDuration}
                                            onChange={e => setDistractionDuration(e.target.value)} />
                                    </div>

                                    <label className="field-label" htmlFor="distractionType">
                                        Choose Distraction Type
                                    </label>
                                    <Controller
                                        name="distractionType"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                className={classNames('field-input', {'field-input--error': errors.distractionType})}
                                                id="distractionType"
                                                placeholder="Select Distraction Type"
                                                options={DISTRACTION_TYPES}
                                                value={field.value}
                                                onChange={field.onChange}
                                                innerRef={field.ref}
                                                variant="basic"
                                                disabled={!isDistractionEnabled} // Disable if distractions are not enabled
                                            />
                                        )}
                                    />

                                    <div className="field-wrapper">
                                            <label className="field-label" htmlFor="distractionText">
                                                Enter Distraction Text
                                                </label>
                                                <input className={classNames('field-input', {'field-input--error': errors.name})}
                                                type="text"
                                                placeholder="Distraction Text (Do not type anything, if it's math problem)"
                                                value={distractionText}
                                                onChange={e => setDistractionText(e.target.value)} />
                                    </div>
                                </>
                            )}
                    </div>
                </div>

                </div>
                <div className="card-container card-container--light p-4 rounded-2xl flex flex-col gap-3 md:gap-5">
                    <h2>Data</h2>
                    <div>
                        {dataFields.map((field, index) => (
                            <div key={index} className={`grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4 ${index !== 0 ? 'mt-6' : ''}`}>
                                <div className="field-wrapper">
                                    <label className="field-label" htmlFor={`dispdata-${index}`}>
                                        Displayed Data
                                    </label>
                                    <input
                                        className={classNames('field-input', {'field-input--error': errors.dispdata})}
                                        id={`dispdata-${index}`}
                                        type="text"
                                        placeholder="Enter displayed text"
                                        value={field.dispdata}
                                        onChange={e => {
                                            const newDataFields = [...dataFields];
                                            newDataFields[index].dispdata = e.target.value;
                                            setDataFields(newDataFields);
                                        }}
                                    />
                                </div>
                                <div className="field-wrapper">
                                    <label className="field-label" htmlFor={`hiddata-${index}`}>
                                        Hidden Data
                                    </label>
                                    <input
                                        className={classNames('field-input', {'field-input--error': errors.hiddata})}
                                        id={`hiddata-${index}`}
                                        type="text"
                                        placeholder="Enter hidden text"
                                        value={field.hiddata}
                                        onChange={e => {
                                            const newDataFields = [...dataFields];
                                            newDataFields[index].hiddata = e.target.value;
                                            setDataFields(newDataFields);
                                        }}
                                    />
                                </div>
                                <div className="field-wrapper">
                                    <label className="field-label" htmlFor={`duration-${index}`}>
                                        Duration
                                    </label>
                                    <input
                                        className={classNames('field-input', {'field-input--error': errors.duration})}
                                        id={`duration-${index}`}
                                        type="number"
                                        placeholder="Enter Duration"
                                        value={field.duration}
                                        onChange={e => {
                                            const newDataFields = [...dataFields];
                                            newDataFields[index].duration = e.target.value;
                                            setDataFields(newDataFields);
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                        <button style={{ marginTop: '20px' }}
                                type="button" // Explicitly set the type to "button"
                                onClick={() => {setDataFields([...dataFields, { dispdata: '', hiddata: '', duration: '' }]);}}
                        >
                            Add More Fields
                        </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4 md:gap-6 md:flex md:ml-auto">
                        <button 
                            className="btn btn--base md:w-[120px]" 
                            type="button" // Set type to button to prevent form submission
                            onClick={handleReset} // Call handleReset function on click
                        >
                            Cancel
                        </button>
                        <button className="btn btn--primary md:w-[120px]" type="submit">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </Spring>
    )
}

export default ProductCreator