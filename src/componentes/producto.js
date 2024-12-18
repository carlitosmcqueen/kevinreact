import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "antd";
import { useCart } from "../context/carrito";

const ProductDetail = () => {
  const { id } = useParams(); // Obtiene el ID del producto desde la URL
  const [producto, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart(); // Usamos el hook del carrito

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Cargando...</h2>;
  }

  if (!producto) {
    return <h2 style={{ textAlign: "center" }}>Producto no encontrado</h2>;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column", 
          gap: "20px",
          padding: "40px",
          backgroundColor: "rgb(255, 252, 244)",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "1200px",
          alignItems: "center",
        }}
      >
        <img
          src={producto.image}
          alt={producto.title}
          style={{
            width: "100%",
            maxWidth: "300px",
            height: "auto",
            objectFit: "contain",
            borderRadius: "10px",
            border: "1px solid #ddd",
          }}
        />
        
        <div
          style={{
            flex: 1,
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "24px",
              color: "#2c3e50",
              fontWeight: "bold",
              margin: "0 0 10px",
            }}
          >
            {producto.title}
          </h1>
          <p
            style={{
              fontSize: "18px",
              color: "#555",
              lineHeight: "1.6",
              margin: "0 0 20px",
              padding:"0px 50px"
            }}
          >
            {producto.description}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              width: "100%", 
              marginBottom: "20px", 
            }}
          >
            <p
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                color: "#27ae60",
                marginTop: "10px",
              }}
            >
              Precio: ${producto.price}
            </p>
            <p
              style={{
                color: "#f39c12",
                fontSize: "16px",
                marginTop: "5px",
                fontWeight:"bold"
              }}
            >
              ⭐ {producto.rating?.rate} / 5 ({producto.rating?.count} reviews)
            </p>
          </div>

          <Button
            type="primary"
            onClick={() => addToCart(producto)}
            style={{
                marginTop: "20px",
                width: "80%",
                fontWeight: "bold",
                backgroundColor: "black",
                borderColor: "black",
                color: "white", 
                }}
            >
                AGREGAR AL CARRITO
            </Button>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
