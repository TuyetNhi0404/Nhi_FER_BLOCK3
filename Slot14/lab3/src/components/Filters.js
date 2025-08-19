
import { Row, Col, Form, InputGroup } from "react-bootstrap"

const Filters = ({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  ageRange,
  setAgeRange,
  hasAvatar,
  setHasAvatar,
}) => {
  return (
    <Row className="mb-4">
      {/* Search */}
      <Col md={4}>
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Search Students</Form.Label>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Form.Group>
      </Col>

      {/* Sort */}
      <Col md={4}>
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Sort by</Form.Label>
          <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="default">Default</option>
            <option value="age-asc">Age (Ascending)</option>
            <option value="age-desc">Age (Descending)</option>
            <option value="name-az">Name (A-Z)</option>
            <option value="name-za">Name (Z-A)</option>
          </Form.Select>
        </Form.Group>
      </Col>

      {/* Age Range */}
      <Col md={2}>
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Age Range</Form.Label>
          <Form.Select value={ageRange} onChange={(e) => setAgeRange(e.target.value)}>
            <option value="">All</option>
            <option value="lte20">≤ 20</option>
            <option value="21-25">21 – 25</option>
            <option value="gt25">  more than 25</option>
          </Form.Select>
        </Form.Group>
      </Col>

      {/* Has Avatar */}
      <Col md={2} className="d-flex align-items-end">
        <Form.Check
          type="checkbox"
          label="Has Avatar"
          checked={hasAvatar}
          onChange={(e) => setHasAvatar(e.target.checked)}
        />
      </Col>
    </Row>
  )
}

export default Filters
