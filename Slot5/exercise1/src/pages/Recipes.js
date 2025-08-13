"use client"

import { useState } from "react"
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap"
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
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      title: "Avocado & Tomato Wholegrain Toast",
      description: "Creamy avocado spread over toasted wholegrain bread, topped with juicy tomatoes.",
      servings: 1,
      prep: 5,
      cook: 5,
      price: 8.99,
      image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      title: "One-Pan Lemon Garlic Salmon",
      description: "A 15-minute weeknight dinner of flaky salmon and tender asparagus.",
      servings: 2,
      prep: 5,
      cook: 12,
      price: 24.99,
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
    },
    {
      id: 4,
      title: "Quinoa Veggie Power Bowl",
      description: "A balanced bowl of fluffy quinoa, roasted veggies and healthy fats.",
      servings: 2,
      prep: 10,
      cook: 15,
      price: 15.99,
      image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop",
    },
    {
      id: 5,
      title: "Sweet Potato Black Bean Tacos",
      description: "Smoky roasted sweet potatoes and black beans tucked into warm tortillas.",
      servings: 3,
      prep: 10,
      cook: 15,
      price: 18.99,
      image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&h=300&fit=crop",
    },
    {
      id: 6,
      title: "Greek Yogurt Berry Parfait",
      description: "Layers of creamy yogurt, fresh berries and crunchy oats for a high-protein snack.",
      servings: 1,
      prep: 5,
      cook: 0,
      price: 9.99,
      image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop",
    },
    {
      id: 7,
      title: "Lentil & Spinach Soup",
      description: "A hearty 30-minute soup rich in plant protein and iron.",
      servings: 4,
      prep: 10,
      cook: 20,
      price: 16.99,
      image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop",
    },
    {
      id: 8,
      title: "Banana Oat Pancakes",
      description: "Flour-free pancakes sweetened naturally with ripe bananas.",
      servings: 2,
      prep: 5,
      cook: 10,
      price: 11.99,
      image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=400&h=300&fit=crop",
    },
  ])

  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [maxPrepTime, setMaxPrepTime] = useState("")
  const [maxCookTime, setMaxCookTime] = useState("")

  const handleViewRecipe = (recipe) => {
    setSelectedRecipe(recipe)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedRecipe(null)
  }

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch =
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPrepTime = !maxPrepTime || recipe.prep <= Number.parseInt(maxPrepTime)
    const matchesCookTime = !maxCookTime || recipe.cook <= Number.parseInt(maxCookTime)

    return matchesSearch && matchesPrepTime && matchesCookTime
  })

  return (
    <div className="bg-light min-vh-100">
      <Container className="py-5">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-dark mb-3">Explore our simple, healthy recipes</h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: "800px" }}>
            Discover eight quick, whole-food dishes that fit real-life schedules and taste amazing. Use the search bar
            to find a recipe by name or ingredient, or simply scroll the list and let something delicious catch your
            eye.
          </p>
        </div>

        {/* Filters */}
        <Row className="mb-4">
          <Col md={3} className="mb-3">
            <Form.Select value={maxPrepTime} onChange={(e) => setMaxPrepTime(e.target.value)}>
              <option value="">Max Prep Time</option>
              <option value="5">5 mins</option>
              <option value="10">10 mins</option>
              <option value="15">15 mins</option>
            </Form.Select>
          </Col>
          <Col md={3} className="mb-3">
            <Form.Select value={maxCookTime} onChange={(e) => setMaxCookTime(e.target.value)}>
              <option value="">Max Cook Time</option>
              <option value="5">5 mins</option>
              <option value="10">10 mins</option>
              <option value="15">15 mins</option>
              <option value="20">20 mins</option>
            </Form.Select>
          </Col>
          <Col md={6} className="mb-3">
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search by name or ingredient..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Col>
        </Row>

        {/* Recipe Cards */}
        <Row>
          {filteredRecipes.map((recipe) => (
            <Col key={recipe.id} lg={4} md={6} className="mb-4">
              <RecipeCard recipe={recipe} onViewRecipe={handleViewRecipe} />
            </Col>
          ))}
        </Row>

        {filteredRecipes.length === 0 && (
          <div className="text-center py-5">
            <h4 className="text-muted">No recipes found</h4>
            <p className="text-muted">Try adjusting your search criteria</p>
          </div>
        )}
      </Container>

      <RecipeModal show={showModal} onHide={handleCloseModal} recipe={selectedRecipe} />
    </div>
  )
}

export default Recipes
