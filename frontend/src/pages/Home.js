import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import './home.css';

function Home() {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser') || "Guest");
    }, []);

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Logged Out');

        setTimeout(() => navigate('/login'), 1000);
    };

    // Fetch products
    const fetchProducts = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            handleError("Unauthorized. Please log in.");
            return;
        }

        try {
            const response = await fetch("https://inventory-mangement-system-react.onrender.com/products", {
                headers: { 'Authorization': token }
            });

            if (!response.ok) throw new Error("Failed to fetch products.");

            const result = await response.json();
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

            {/* Product List */}
            <div className="product-list">
                {loading ? (
                    <p>Loading products...</p>
                ) : products.length > 0 ? (
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
