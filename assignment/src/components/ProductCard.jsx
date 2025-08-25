
import { Card, Button, Badge } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext, useMemo } from "react";
import { CartContext } from "../contexts/CartContext";
import { WishlistContext } from "../contexts/WishlistContext";
import { AuthContext } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import { ShoppingCart, Heart, Eye, Star } from "lucide-react";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, ids } = useContext(WishlistContext);
  const { user } = useContext(AuthContext);
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const isSale = product.tags?.includes("sale") && product.salePrice;
  const isHot = product.tags?.includes("hot");
  const wished = useMemo(() => ids.has(product.id), [ids, product.id]);

  const onAddCart = () => {
    addToCart(product);
    toast.addToast({ bg: "success", body: `${product.title} added to cart!` });
  };

  const onWishlist = () => {
    if (!user) {
      navigate(`/login?redirect_uri=${encodeURIComponent(location.pathname)}`);
      return;
    }
    toggleWishlist(product);
    toast.addToast({ 
      bg: wished ? "info" : "success", 
      body: wished ? "Removed from wishlist" : "Added to wishlist!" 
    });
  };

  const discountPercentage = isSale 
    ? Math.round(((product.price - product.salePrice) / product.price) * 100) 
    : 0;

  return (
    <Card className="h-100 bg-dark text-light border-success shadow">
 
      <div className="position-relative" style={{ height: "320px", overflow: "hidden" }}>

        <div className="position-absolute top-0 start-0 m-2 z-3 d-flex flex-column gap-1">
          {isHot && (
            <Badge bg="danger" className="d-flex align-items-center gap-1">
              <Star size={12} fill="currentColor" />
              HOT
            </Badge>
          )}
          {isSale && (
            <Badge bg="warning" text="dark" className="fw-bold">
              -{discountPercentage}%
            </Badge>
          )}
        </div>

 
        <Button
          variant={wished ? "danger" : "outline-secondary"}
          size="sm"
          className="position-absolute top-0 end-0 m-2 rounded-circle p-2 z-3"
          onClick={onWishlist}
          style={{ width: '40px', height: '40px' }}
        >
          <Heart 
            size={16} 
            fill={wished ? "currentColor" : "none"}
          />
        </Button>

        <Card.Img
          variant="top"
          src={product.image}
          alt={product.title}
          className="w-100 h-100"
          style={{
            objectFit: "contain",
            backgroundColor: "#fff"
          }}
        />
      </div>

   
      <Card.Body className="d-flex flex-column p-3">
    
        <Card.Title 
          className="fw-bold text-success" 
          style={{ 
            fontSize: "1.1rem", 
            lineHeight: "1.3",
            minHeight: "2.6rem",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden"
          }}
        >
          {product.title}
        </Card.Title>

       
        {product.name && (
          <Card.Subtitle className="mb-2 text-light">
            {product.name}
          </Card.Subtitle>
        )}

        {/* Price Section */}
        <div className="mb-3">
          {isSale ? (
            <div className="d-flex align-items-center gap-2 flex-wrap">
              <span className="me-2"
            style={{ color: "#aaa", textDecoration: "line-through" }}>
                {product.price.toLocaleString()}₫
              </span>
              <span className="text-success fw-bold fs-5">
                {product.salePrice.toLocaleString()}₫
              </span>
            </div>
          ) : (
            <span className="text-success fw-bold fs-5">
              {product.price.toLocaleString()}₫
            </span>
          )}
        </div>

       
        <div className="mt-auto d-flex flex-column gap-2">
          <Button 
            variant="success" 
            className="d-flex align-items-center justify-content-center gap-2 fw-semibold"
            onClick={onAddCart}
          >
            <ShoppingCart size={18} />
            Add to Cart
          </Button>

          <div className="d-flex gap-2">
            <Button 
              as={Link} 
              to={`/product/${product.id}`} 
              variant="outline-secondary"
              className="flex-fill d-flex align-items-center justify-content-center gap-1"
              size="sm"
            >
              <Eye size={16} />
              View
            </Button>

            {!user ? (
              <Button 
                variant="outline-success" 
                onClick={onWishlist}
                className="flex-fill d-flex align-items-center justify-content-center gap-1"
                size="sm"
              >
                <Heart size={16} />
                Wishlist
              </Button>
            ) : wished ? (
              <Button 
                as={Link} 
                to="/wishlist" 
                variant="success"
                className="flex-fill d-flex align-items-center justify-content-center gap-1"
                size="sm"
              >
                <Heart size={16} fill="currentColor" />
                View Wishlist
              </Button>
            ) : (
              <Button 
                variant="outline-success" 
                onClick={onWishlist}
                className="flex-fill d-flex align-items-center justify-content-center gap-1"
                size="sm"
              >
                <Heart size={16} />
                Add to wishlist
              </Button>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}