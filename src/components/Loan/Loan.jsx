import React, { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';

export default function Loan() {
    const navigate = useNavigate();
    const loggedInUserInfo = JSON.parse(sessionStorage.getItem("loggedin-user"));

    useEffect(() => {
        if (!loggedInUserInfo) {
            alert("You are unauthorized user, please login to proceed");
            navigate('/');
        }
    }, [])
    return (
        <div>Loan component</div>
    )
}
