import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard() {
    const navigate = useNavigate();
    const loggedInUserInfo = JSON.parse(sessionStorage.getItem("loggedin-user"));
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
            <h1 className='welcome-header'>Customer Dashboard</h1>
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
        </div>
    )
}
