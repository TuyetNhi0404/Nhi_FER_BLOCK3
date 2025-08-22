import React, { useContext, useState } from "react";
import { ListGroup, Button, Toast, ToastContainer } from "react-bootstrap";
import { CartContext } from "./CartContext";

const Cart = ({ darkMode }) => {
  const { cartItems, removeFromCart, clearCart, totalValue } =
    useContext(CartContext);

  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const handleCheckout = () => {

    clearCart();
    setToastMsg("🎉 Đơn hàng của bạn đã được xác nhận và thanh toán thành công!");
    setShowToast(true);
  };

  return (
    <div className="mt-4">
      <h3 style={{ backgroundColor: "#1e6f1e", color: "white", padding: "10px" }}>🛒 Giỏ hàng</h3>

      {cartItems.length === 0 ? (
        <p style={{ padding: "10px", border: "1px dashed #ccc", color: "white" }}>Giỏ hàng của bạn đang trống.</p>
      ) : (
        <>
          <ListGroup>
            {cartItems.map((item) => (
              <ListGroup.Item
                key={item.id}
                className="d-flex justify-content-between align-items-center"
                style={{
                  backgroundColor: darkMode ? "#E1EDED" : "#fff",
                  color: darkMode ? "#4A4645" : "#212529",
                }}
              >
                {item.name} - ${item.price}
                <Button
                  size="sm"
                  variant="outline-success"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>

          <div className="mt-3">
            <p><strong>Tổng số món:</strong> {cartItems.length}</p>
            <p><strong>Tổng giá trị:</strong> ${totalValue}</p>
            <Button
              variant="outline-secondary"
              className="me-2"
              onClick={clearCart}
            >
              Clear Cart
            </Button>
            <Button
              style={{ backgroundColor: "#9acd32", border: "none" }}
              onClick={handleCheckout}
            >
              Xác nhận đơn hàng
            </Button>
          </div>
        </>
      )}

    
      <ToastContainer  position="top-end"
            className="p-3"
            style={{ position: "fixed", top: 20, right: 20, zIndex: 9999 }}>
        <Toast
          bg={toastMsg.includes("⚠️") ? "warning" : "success"}
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={5000}
          autohide
        >
          <Toast.Header closeButton={false}>
            <strong className="me-auto">Thông báo</strong>
          </Toast.Header>
          <Toast.Body className={darkMode ? "text-light" : "text-dark"}>
            {toastMsg}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default Cart;
