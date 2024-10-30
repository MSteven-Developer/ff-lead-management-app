import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { logout } from '../../Services/authServices';

const Header = () => {
    const navigate = useNavigate(); 

    const handleLogout = async () => {
        try {
            await logout();
            localStorage.removeItem('token'); 
            navigate('/login'); 
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <nav className="navbar navbar-light bg-light justify-content-between">
            <span className="navbar-brand mb-0 h1">Leads Management App</span>
            <button className="btn btn-outline-danger" onClick={handleLogout}>
                Logout
            </button>
        </nav>
    );
};

export default Header;