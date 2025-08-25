import { useContext } from "react"; 
import { WishlistContext } from "../contexts/WishlistContext"; 
import { CartContext } from "../contexts/CartContext";
import { Row, Col, Button, Card, Badge } from "react-bootstrap"; 
import { Link } from "react-router-dom";
import { useToast } from "../contexts/ToastContext";
import { Heart, ShoppingCart, Eye, Trash2, X } from "lucide-react";
 
export default function Wishlist() { 
  const { wishlist, removeFromWishlist, clearWishlist } = useContext(WishlistContext); 
  const { addToCart } = useContext(CartContext);
  const toast = useToast();

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.addToast({ bg: "success", body: `${product.title} added to cart!` });
  };

  const handleRemoveItem = (productId, productTitle) => {
    removeFromWishlist(productId);
    toast.addToast({ bg: "info", body: `${productTitle} removed from wishlist` });
  };
 
  if (!wishlist.length) { 
    return ( 
      <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-white py-5"> 
        <div className="text-center">
          <Heart size={80} className="text-muted mb-4" />
          <h2 className="text-dark mb-3">Your Wishlist is Empty</h2>
          <p className="text-muted mb-4 fs-5">Discover amazing products and add them to your wishlist</p>
          <Button 
            as={Link} 
            to="/" 
            variant="success" 
            size="lg"
            className="px-4 py-2"
          >
            Start Shopping
          </Button>
        </div>
      </div> 
    ); 
  } 
 
  return ( 
    <div className="bg-white min-vh-100 py-4"> 
      <div className="container">
        {/* Header */} 
        <div className="d-flex justify-content-between align-items-center mb-5"> 
          <div className="text-center mb-5">
            <h1 className="text-success fw-bold mb-2 d-flex justify-content-center align-items-center">
            <Heart className="me-2" size={32} />
            My Wishlist
          </h1>
            <p className="text-muted mb-0">{wishlist.length} item{wishlist.length !== 1 ? 's' : ''} in your wishlist</p>
          </div>
        </div> 
 
        {/* Grid */} 
        <Row className="g-4"> 
          {wishlist.map((product) => {
            const isSale = product.tags?.includes("sale") && product.salePrice;
            const isHot = product.tags?.includes("hot");
            
            return (
              <Col key={product.id} xs={12} sm={6} lg={4} xl={3}> 
                <Card className="h-100 border-success shadow">
                  {/* Remove button */}
                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="position-absolute top-0 end-0 m-2 rounded-circle p-2 z-3"
                    onClick={() => handleRemoveItem(product.id, product.title)}
                    style={{ width: '36px', height: '36px' }}
                  >
                    <X size={16} />
                  </Button>

                  {/* Product Image */}
                  <div className="position-relative" style={{ height: "280px", overflow: "hidden" }}> 
                    {isHot && (
                      <Badge bg="danger" className="position-absolute top-0 start-0 m-2 z-2">
                        HOT
                      </Badge>
                    )}
                    {isSale && (
                      <Badge bg="warning" text="dark" className="position-absolute top-0 start-0 m-2 mt-5 z-2">
                        SALE
                      </Badge>
                    )}
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

                  {/* Card Body */}
                  <Card.Body className="d-flex flex-column p-3" style={{ backgroundColor: "#1d261eff" }}> 
                    <Card.Title className="text-success fw-semibold mb-2" style={{ fontSize: "1.3rem", lineHeight: "1.3" }}>
                      {product.title}
                    </Card.Title> 
                    
                    {/* Price */}
                    <div className="mb-3">
                      {isSale ? (
                        <div>
                          <span className="me-2"  style={{ color: "#aaa", textDecoration: "line-through" }}>
                {product.price.toLocaleString()}₫</span>
                         
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
 
                    {/* Action Buttons */} 
                    <div className="mt-auto d-flex flex-column gap-2"> 
                      <Button 
                        variant="success" 
                        className="d-flex align-items-center justify-content-center gap-2"
                        onClick={() => handleAddToCart(product)}
                      > 
                        <ShoppingCart size={18} />
                        Add to Cart 
                      </Button> 
                      <Button 
                        as={Link}
                        to={`/product/${product.id}`}
                        variant="outline-secondary" 
                        className="d-flex align-items-center justify-content-center gap-2"
                      > 
                        <Eye size={18} />
                        View Details 
                      </Button> 
                    </div> 
                  </Card.Body> 
                </Card> 
              </Col>
            );
          })} 
        </Row>

        {/* Bottom Actions */}
        <div className="text-center mt-5 pt-4 border-top">
          <Button 
            as={Link}
            to="/"
            variant="outline-success"
            size="lg"
            className="me-3"
          >
            Continue Shopping
          </Button>
          <Button 
            as={Link}
            to="/cart"
            variant="success"
            size="lg"
            className="me-3"
          >
            View Cart
          </Button>
           <Button 
            variant="outline-success" 
            onClick={clearWishlist}
          > 
            <Trash2 size={18} />
            Clear All 
          </Button>
        </div>
      </div>
    </div> 
  ); 
}