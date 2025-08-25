import { Row, Col } from "react-bootstrap";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
  return (
    <Row>
      {products.map((p) => (
        <Col key={p.id} xs={12} sm={6} lg={4} className="mb-4">
          <ProductCard product={p} />
        </Col>
      ))}
    </Row>
  );
}
