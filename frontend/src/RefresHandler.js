import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function RefreshHandler({ setIsAuthenticated }) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is authenticated by verifying the presence of a token in local storage
        if (localStorage.getItem("token")) {
            setIsAuthenticated(true); // Update authentication state
            
            // Redirect to home page if the user is on public pages
            if (
                location.pathname === "/" ||
                location.pathname === "/login" ||
                location.pathname === "/signup"
            ) {
                navigate("/home", { replace: true }); // Navigate to home page
            }
        }
    }, [location, navigate, setIsAuthenticated]); // Dependencies for useEffect

    return null; // Component does not render any UI
}

export default RefreshHandler;
