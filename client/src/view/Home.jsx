import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const Home = () => {
  const [dogBreeds, setDogBreeds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const dogsPerPage = 8;
  const navigate = useNavigate();  // Use useNavigate instead of useHistory

  useEffect(() => {
    const fetchDogBreeds = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/dogs`);
        setDogBreeds(response.data);
      } catch (error) {
        console.error('Error al obtener razas de perros:', error);
      }
    };

    fetchDogBreeds();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/detail/${id}`);  // Use navigate instead of history.push
  };

  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = dogBreeds.slice(indexOfFirstDog, indexOfLastDog);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h2>Listado de Razas de Perros</h2>
      <ul className="dog-list">
        {currentDogs.map((dogBreed) => (
          <Card
            key={dogBreed.id}
            dog={dogBreed}
            onClick={() => handleCardClick(dogBreed.id)}
          />
        ))}
      </ul>

      <ul className="pagination">
        {Array.from({ length: Math.ceil(dogBreeds.length / dogsPerPage) }).map((_, index) => (
          <li key={index} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>
            {index + 1}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
