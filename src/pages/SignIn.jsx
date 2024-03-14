// components
import AuthLayout from '@components/AuthLayout';
import PasswordInput from '@components/PasswordInput';
import React, { useState } from 'react';

// hooks
import {useForm, Controller} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {useTheme} from '@contexts/themeContext';

// utils
import classNames from 'classnames';

const backgroundStyle = {
    backgroundImage: 'url("@public/synapsoback.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
};

const SignIn = () => {
    const {register, control, handleSubmit, formState: {errors}} = useForm();
    const navigate = useNavigate();
    const {theme} = useTheme();
    const [error, setError] = useState('');

    const onSubmit = async (data, event) => {
        event.preventDefault();
        const email = data.email; // Accesses the email value
        const password = data.password; // Accesses the password value

        const payload = JSON.stringify({
            email: email, 
            password: password, 
            role: 'researcher'
        });

        fetch('https://synapso-19c916bc2798.herokuapp.com/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: payload,
        })
        .then(response => {
            if (response.status === 401) {
                throw new Error('Incorrect email or password');
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem('authToken', data);
            navigate('/experiments');
        })
        .catch(err => {
            setError(err.message);
            console.error('Login error:', err);
        });
    };

    return (
        <AuthLayout title="Sign In" style={backgroundStyle}>
            <div className="flex flex-col gap-6">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="field-wrapper mb-5">
                        <label className="field-label" htmlFor="email">
                            Email
                        </label>
                        <input className={classNames('field-input', {'field-input--error': errors.email})}
                               id="email"
                               type="text"
                               placeholder="Enter your email"
                               {...register('email', {required: true, pattern: /^\S+@\S+$/i})}/>
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
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button className={`btn btn--primary w-full mt-6 ${theme === 'light' ? 'green' : ''}`}
                            type="submit">
                        Sign In
                    </button>
                </form>
                <p className="flex items-center justify-center gap-3">
                    Don't have an Account?
                    <a className="font-semibold text-[15px] text-sidebar dark:text-peach hover:text-header"
                       href="/sign-up">
                        Sign Up
                    </a>
                </p>
            </div>
        </AuthLayout>
    )
}

export default SignIn