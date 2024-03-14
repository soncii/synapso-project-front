// components
import AuthLayout from '@components/AuthLayout';
import PasswordInput from '@components/PasswordInput';
import Select from '@ui/Select';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useState } from 'react';
import { format } from 'date-fns';

// hooks
import {useForm, Controller} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {useTheme} from '@contexts/themeContext';
import { GENDER } from '@constants/options';

// utils
import classNames from 'classnames';

const SignUp = () => {
    const {register, control, handleSubmit, formState: {errors}} = useForm();
    const navigate = useNavigate();
    const {theme} = useTheme();
    const [dateOfBirth, setDateOfBirth] = useState(null);

    const onSubmit = async (data) => {
        if (Object.keys(errors).length > 0) {
            // Display a notification or set a state to show an error message
            alert("Please complete all required fields correctly."); // Example using a simple alert
            return; // Exit the function to prevent submitting
        }

        const formattedDateOfBirth = dateOfBirth ? format(dateOfBirth, 'dd.MM.yyyy') : '';

        const payload = {
            name: data.name,
            surname: data.surname,
            email: data.email,
            password: data.password,
            mobile_number: data.mobile,
            gender: data.gender.value, // Assuming gender is a select with value and label
            date_of_birth: formattedDateOfBirth,
            role: "researcher"
        };
    
        try {
            const response = await fetch('https://synapso-19c916bc2798.herokuapp.com/api/sign-up', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });
    
            if (response.ok) {
                navigate('/sign-in');
            } else {
                // Handle errors
                const errorData = await response.json();
                alert(errorData.Message);
            }
        } catch (error) {
            // Handle network errors
            alert('A network error occurred');
        }
    };

    return (
        <AuthLayout title="Create an Account">
            <div className="flex flex-col gap-6">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-5 mb-6">
                        <div className="field-wrapper">
                            <label className="field-label" htmlFor="name">
                                Name
                            </label>
                            <input className={classNames('field-input', {'field-input--error': errors.name})}
                                   id="name"
                                   type="text"
                                   placeholder="Enter your name"
                                   {...register('name', {required: true})}/>
                            {errors.name && <span style={{ color: 'red' }}>This field is required</span>}
                        </div>
                        <div className="field-wrapper">
                            <label className="field-label" htmlFor="surname">
                                Surname
                            </label>
                            <input className={classNames('field-input', {'field-input--error': errors.surname})}
                                   id="surname"
                                   type="text"
                                   placeholder="Enter your surname"
                                   {...register('surname', {required: true})}/>
                            {errors.surname && <span style={{ color: 'red' }}>This field is required</span>}
                        </div>
                        <div className="field-wrapper">
                            <label className="field-label" htmlFor="type">
                                Gender
                                </label>
                                <Controller name="gender"
                                control={control}
                                rules={{required: true}}
                                render={({field}) => (
                                <Select
                                className={classNames('field-input', {'field-input--error': errors.category})}
                                id="gender"
                                placeholder="Select gender"
                                options={GENDER}
                                value={field.value}
                                onChange={field.onChange}
                                innerRef={field.ref}
                                variant="basic"
                                />
                                )}/>
                            {errors.gender && <span style={{ color: 'red' }}>This field is required</span>}
                        </div>
                        <div className="field-wrapper">
                            <label className="field-label" htmlFor="dateOfBirth">
                                Date of Birth
                            </label>
                            <DatePicker 
                                selected={dateOfBirth}
                                onChange={(date) => setDateOfBirth(date)} 
                                dateFormat="dd.MM.yyyy"
                                peekNextMonth
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select" 
                                className={classNames('field-input', {'field-input--error': errors.dateOfBirth})}
                                wrapperClassName="date-picker"
                                placeholderText="dd.mm.yyyy"
                            />
                            {errors.dateOfBirth && <span style={{ color: 'red' }}>This field is required</span>}
                        </div>
                        <div className="field-wrapper">
                            <label className="field-label" htmlFor="mobile">
                                Mobile Number
                            </label>
                            <input 
                                className={classNames('field-input', {'field-input--error': errors.mobile})}
                                id="mobile"
                                type="tel" // Using type 'tel' for telephone numbers
                                placeholder="Enter your mobile number"
                                {...register('mobile', {
                                    required: "Mobile number is required",
                                    pattern: {
                                        value: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, // Basic regex for phone numbers
                                        message: "Invalid mobile number" // Error message for the regex validation
                                    }
                                })}
                            />
                            {errors.mobile && <span style={{ color: 'red' }}>Invalid mobile number</span>}
                        </div>
                        <div className="field-wrapper">
                            <label className="field-label" htmlFor="email">
                                Email
                            </label>
                            <input className={classNames('field-input', {'field-input--error': errors.email})}
                                   id="email"
                                   type="text"
                                   placeholder="Enter your email"
                                   {...register('email', {required: true, pattern: /^\S+@\S+$/i})}/>
                            {errors.email && <span style={{ color: 'red' }}>Invalid email</span>}
                    </div>
                        <Controller name="password"
                                    control={control}
                                    rules={{required: true}}
                                    render={({field}) => (
                                        <PasswordInput id="password"
                                                       placeholder="Enter your password"
                                                       isInvalid={errors.password}
                                                       value={field.value}
                                                       onChange={field.onChange}
                                                       innerRef={field.ref}/>
                                    )}/>
                        {errors.password && <span style={{ color: 'red' }}>This field is required</span>}
                    </div>
                    <button className={`btn btn--primary w-full ${theme === 'light' ? 'green' : ''}`}
                            type="submit">
                        Create an Account
                    </button>
                </form>
                <p className="flex items-center justify-center gap-3">
                    Already have an Account?
                    <a className="font-semibold text-[15px] text-sidebar dark:text-peach hover:text-header"
                       href="/sign-in">
                        Sign In
                    </a>
                </p>
            </div>
        </AuthLayout>
    )
}

export default SignUp