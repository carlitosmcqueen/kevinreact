import React from "react";
import { Link } from "react-router-dom"; 
import "../App.css"; // Importamos el CSS para los estilos

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-inside">
      <Link to="/productos">
          <img
            src="/ecommerce-market-marketplace-svgrepo-com.svg"
            alt="logo"
            width={120}
            height={45}
          />
        </Link>
      <h1>
      ecommerce
      </h1>
      </div>
      
    </div>
    
  );
};

export default Navbar;
