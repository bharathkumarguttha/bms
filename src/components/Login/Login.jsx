import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const {
        register,
        formState: { errors },
        handleSubmit,
        getValues,
        reset
    } = useForm();
    const navigate = useNavigate();
    const onSubmit = (data) => {
        const existingUsers = JSON.parse(sessionStorage.getItem("registrationData"));
        const authenticatedUser = existingUsers?.find(user => user?.username === data?.username && user?.password === data?.password);
        if (authenticatedUser) {
            const userInfo = {
                userName: data.username,
                validUser: true
            }
            sessionStorage.setItem("loggedin-user", JSON.stringify(userInfo));
            reset();
            navigate('/dashboard');
        } else {
            alert("Invalid Credentials");
            reset();
        }

    }

    return (
        <div className='login-info--wrapper'>
            <h1 className='login-info--header'>Log into BMS below</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='bms-form'>
                <div className='bms-input--wrapper'>
                    <label>
                        Username:
                        <input
                            {...register("username", { required: 'Username is required' })}
                            className='bms-input--field'
                        />
                    </label>
                    {errors.username && (
                        <p className="bms-form-error-message">{errors.username.message}</p>
                    )}
                </div>
                <div className='bms-input--wrapper'>
                    <label>
                        Password:
                        <input
                            {...register("password", { required: 'Password is required' })}
                            className='bms-input--field'
                            type='password'
                        />
                    </label>
                    {errors.password && (
                        <p className="bms-form-error-message">{errors.password.message}</p>
                    )}
                </div>
                <input type="submit" className='cta-submit' value="Login" />
            </form>
        </div>
    )
}
