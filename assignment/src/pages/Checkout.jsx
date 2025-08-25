import { useContext } from "react";
import { Button, Table } from "react-bootstrap";
import { CartContext } from "../contexts/CartContext";
import { AuthContext } from "../contexts/AuthContext";
import { API } from "../utils/api";
import { useToast } from "../contexts/ToastContext";

export default function Checkout() {
  const { items, subtotal, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const toast = useToast();

  const placeOrder = async () => {
    if (!items.length) return;
    if (!user) return toast.addToast({ bg: "info", body: "Please sign in to checkout" });
    const order = {
      userId: user.id,
      items,
      total: subtotal,
      date: new Date().toISOString(),
    };
    await fetch(API.orders, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });
    clearCart();
    toast.addToast({ bg: "success", body: "Order placed!" });
  };

  return (
    <div className="p-3 bg-dark text-light rounded">
      <h3 className="mb-3 text-success">Checkout</h3>
      {items.length === 0 ? (
        <div className="text-secondary">No items to checkout.</div>
      ) : (
        <>
          <Table
            bordered
            responsive
            striped
            className="table-dark border-success"
          >
            <thead className="table-success text-dark">
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((i) => (
                <tr key={i.id}>
                  <td>{i.title}</td>
                  <td>{i.price.toLocaleString()}₫</td>
                  <td>{i.qty}</td>
                  <td>{(i.price * i.qty).toLocaleString()}₫</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h5 className="mb-3 text-success">Total: {subtotal.toLocaleString()}₫</h5>
          <Button variant="success" className="fw-bold" onClick={placeOrder}>
            Confirm Order
          </Button>
        </>
      )}
    </div>
  );
}
