import React, { useEffect, useState } from "react";
import { Modal, Button, List } from "antd";
import { useCart } from "../context/carrito";

const CartModal = () => {
  const { cart, removeFromCart,decreaseQuantity, getTotalPrice } = useCart();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);
  useEffect(()=>{
    console.log(cart)
  },[cart])

  return (
    <>
      
      {cart.length > 0 && (
        <Button
          type="primary"
          onClick={showModal}
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 1000,
          }}
        >
          🛒 Ver Carrito ({cart.length})
        </Button>
      )}

      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        title="Carrito de Compras"
        width={600}
      >
        {cart.length > 0 ? (
          <List
            dataSource={cart}
            renderItem={(item) => (
              <List.Item
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "contain",
                    }}
                  />
                  <div>
                    <p style={{ margin: 0, fontWeight: "bold",width:"70%" }}>{item.title}</p>
                    <p style={{ margin: 0 }}>
                      Cantidad: {item.quantity} x ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div>
                  <div style={{display:"flex"}}>
                  <Button info onClick={()=>{decreaseQuantity(item.id)}}>
                    Eliminar
                </Button>
                <Button danger onClick={() => removeFromCart(item.id)}>
                  Cancelar
                </Button>
                  </div>
                
                </div>
                
              </List.Item>
            )}
          />
        ) : (
          <h2 style={{ textAlign: "center" }}>El carrito está vacío.</h2>
        )}
        {cart.length > 0 && (
          <div style={{ textAlign: "right", marginTop: "20px" }}>
            <p style={{ fontWeight: "bold" }}>Total: ${getTotalPrice().toFixed(2)}</p>
            <Button type="primary" onClick={() => alert("Gracias por su compra")}>
              Comprar Ahora
            </Button>
          </div>
        )}
      </Modal>
    </>
  );
};

export default CartModal;