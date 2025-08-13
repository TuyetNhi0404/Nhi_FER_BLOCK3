
import { Card, Button, Badge } from "react-bootstrap"
import { Users, Clock, ChefHat, Heart } from "lucide-react"

const RecipeCard = ({ recipe, onViewRecipe, onAddToFavorite, isFavorite }) => {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Img variant="top" src={recipe.image} alt={recipe.title} style={{ height: "200px", objectFit: "cover" }} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{recipe.title}</Card.Title>
        <Card.Text className="flex-grow-1">{recipe.description}</Card.Text>

        <div className="d-flex flex-wrap gap-2 mb-3">
          <Badge bg="light" text="dark">
            <Users size={14} color="#8b4513" className="me-1" />
            {recipe.servings} servings
          </Badge>
          <Badge bg="light" text="dark">
            <Clock size={14} color="#8b4513" className="me-1" />
            {recipe.prep} mins prep
          </Badge>
          {recipe.cook > 0 && (
            <Badge bg="light" text="dark">
              <ChefHat size={14} color="#8b4513" className="me-1" />
              {recipe.cook} mins cook
            </Badge>
          )}
        </div>

        <div className="mb-3">
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => onAddToFavorite(recipe)}
            style={{
              borderColor: "#8b4513",
              color: "#8b4513",
              backgroundColor: isFavorite ? "#f5f5dc" : "transparent",
            }}
          >
            <Heart size={16} color="#8b4513" fill={isFavorite ? "#8b4513" : "none"} className="me-1" />
            {isFavorite ? "Added to Favourites" : "Add to Favourite"}
          </Button>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0" style={{ color: "#8b4513" }}>
            ${recipe.price}
          </h5>
          <Button
            variant="warning"
            onClick={() => onViewRecipe(recipe)}
            style={{ backgroundColor: "#8b4513", borderColor: "#8b4513", color: "#f5f5dc" }}
          >
            View Recipe
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default RecipeCard
