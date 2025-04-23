import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Character from './Character'

const urlPlanets = 'http://localhost:9009/api/planets'
const urlPeople = 'http://localhost:9009/api/people'

function App() {
  // ❗ Create state to hold the data from the API
  const [people, setPeople] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // ❗ Create effects to fetch the data and put it in state
  useEffect(() => {
  const fetchPeople = async () => {
    try {
      const response = await axios.get(urlPeople);
      setPeople(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching people:", error);
      setError("Failed to fetch people.");
      setLoading(false);
    }
  };

  const fetchPlanets = async () => {
    try {
      const response = await axios.get(urlPlanets);
      setPlanets(response.data);
    } catch (error) {
      console.error("Error fetching planets:", error);
    }
  };

  fetchPeople();
  fetchPlanets();
}, []);

if (loading) {
  return <div>Loading data...</div>;
}

if (error) {
  return <div>Error: {error}</div>;
}

  return (
    <div>
      <h2>Star Wars Characters</h2>
      <p>See the README of the project for instructions on completing this challenge</p>
      {/* ❗ Map over the data in state, rendering a Character at each iteration */}
      {people.map((person) => (
        <Character key={person.id} character={person} planets={planets} />
      ))}
    </div>
  )
}

export default App

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = App
