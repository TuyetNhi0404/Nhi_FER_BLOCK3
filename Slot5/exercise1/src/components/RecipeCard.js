"use client"
import { Card, Button, Badge } from "react-bootstrap"

const RecipeCard = ({ recipe, onViewRecipe }) => {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Img variant="top" src={recipe.image} alt={recipe.title} style={{ height: "200px", objectFit: "cover" }} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{recipe.title}</Card.Title>
        <Card.Text className="flex-grow-1">{recipe.description}</Card.Text>

        <div className="d-flex flex-wrap gap-2 mb-3">
          <Badge bg="light" text="dark">
            👥 {recipe.servings} servings
          </Badge>
          <Badge bg="light" text="dark">
            ⏱️ {recipe.prep} mins prep
          </Badge>
          {recipe.cook > 0 && (
            <Badge bg="light" text="dark">
              🍳 {recipe.cook} mins cook
            </Badge>
          )}
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0" style={{ color: "#8b4513" }}>
            ${recipe.price}
          </h5>
          <Button 
            variant="warning"
            onClick={() => onViewRecipe(recipe)}
            style={{ backgroundColor: "#8b4513", borderColor: "#8b4513", color: "#f5f5dc", borderRadius: "18px", minWidth: "200px" }}
          >
            View Recipe
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default RecipeCard
