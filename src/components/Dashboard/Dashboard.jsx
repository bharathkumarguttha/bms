import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Dashboard.css';

export default function Dashboard() {
    const navigate = useNavigate();
    const loggedInUserInfo = JSON.parse(sessionStorage.getItem("loggedin-user"));
    const { loanData } = useSelector(state => state.loan);
    const { loantype, loanamount, loanapplydate, loanduration, roi } = loanData;
    useEffect(() => {
        if (!loggedInUserInfo) {
            navigate('/');
        }
    }, [])
    const handleLogout = () => {
        sessionStorage.removeItem("loggedin-user");
        navigate('/')
    }
    return (
        <div className='main-wrapper'>
            <header className='dashboard-header'>
                <button className='cta-logout' onClick={handleLogout}>Logout</button>
            </header>
            <h1 className='welcome-header' data-testid="dashboard-header">Customer Dashboard</h1>
            <div className='user-links--wrapper'>
                <div className='user-links user-links-loan'>
                    <p className='user-link-message'>Please apply a loan(Education/Personal) below </p>
                    <Link className='user-link' to="/loan">Apply Loan</Link>
                </div>

                <div className='user-links user-links-deposit'>
                    <p className='user-link-message'>Please deposit the amount you wish below</p>
                    <Link className='user-link' to="/deposit">Deposit</Link>
                </div>
            </div>
            {Object.keys(loanData).length > 0 && (
                <div className='loan-details-wrapper'>
                    <h2 className='loan-details--header'>Check your applied/existing loan details below</h2>
                    <p>Loan Amount : {loanamount}</p>
                    <p>Loan Applied Date : {loanapplydate}</p>
                    <p className='loan-details--type'>Loan Type : {loantype}</p>
                    <p>Loan Duration in years : {loanduration}</p>
                    <p>Rate of interest(%) : {roi}</p>
                </div>
            )
            }
        </div>
    )
}
