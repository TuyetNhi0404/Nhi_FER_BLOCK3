

import { useState, useEffect } from "react"
import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Carousel,
  Dropdown,
  Toast,
  ToastContainer,
  Modal,
  Button,
  Pagination,
} from "react-bootstrap"
import RecipeCard from "../components/RecipeCard"
import RecipeModal from "../components/RecipeModal"

const Recipes = () => {
  const [recipes] = useState([
    {
      id: 1,
      title: "Mediterranean Chickpea Salad",
      description: "A refreshing, protein-packed salad tossed in a lemon-olive oil dressing.",
      servings: 2,
      prep: 10,
      cook: 0,
      price: 12.99,
      image: "/img/image1.png",
    },
    {
      id: 2,
      title: "Avocado & Tomato Wholegrain Toast",
      description: "Creamy avocado spread over toasted wholegrain bread, topped with juicy tomatoes.",
      servings: 1,
      prep: 5,
      cook: 5,
      price: 8.99,
      image: "/img/image2.png",
    },
    {
      id: 3,
      title: "One-Pan Lemon Garlic Salmon",
      description: "A 15-minute weeknight dinner of flaky salmon and tender asparagus.",
      servings: 2,
      prep: 5,
      cook: 12,
      price: 24.99,
      image: "/img/image3.png",
    },
    {
      id: 4,
      title: "Quinoa Veggie Power Bowl",
      description: "A balanced bowl of fluffy quinoa, roasted veggies and healthy fats.",
      servings: 2,
      prep: 10,
      cook: 15,
      price: 15.99,
      image: "/img/image4.png",
    },
    {
      id: 5,
      title: "Sweet Potato Black Bean Tacos",
      description: "Smoky roasted sweet potatoes and black beans tucked into warm tortillas.",
      servings: 3,
      prep: 10,
      cook: 15,
      price: 18.99,
      image: "/img/image5.png",
    },
    {
      id: 6,
      title: "Greek Yogurt Berry Parfait",
      description: "Layers of creamy yogurt, fresh berries and crunchy oats for a high-protein snack.",
      servings: 1,
      prep: 5,
      cook: 0,
      price: 9.99,
      image: "/img/image6.png",
    },
    {
      id: 7,
      title: "Lentil & Spinach Soup",
      description: "A hearty 30-minute soup rich in plant protein and iron.",
      servings: 4,
      prep: 10,
      cook: 20,
      price: 16.99,
      image: "/img/image7.png",
    },
    {
      id: 8,
      title: "Banana Oat Pancakes",
      description: "Flour-free pancakes sweetened naturally with ripe bananas.",
      servings: 2,
      prep: 5,
      cook: 10,
      price: 11.99,
      image: "/img/image8.png",
    },
  ])

  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [maxPrepTime, setMaxPrepTime] = useState("")
  const [maxCookTime, setMaxCookTime] = useState("")
  const [sortBy, setSortBy] = useState("")
  const [favorites, setFavorites] = useState([])
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [showRequestForm, setShowRequestForm] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(6)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    ingredient: "",
    maxPrepTime: "",
    notes: "",
  })
  const [formErrors, setFormErrors] = useState({})
  const [showFormErrors, setShowFormErrors] = useState(false)

  useEffect(() => {
    const handleOpenRequestForm = () => {
      setShowRequestForm(true)
    }

    if (window.location.hash === "#request-form") {
      setShowRequestForm(true)
      window.history.replaceState(null, null, window.location.pathname)
    }

    window.addEventListener("openRequestForm", handleOpenRequestForm)

    return () => {
      window.removeEventListener("openRequestForm", handleOpenRequestForm)
    }
  }, [])

  const handleViewRecipe = (recipe) => {
    setSelectedRecipe(recipe)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedRecipe(null)
  }

  const handleAddToFavorite = (recipe) => {
    const isAlreadyFavorite = favorites.find((fav) => fav.id === recipe.id)

    if (isAlreadyFavorite) {
    
      setFavorites(favorites.filter((fav) => fav.id !== recipe.id))
      setToastMessage("Removed from favourites")
    } else {
      
      setFavorites([...favorites, recipe])
      setToastMessage("Added to favourites")
    }

    setShowToast(true)
    setTimeout(() => setShowToast(false), 5000)
  }

  const sortRecipes = (recipes) => {
    if (!sortBy) return recipes

    return [...recipes].sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.title.localeCompare(b.title)
        case "name-desc":
          return b.title.localeCompare(a.title)
        case "prep-asc":
          return a.prep - b.prep
        case "prep-desc":
          return b.prep - a.prep
        case "cook-asc":
          return a.cook - b.cook
        case "cook-desc":
          return b.cook - a.cook
        default:
          return 0
      }
    })
  }

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch =
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPrepTime = !maxPrepTime || recipe.prep <= Number.parseInt(maxPrepTime)
    const matchesCookTime = !maxCookTime || recipe.cook <= Number.parseInt(maxCookTime)

    return matchesSearch && matchesPrepTime && matchesCookTime
  })

  const sortedRecipes = sortRecipes(filteredRecipes)
  const totalPages = Math.ceil(sortedRecipes.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedRecipes = sortedRecipes.slice(startIndex, startIndex + itemsPerPage)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (items) => {
    setItemsPerPage(items)
    setCurrentPage(1)
  }

  const validateForm = () => {
    const errors = {}

    if (!formData.name.trim()) {
      errors.name = "Please enter your name"
    }

    if (!formData.email.trim()) {
      errors.email = "Please provide a valid email"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please provide a valid email"
    }

    if (!formData.ingredient.trim()) {
      errors.ingredient = "Please specify your desired ingredient"
    }

    if (!formData.maxPrepTime) {
      errors.maxPrepTime = "Choose your preferred maximum preparation time"
    }

    return errors
  }

  const handleFormSubmit = () => {
    const errors = validateForm()
    setFormErrors(errors)
    setShowFormErrors(true)

    if (Object.keys(errors).length === 0) {
   
      setShowRequestForm(false)
      setFormData({
        name: "",
        email: "",
        ingredient: "",
        maxPrepTime: "",
        notes: "",
      })
      setShowFormErrors(false)
      setFormErrors({})

      setToastMessage("Recipe request submitted successfully!")
      setShowToast(true)
      setTimeout(() => setShowToast(false), 5000)
    }
  }

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

   
    if (formErrors[field]) {
      setFormErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  const getSortDisplayText = () => {
    switch (sortBy) {
      case "name-asc":
        return "Name A→Z"
      case "name-desc":
        return "Name Z→A"
      case "prep-asc":
        return "Prep Time ↑"
      case "prep-desc":
        return "Prep Time ↓"
      case "cook-asc":
        return "Cook Time ↑"
      case "cook-desc":
        return "Cook Time ↓"
      default:
        return "Sort by"
    }
  }

  return (
    <div className="bg-light min-vh-100">
      <div className="mb-5">
        <Container>
        </Container>
        <Carousel controls={true} indicators={true} interval={5000} pause="hover" className="mb-0">
          {recipes.slice(0, 3).map((recipe) => (
            <Carousel.Item key={recipe.id}>
              <div style={{ height: "400px", position: "relative" }}>
                <img
                  className="d-block w-100 h-100"
                  src={recipe.image || "/placeholder.svg"}
                  alt={recipe.title}
                  style={{ objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "30px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "rgba(139, 69, 19, 0.9)",
                    color: "#f5f5dc",
                    padding: "20px 30px",
                    borderRadius: "10px",
                    maxWidth: "600px",
                    textAlign: "center",
                  }}
                >
                  <h3 className="mb-2">{recipe.title}</h3>
                  <p className="mb-0">{recipe.description}</p>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      <Container fluid className="px-4 py-5">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-dark mb-3">Explore our simple, healthy recipes</h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: "800px" }}>
            Discover eight quick, whole-food dishes that fit real-life schedules and taste amazing. Use the search bar
            to find a recipe by name or ingredient, or simply scroll the list and let something delicious catch your
            eye.
          </p>
        </div>

        <Row className="mb-4 g-3">
          <Col xl={2} lg={3} md={4} sm={6} className="mb-2">
            <Dropdown className="w-100">
              <Dropdown.Toggle
                className="w-100"
                style={{ backgroundColor: "#8b4513", borderColor: "#8b4513", color: "#f5f5dc" }}
                id="sort-dropdown"
              >
                {getSortDisplayText()}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setSortBy("name-asc")}>Name A→Z</Dropdown.Item>
                <Dropdown.Item onClick={() => setSortBy("name-desc")}>Name Z→A</Dropdown.Item>
                <Dropdown.Item onClick={() => setSortBy("prep-asc")}>Prep Time ↑</Dropdown.Item>
                <Dropdown.Item onClick={() => setSortBy("prep-desc")}>Prep Time ↓</Dropdown.Item>
                <Dropdown.Item onClick={() => setSortBy("cook-asc")}>Cook Time ↑</Dropdown.Item>
                <Dropdown.Item onClick={() => setSortBy("cook-desc")}>Cook Time ↓</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col xl={2} lg={3} md={4} sm={6} className="mb-2">
            <Form.Select value={maxPrepTime} onChange={(e) => setMaxPrepTime(e.target.value)}>
              <option value="">Max Prep Time</option>
              <option value="5">5 mins</option>
              <option value="10">10 mins</option>
              <option value="15">15 mins</option>
            </Form.Select>
          </Col>
          <Col xl={2} lg={3} md={4} sm={6} className="mb-2">
            <Form.Select value={maxCookTime} onChange={(e) => setMaxCookTime(e.target.value)}>
              <option value="">Max Cook Time</option>
              <option value="5">5 mins</option>
              <option value="10">10 mins</option>
              <option value="15">15 mins</option>
              <option value="20">20 mins</option>
            </Form.Select>
          </Col>
          <Col xl={4} lg={3} md={8} sm={6} className="mb-2">
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search by name or ingredient..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col xl={2} lg={12} md={4} sm={6} className="mb-2">
            <Button
              className="w-100"
              style={{ backgroundColor: "#8b4513", borderColor: "#8b4513", color: "#f5f5dc" }}
              onClick={() => setShowRequestForm(true)}
            >
              Recipe Request Form
            </Button>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <div className="d-flex align-items-center">
              <span className="me-2">Items per page:</span>
              <Form.Select
                style={{ width: "auto" }}
                value={itemsPerPage}
                onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
              >
                <option value={6}>6</option>
                <option value={9}>9</option>
                <option value={12}>12</option>
              </Form.Select>
            </div>
          </Col>
          <Col md={6} className="text-end">
            <span className="text-muted">
              Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, sortedRecipes.length)} of{" "}
              {sortedRecipes.length} recipes
            </span>
          </Col>
        </Row>

       
        <div style={{ marginLeft: "200px", marginRight: "200px" }}>
          <Row className="g-4">
            {paginatedRecipes.map((recipe) => (
              <Col key={recipe.id} lg={4} md={6} sm={12} className="mb-4">
                <RecipeCard
                  recipe={recipe}
                  onViewRecipe={handleViewRecipe}
                  onAddToFavorite={handleAddToFavorite}
                  isFavorite={favorites.some((fav) => fav.id === recipe.id)}
                />
              </Col>
            ))}
          </Row>
        </div>

        {totalPages > 1 && (
          <Row className="mt-4">
            <Col className="d-flex justify-content-center">
              <Pagination className="custom-pagination">
                <Pagination.First disabled={currentPage === 1} onClick={() => handlePageChange(1)} />
                <Pagination.Prev disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} />

                {[...Array(totalPages)].map((_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}

                <Pagination.Next
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                />
                <Pagination.Last disabled={currentPage === totalPages} onClick={() => handlePageChange(totalPages)} />
              </Pagination>
            </Col>
          </Row>
        )}

        {filteredRecipes.length === 0 && (
          <div className="text-center py-5">
            <h4 className="text-muted">No recipes found</h4>
            <p className="text-muted">Try adjusting your search criteria</p>
          </div>
        )}
      </Container>

      <Modal show={showRequestForm} onHide={() => setShowRequestForm(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#8b4513" }}>Recipe Request Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => handleFormChange("name", e.target.value)}
                    isInvalid={showFormErrors && formErrors.name}
                  />
                  {showFormErrors && formErrors.name && (
                    <Form.Text style={{ color: "#dc3545", fontStyle: "italic", fontSize: "0.875rem" }}>
                      {formErrors.name}
                    </Form.Text>
                  )}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleFormChange("email", e.target.value)}
                    isInvalid={showFormErrors && formErrors.email}
                  />
                  {showFormErrors && formErrors.email && (
                    <Form.Text style={{ color: "#dc3545", fontStyle: "italic", fontSize: "0.875rem" }}>
                      {formErrors.email}
                    </Form.Text>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Desired Ingredient</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., chicken, quinoa, avocado, seasonal vegetables..."
                value={formData.ingredient}
                onChange={(e) => handleFormChange("ingredient", e.target.value)}
                isInvalid={showFormErrors && formErrors.ingredient}
              />
              {showFormErrors && formErrors.ingredient && (
                <Form.Text style={{ color: "#dc3545", fontStyle: "italic", fontSize: "0.875rem" }}>
                  {formErrors.ingredient}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Max Prep Time</Form.Label>
              <Form.Select
                value={formData.maxPrepTime}
                onChange={(e) => handleFormChange("maxPrepTime", e.target.value)}
                isInvalid={showFormErrors && formErrors.maxPrepTime}
              >
                <option value="">Select max prep time</option>
                <option value="5">5 minutes</option>
                <option value="10">10 minutes</option>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
              </Form.Select>
              {showFormErrors && formErrors.maxPrepTime && (
                <Form.Text style={{ color: "#dc3545", fontStyle: "italic", fontSize: "0.875rem" }}>
                  {formErrors.maxPrepTime}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Any additional notes, dietary restrictions, or special requests..."
                value={formData.notes}
                onChange={(e) => handleFormChange("notes", e.target.value)}
              />
              <Form.Text style={{ color: "#8b4513", fontStyle: "italic", fontSize: "0.875rem" }}>
                Share any dietary restrictions or special requests (optional)
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRequestForm(false)}>
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: "#8b4513", borderColor: "#8b4513", color: "#f5f5dc" }}
            onClick={handleFormSubmit}
          >
            Submit Request
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer
        position="bottom-end"
        className="p-3"
        style={{
          zIndex: 9999,
          position: "fixed", 
        }}
      >
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          style={{
            backgroundColor: "#f5f5dc",
            borderColor: "#8b4513",
            border: "2px solid #8b4513",
          }}
        >
          <Toast.Header style={{ backgroundColor: "#8b4513", color: "#f5f5dc" }}>
            <strong className="me-auto">Recipe App</strong>
          </Toast.Header>
          <Toast.Body style={{ color: "#8b4513", fontWeight: "500" }}>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>

      <RecipeModal show={showModal} onHide={handleCloseModal} recipe={selectedRecipe} />

      <style jsx>{`
        .custom-pagination .page-item.active .page-link {
          background-color: #8b4513 !important;
          border-color: #8b4513 !important;
          color: #f5f5dc !important;
        }
        .custom-pagination .page-link {
          color: #8b4513;
        }
        .custom-pagination .page-link:hover {
          color: #f5f5dc;
          background-color: #8b4513;
          border-color: #8b4513;
        }
      `}</style>
    </div>
  )
}

export default Recipes
