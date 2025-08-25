import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom"; // thêm useNavigate
import { Row, Col, Button, Badge, Container } from "react-bootstrap";
import { API } from "../utils/api";
import { CartContext } from "../contexts/CartContext";
import { WishlistContext } from "../contexts/WishlistContext";
import { AuthContext } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);
  const { wishlist, toggleWishlist } = useContext(WishlistContext); // lấy wishlist
  const { user } = useContext(AuthContext);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const res = await fetch(`${API.products}/${id}`);
      const data = await res.json();
      setProduct(data);
    })();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const isSale = product.tags?.includes("sale") && product.salePrice;
  const isHot = product.tags?.includes("hot");

  // check sản phẩm có trong wishlist chưa
  const isInWishlist = wishlist.some((item) => item.id === product.id);

  return (
    <Container style={{ marginTop: "40px", marginBottom: "40px" }}>
      <Row className="g-5 align-items-start">
      
        <Col md={6} className="text-center">
          <img
            src={product.image}
            alt={product.title}
            style={{
              maxWidth: "80%",
              borderRadius: 12,
              objectFit: "contain",
            }}
          />
        </Col>

        <Col md={6}>
          <h2 className="fw-bold mb-3">
            {product.title}{" "}
            {isHot && (
              <Badge bg="danger" className="ms-2">
                HOT
              </Badge>
            )}
          </h2>

   
          <div className="mb-4">
            {isSale ? (
              <>
                <span className="text-muted text-decoration-line-through me-2">
                  {product.price.toLocaleString()}₫
                </span>
                <span className="fw-bold text-danger fs-5">
                  {product.salePrice.toLocaleString()}₫
                </span>
              </>
            ) : (
              <span className="fw-bold fs-5">
                {product.price.toLocaleString()}₫
              </span>
            )}
          </div>

     
          <p className="text-muted mb-4" style={{ lineHeight: 1.6 }}>
            {product.description}
          </p>

  
          <div className="d-flex gap-3">
            <Button
              style={{ backgroundColor: "#006400", borderColor: "#006400" }}
              onClick={() => {
                addToCart(product);
                toast.addToast({ bg: "success", body: "Added to cart!" });
              }}
            >
              Add to Cart
            </Button>

            {isInWishlist ? (
              <Button
                variant="outline-success"
                onClick={() => navigate("/wishlist")}
              >
                Browse Wishlist
              </Button>
            ) : (
              <Button
                variant="outline-dark"
                style={{ color: "#006400", borderColor: "#006400" }}
                onClick={() => {
                  if (!user)
                    return toast.addToast({
                      bg: "info",
                      body: "Please sign in to save wishlist",
                    });
                  toggleWishlist(product);
                  toast.addToast({ bg: "success", body: "Added to wishlist!" });
                }}
              >
                Add to Wishlist
              </Button>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
