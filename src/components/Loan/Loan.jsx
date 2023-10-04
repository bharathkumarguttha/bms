import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';

const loanTypes = [
    {
        name: "Education",
        code: "education"
    },
    {
        name: "Personal",
        code: "personal"
    },
    {
        name: "Home",
        code: "home"
    }
]

const loanDurationValues = [5, 10, 15, 20];

const getRateOfInterest = (loanType) => {
    if (loanType === 'home') return 7;
    else if (loanType === 'education') return 9;
    else if (loanType === 'personal') return 14;
    else return 0;
}

export default function Loan() {
    const {
        register,
        formState: { errors },
        handleSubmit,
        getValues,
        reset,
        setValue
    } = useForm();
    const navigate = useNavigate();
    const loggedInUserInfo = JSON.parse(sessionStorage.getItem("loggedin-user"));
    const [selectedLoanType, setSelectedLoanType] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        if (!loggedInUserInfo) {
            alert("You are unauthorized user, please login to proceed");
            navigate('/');
        }
    }, [])

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        document.getElementsByClassName("bms-input--field-date")[0].setAttribute('min', today);
    }, [])
    const onSubmit = (data) => {
        const { loantype, loanamount, loanapplydate, loanduration } = data;
        const loanData = {
            loantype,
            loanamount,
            loanapplydate,
            loanduration,
            roi: getRateOfInterest(loantype)
        }
        dispatch({ type: 'APPLY_LOAN', loanData });
        setSelectedLoanType('')
        reset();
        navigate('/dashboard');
    }
    return (
        <div className='loan-info--wrapper'>
            <h1 className='loan-info--header' data-testid="loan-header">Apply a loan  with us by entering below details</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='bms-form'>
                <div className='bms-select--wrapper'>
                    <label>
                        Loan Type:
                        <select defaultValue='' {...register("loantype", { required: 'Loan Type is required', onChange: e => { setSelectedLoanType(e.target.value); setValue('roi', getRateOfInterest(e.target.value)) } })} className='bms-select--field'>
                            <option value=''>Select a Loan Type</option>
                            {loanTypes.map(loan => <option key={loan.code} value={loan.code}>{loan.name}</option>)}
                        </select>
                    </label>
                    {errors.loantype && (
                        <p className="bms-form-error-message">{errors.loantype.message}</p>
                    )}
                </div>
                <div className='bms-input--wrapper'>
                    <label>
                        Loan Amount:
                        <input
                            {...register("loanamount", { required: 'Loan Amount is required' })}
                            className='bms-input--field'
                            type="number"
                        />
                    </label>
                    {errors.loanamount && (
                        <p className="bms-form-error-message">{errors.loanamount.message}</p>
                    )}
                </div>
                <div className='bms-input--wrapper'>
                    <label>
                        Loan Apply Date:
                        <input
                            {...register("loanapplydate", { required: 'Loan Apply Date is required' })}
                            className='bms-input--field bms-input--field-date'
                            type="date"
                        />
                    </label>
                    {errors.loanapplydate && (
                        <p className="bms-form-error-message">{errors.loanapplydate.message}</p>
                    )}
                </div>
                <div className='bms-input--wrapper'>
                    <label>
                        Rate Of Interest:
                        <input
                            {...register("roi", {
                                required: 'Rate of interest is required',
                                disabled: true,
                            })}
                            className='bms-input--field'
                        />
                    </label>
                    {errors.roi && (
                        <p className="bms-form-error-message">{errors.roi.message}</p>
                    )}
                </div>
                <div className='bms-select--wrapper'>
                    <label>
                        Loan Duration:
                        <select defaultValue='' {...register("loanduration", { required: 'Loan Duration is required' })} className='bms-select--field'>
                            <option value=''>Select a Loan Duration</option>
                            {loanDurationValues.map(duration => <option key={duration} value={duration}>{duration}</option>)}
                        </select>
                    </label>
                    {errors.loanduration && (
                        <p className="bms-form-error-message">{errors.loanduration.message}</p>
                    )}
                </div>
                {selectedLoanType === 'education' &&
                    <>
                        <div className='bms-input--wrapper'>
                            <label>
                                Course Fee:
                                <input
                                    {...register("coursefee", { required: 'Course Fee is required' })}
                                    className='bms-input--field'
                                    type="number"
                                />
                            </label>
                            {errors.coursefee && (
                                <p className="bms-form-error-message">{errors.coursefee.message}</p>
                            )}
                        </div>
                        <div className='bms-input--wrapper'>
                            <label>
                                Course:
                                <input
                                    {...register("course", { required: 'Course is required' })}
                                    className='bms-input--field'
                                />
                            </label>
                            {errors.course && (
                                <p className="bms-form-error-message">{errors.course.message}</p>
                            )}
                        </div>
                        <div className='bms-input--wrapper'>
                            <label>Father Name:
                                <input
                                    {...register("fathername", { required: 'Father Name is required', pattern: { value: /^[a-zA-Z ]*$/, message: "Name should only contain Alphabets and spaces" } })}
                                    className='bms-input--field'
                                />
                            </label>
                            {errors.fathername && (
                                <p className="bms-form-error-message">{errors.fathername.message}</p>
                            )}
                        </div>
                        <div className='bms-input--wrapper'>
                            <label>
                                Father Occupation:
                                <input
                                    {...register("fatheroccupation", { required: 'Father Occupation is required' })}
                                    className='bms-input--field'
                                />
                            </label>
                            {errors.fatheroccupation && (
                                <p className="bms-form-error-message">{errors.fatheroccupation.message}</p>
                            )}
                        </div>
                        <div className='bms-input--wrapper'>
                            <label>
                                Annual Income:
                                <input
                                    {...register("fatherannualincome", { required: 'Annual Income is required' })}
                                    className='bms-input--field'
                                    type="number"
                                />
                            </label>
                            {errors.fatherannualincome && (
                                <p className="bms-form-error-message">{errors.fatherannualincome.message}</p>
                            )}
                        </div>
                    </>
                }
                {
                    (selectedLoanType === 'home' || selectedLoanType === 'personal') &&
                    (<>
                        <div className='bms-input--wrapper'>
                            <label>
                                Annual Income:
                                <input
                                    {...register("annualincome", { required: 'Annual Income is required' })}
                                    className='bms-input--field'
                                    type="number"
                                />
                            </label>
                            {errors.annualincome && (
                                <p className="bms-form-error-message">{errors.annualincome.message}</p>
                            )}
                        </div>
                        <div className='bms-input--wrapper'>
                            <label>
                                Company Name:
                                <input
                                    {...register("companyname", { required: 'Company Name is required' })}
                                    className='bms-input--field'
                                />
                            </label>
                            {errors.companyname && (
                                <p className="bms-form-error-message">{errors.companyname.message}</p>
                            )}
                        </div>
                        <div className='bms-input--wrapper'>
                            <label>
                                Designation:
                                <input
                                    {...register("designation", { required: 'Designation is required' })}
                                    className='bms-input--field'
                                />
                            </label>
                            {errors.designation && (
                                <p className="bms-form-error-message">{errors.designation.message}</p>
                            )}
                        </div>
                        <div className='bms-input--wrapper'>
                            <label>
                                Total Experience in months :
                                <input
                                    {...register("experience", { required: 'Experience is required' })}
                                    className='bms-input--field'
                                    type="number"
                                />
                            </label>
                            {errors.experience && (
                                <p className="bms-form-error-message">{errors.experience.message}</p>
                            )}
                        </div>
                        <div className='bms-input--wrapper'>
                            <label>
                                Experience with current company in months:
                                <input
                                    {...register("tenure", { required: 'Experience with current company is required' })}
                                    className='bms-input--field'
                                    type="number"
                                />
                            </label>
                            {errors.tenure && (
                                <p className="bms-form-error-message">{errors.tenure.message}</p>
                            )}
                        </div>
                    </>)
                }

                <input type="submit" className='cta-submit' value="Apply Loan" />
            </form>
        </div>
    )
}
