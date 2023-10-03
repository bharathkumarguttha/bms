import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { getCountries, getStates } from 'country-state-picker';
import { useNavigate } from 'react-router-dom';

const accountTypes = [
    {
        "name": "Savings",
        "code": "savings",
    },
    {
        "name": "Salary",
        "code": "salary",
    },
]

const idProofType = [
    {
        "name": "Aadhar",
        "code": "aadhar",
    },
    {
        "name": "PAN",
        "code": "pan",
    },
    {
        "name": "Voter ID",
        "code": "voter",
    },
]

export default function Register() {
    const [selectedCountry, setSelectedCountry] = useState('');
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
        const currentUser = existingUsers?.find(user => user?.username === data?.username);
        let updatedUsers = [];
        if (currentUser) {
            updatedUsers = existingUsers?.map(exUser => {
                if (exUser => exUser?.username === data?.username) {
                    return {
                        ...exUser,
                        ...data
                    }
                }
                return exUser;
            })
        } else {
            updatedUsers = (existingUsers || []).concat(data);
        }
        sessionStorage.setItem("registrationData", JSON.stringify(updatedUsers));
        reset();
        alert("Registration succesful, redirecting to home page to login");
        navigate('/')
    }

    return (
        <div className='registration-info--wrapper'>
            <h1 className='registration-info--header'>Register with us by entering below details</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='bms-form'>
                <div className='bms-input--wrapper'>
                    <label>Customer Name:
                        <input
                            {...register("name", { required: 'Name is required', pattern: { value: /^[a-zA-Z ]*$/, message: "Name should only contain Alphabets and spaces" } })}
                            className='bms-input--field'
                        />
                    </label>
                    {errors.name && (
                        <p className="bms-form-error-message">{errors.name.message}</p>
                    )}
                </div>
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
                <div className='bms-input--wrapper'>
                    <label>
                        Address:
                        <textarea
                            {...register("address", { required: 'Address is required' })}
                            className='bms-input--field'
                        />
                    </label>
                    {errors.address && (
                        <p className="bms-form-error-message">{errors.address.message}</p>
                    )}
                </div>
                <div className='bms-select--wrapper'>
                    <label>
                        Country:
                        <select defaultValue='' {...register("country", { required: 'Country is required', onChange: e => setSelectedCountry(e.target.value) })} className='bms-select--field'>
                            <option value=''>Select a Country</option>
                            {getCountries()?.map(country => <option key={country.code} value={country.code}>{country.name}</option>)}
                        </select>
                    </label>
                    {errors.country && (
                        <p className="bms-form-error-message">{errors.country.message}</p>
                    )}
                </div>
                <div className='bms-select--wrapper'>
                    <label>
                        State:
                        <select defaultValue='' {...register("state", { required: 'State is required' })} className='bms-select--field'>
                            <option value=''>Select a State</option>
                            {getStates(selectedCountry)?.map(state => <option key={state} value={state}>{state}</option>)}
                        </select>
                    </label>
                    {errors.state && (
                        <p className="bms-form-error-message">{errors.state.message}</p>
                    )}
                </div>
                <div className='bms-input--wrapper'>
                    <label>
                        Email:
                        <input
                            {...register("mail", { required: "Email Address is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid Email" } })}
                            className='bms-input--field'
                        />
                    </label>
                    {errors.mail && <p className="bms-form-error-message">{errors.mail.message}</p>}
                </div>
                <div className='bms-input--wrapper'>
                    <label>
                        Phone number:
                        <input
                            {...register("phone", { required: 'Phone number is required', pattern: { value: /^[0-9]{10}$/, message: "Phone number should only have 10 digits" } })}
                            className='bms-input--field'
                            type="tel"
                        />
                    </label>
                    {errors.phone && (
                        <p className="bms-form-error-message">{errors.phone.message}</p>
                    )}
                </div>
                <div className='bms-input--wrapper'>
                    <label>
                        Enter Date Of Birth
                        <input
                            {...register("dob", { required: 'Date of birth is required' })}
                            className='bms-input--field'
                            type="date"
                        />
                    </label>
                    {errors.dob && (
                        <p className="bms-form-error-message">{errors.dob.message}</p>
                    )}
                </div>
                <div className='bms-select--wrapper'>
                    <label>
                        Account type:
                        <select defaultValue='' {...register("accounttype", { required: 'Account type is required' })} className='bms-select--field'>
                            <option value=''>Select an Account type</option>
                            {accountTypes?.map(account => <option key={account.code} value={account.code}>{account.name}</option>)}
                        </select>
                    </label>
                    {errors.accounttype && (
                        <p className="bms-form-error-message">{errors.accounttype.message}</p>
                    )}
                </div>
                <div className='bms-input--wrapper'>
                    <label>
                        Branch Name:
                        <input
                            {...register("branchname", { required: 'Branch name is required' })}
                            className='bms-input--field'
                        />
                    </label>
                    {errors.branchname && (
                        <p className="bms-form-error-message">{errors.branchname.message}</p>
                    )}
                </div>
                <div className='bms-input--wrapper'>
                    <label>
                        Initial Deposit:
                        <input
                            {...register("initialdeposit", { required: 'Initial deposit is required' })}
                            className='bms-input--field'
                        />
                    </label>
                    {errors.initialdeposit && (
                        <p className="bms-form-error-message">{errors.initialdeposit.message}</p>
                    )}
                </div>
                <div className='bms-select--wrapper'>
                    <label>
                        Identification type:
                        <select defaultValue='' {...register("idtype", { required: 'Identification type is required' })} className='bms-select--field'>
                            <option value=''>Select an Identification type</option>
                            {idProofType?.map(identity => <option key={identity.code} value={identity.code}>{identity.name}</option>)}
                        </select>
                    </label>
                    {errors.idtype && (
                        <p className="bms-form-error-message">{errors.idtype.message}</p>
                    )}
                </div>

                <div className='bms-input--wrapper'>
                    <label>
                        Identification document number:
                        <input
                            {...register("idno", { required: 'Identification doc number is required' })}
                            className='bms-input--field'
                        />
                    </label>
                    {errors.idno && (
                        <p className="bms-form-error-message">{errors.idno.message}</p>
                    )}
                </div>

                <input type="submit" className='cta-submit' value="Register" />
            </form>
        </div>
    )
}
