
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { useState } from 'react';
import RefreshHandler from './RefresHandler'; // Corrected typo in filename




function App() {
  // State to track authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Private route wrapper to restrict access to authenticated users
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
 
    <div className="App">
      

      {/* RefreshHandler to check authentication status on page load */}
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />

      <Routes>
        {/* Redirect root URL to login page */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Protect home route for authenticated users */}
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        
      </Routes>
    
   
    </div>
  
  );
}

export default App;
