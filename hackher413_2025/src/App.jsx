import React, { useState } from 'react';

function App() {
  const [zipCode, setZipCode] = useState('');
  const [foodDesert, setFoodDesert] = useState(null);
  const [groceryStores, setGroceryStores] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const handleZipCodeChange = (event) => {
    setZipCode(event.target.value);
  };

  const checkFoodDesert = async () => {
    // Call your backend API to check if the zip code is a food desert
    const response = await fetch(`/api/checkFoodDesert/${zipCode}`);
    const data = await response.json();
    setFoodDesert(data.isFoodDesert);
  };

  const findGroceryStores = async () => {
    // Call your backend API to find grocery stores near the zip code
    const response = await fetch(`/api/findStores/${zipCode}`);
    const data = await response.json();
    setGroceryStores(data.stores);
  };

  const getFoodRecommendations = async () => {
    // Call your backend API to get budget-friendly food recommendations
    const response = await fetch(`/api/getRecommendations/${zipCode}`);
    const data = await response.json();
    setRecommendations(data.recommendations);
  };

  return (
    <div className="App">
      <h1>Food Desert & Grocery Locator</h1>
      <input
        type="text"
        placeholder="Enter your zip code"
        value={zipCode}
        onChange={handleZipCodeChange}
      />
      <button onClick={checkFoodDesert}>Check if in Food Desert</button>
      <button onClick={findGroceryStores}>Find Grocery Stores</button>
      <button onClick={getFoodRecommendations}>Get Budget-Friendly Food</button>

      <div>
        {foodDesert !== null && (
          <p>{foodDesert ? 'You are in a food desert.' : 'You are not in a food desert.'}</p>
        )}
        {groceryStores.length > 0 && (
          <div>
            <h2>Nearest Grocery Stores:</h2>
            <ul>
              {groceryStores.map((store) => (
                <li key={store.id}>{store.name} - {store.distance} miles away</li>
              ))}
            </ul>
          </div>
        )}
        {recommendations.length > 0 && (
          <div>
            <h2>Budget-Friendly Recommendations:</h2>
            <ul>
              {recommendations.map((item) => (
                <li key={item.id}>{item.name} - ${item.price}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

