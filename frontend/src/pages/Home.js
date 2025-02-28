import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import './home.css';

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Function to handle logout
    const handleLogout = useCallback(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Logged Out');

        setTimeout(() => {
            navigate('/login');
        }, 100);
    }, [navigate]);

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'));

        // Auto Logout after 1 minute (60 seconds)
        const logoutTimer = setTimeout(() => {
            handleLogout();
        }, 60 * 1000); // 1 minute

        return () => clearTimeout(logoutTimer);
    }, [handleLogout]);

    const fetchProducts = async () => {
        try {
            const url = "https://inventory-mangement-system-react.onrender.com/products";
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            };

            const response = await fetch(url, headers);
            const result = await response.json();
            console.log(result);
            setProducts(result);

        } catch (err) {
            handleError("Failed to fetch products. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="home-container">
            <h1>Welcome {loggedInUser}</h1>
            <button onClick={handleLogout}>Logout</button>

            <div className="product-list">
                {loading ? (
                    <p>Loading products...</p>
                ) : products ? (
                    products.map((item, index) => (
                        <ul key={index}>
                            <span>{item.name} : {item.price}</span>
                        </ul>
                    ))
                ) : (
                    <p>No products available.</p>
                )}
            </div>

            <ToastContainer />
        </div>
    );
}

export default Home;
