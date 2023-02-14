import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

function Favorites(input) {
  const [inputValue, setInputValue] = useState(input);
  const [suggestions, setSuggestions] = useState([]);
  const [favorites, setFavorites] = useState([]);

  //on page load
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSuggestions = () => {
    setSuggestions((prevSuggestions) => {
      if (prevSuggestions.length >= 5) {
        // Remove the oldest suggestion when there are already 5 suggestions
        prevSuggestions.pop();
      }
      // Add the current input value as the newest suggestion
      return [inputValue, ...prevSuggestions];
    });
    setInputValue("");
  };

  const handleToggleFavorite = () => {
    if (favorites.includes(inputValue)) {
      // Remove the input value from favorites if it already exists
      setFavorites((prevFavorites) =>
        prevFavorites.filter((favorite) => favorite !== inputValue)
      );
    } else {
      // Add the input value to favorites
      setFavorites((prevFavorites) => [...prevFavorites, inputValue]);
    }
  };

  const handleFavoriteClick = (favorite) => {
    setInputValue(favorite);
  };

  return (
    <div>
      <input value={inputValue} onChange={handleInputChange} />
      <button onClick={handleToggleFavorite}>
        {favorites.includes(inputValue) ? "★" : "☆"}
      </button>
      <button onClick={handleSuggestions}>Save</button>
      {favorites.length > 0 && (
        <Card className="suggestions-card">
          <Card.Body>
            Favorite Addresses: <br />
            {favorites.map((favorite, index) => (
              <span onClick={() => handleFavoriteClick(favorite)} key={index}>
                {favorite}
                <br />
              </span>
            ))}
          </Card.Body>
          <Card.Footer>Click over the address!</Card.Footer>
        </Card>
      )}
    </div>
  );
}

export default Favorites;
