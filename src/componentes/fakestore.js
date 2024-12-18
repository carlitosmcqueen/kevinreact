import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";


const FakeStore = () => {
  const [productos, setProductos] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [buscador, setBuscador] = useState(""); 
  const [loading, setLoading] = useState(true); 


  useEffect(() => {
    // Fetch de productos
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProductos(data); 
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setBuscador(term);

    if (term === "") {
      setFilteredProducts(productos); 
    } else {
      const filtered = productos.filter((product) =>
        product.title.toLowerCase().includes(term)
      );
      setFilteredProducts(filtered);
    }
  };
 

  return (
    <div style={{ padding: "20px", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
            Productos de FakeStore API
        </h1>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px"}}>
            <input
                type="text"
                placeholder="Buscar producto por nombre..."
                value={buscador}
                onChange={handleSearch}
                style={{
                    width: "100%",
                    maxWidth: "400px",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    fontSize: "16px",
                }}
            />
        </div>
      {loading && <p style={{ textAlign: "center" }}>Cargando productos...</p>}
      <div
      style={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "20px"}}
      >
  {filteredProducts.map((product) => (
    <Link
      to={`/productos/${product.id}`}
      key={product.id}
      style={{
        width: "calc(20% - 20px)",
        minWidth: "220px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "15px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        backgroundColor: "rgb(255, 252, 244)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        height: "350px",
        textDecoration: "none", 
      }}
    >
      <img
        src={product.image}
        alt={product.title}
        style={{
          width: "150px",
          height: "150px",
          objectFit: "contain",
          marginBottom: "10px",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
        }}
      >
        <h3
          style={{
            fontSize: "14px",
            color: "#2c3e50",
            fontWeight: "bold",
            margin: "0",
          }}
        >
          {product.title}
        </h3>
        <p
          style={{
            fontWeight: "bold",
            fontSize: "16px",
            color: "#27ae60",
            margin: "0",
          }}
        >
          ${product.price}
        </p>
        <p
          style={{
            fontSize: "14px",
            fontWeight: 'bold',
            color: "#f39c12",
            margin: "0",
          }}
        >
          ⭐ {product.rating?.rate} / 5
        </p>
        <Button
          style={{
            margin: "0 auto",
            marginTop: "auto",
            fontWeight: "bold",
            backgroundColor: "black",
            borderColor: "black",
            color: "white", 
          }}
        >
          Ver Descripción
        </Button>
      </div>
    </Link>
  ))}
</div>
     
    </div>
  );
};

export default FakeStore;
