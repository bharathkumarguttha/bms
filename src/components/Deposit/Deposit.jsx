import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import './Deposit.css';

export default function Deposit() {
    const {
        register,
        formState: { errors },
        handleSubmit,
        getValues,
        reset
    } = useForm();
    const navigate = useNavigate();
    const { availableBalance } = useSelector(state => state.deposit);
    const dispatch = useDispatch();
    const loggedInUserInfo = JSON.parse(sessionStorage.getItem("loggedin-user"));
    const existingUsers = JSON.parse(sessionStorage.getItem("registrationData"));
    const currentUser = existingUsers?.find(user => user?.username === loggedInUserInfo?.userName);

    useEffect(() => {
        if (!loggedInUserInfo) {
            alert("You are unauthorized user, please login to proceed");
            navigate('/');
        }
    }, [])

    const onSubmit = (data) => {
        dispatch({ type: 'DEPOSIT_AMOUNT', amount: Number(data.depositamount) });
        reset();
    }
    return (
        <div className='deposit-wrapper'>
            <h1 className='deposit-wrapper--header'>You can deposit and check the available balance below</h1>
            <div className='deposit-details--card'>
                <h3 className='deposit-details--message'>Deposit Information</h3>
                <p className='deposit-details--account-type'>Account Type : {currentUser?.accounttype}</p>
                <p className='deposit-details--available-balance'>Available Balance : {availableBalance}</p>
            </div>
            <div className='deposit-form--wrapper'>
                <form onSubmit={handleSubmit(onSubmit)} className='bms-form'>
                    <div className='bms-input--wrapper'>
                        <label>
                            Enter Deposit Amount:
                            <input
                                {...register("depositamount", { required: 'Deposit Amount is required' })}
                                className='bms-input--field'
                            />
                        </label>
                        {errors.depositamount && (
                            <p className="bms-form-error-message">{errors.depositamount.message}</p>
                        )}
                    </div>
                    <input type="submit" className='cta-submit' value="Deposit" />
                </form>
            </div>
        </div>
    )
}
