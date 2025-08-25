import { Row, Col, Form } from "react-bootstrap";

export default function FilterNav({ query, setQuery, sort, setSort }) {
  return (
    <Row className="g-2 align-items-center mb-3">
      <Col xs={12} md={8}>
        <Form.Control
        className="border-success shadow"
          type="search"
          placeholder="Search by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </Col>
      <Col xs={12} md={4}>
        <Form.Select value={sort} onChange={(e) => setSort(e.target.value)} className="border-success shadow">
          <option value="name-asc">Name A→Z</option>
          <option value="price-asc">Price Ascending</option>
          <option value="price-desc">Price Descending</option>
        </Form.Select>
      </Col>
    </Row>
  );
}
