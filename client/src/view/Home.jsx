import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [dogBreeds, setDogBreeds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const dogsPerPage = 8;
  const navigate = useNavigate();

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
    navigate(`/detail/${id}`);
  };

  const handleSearch = async (searchTerm) => {
    try {
      const response = await axios.get(`http://localhost:3001/dogs/name/${searchTerm}`);
      console.log(response.data);
      setDogBreeds(response.data);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error al buscar razas de perros:', error);
    }
  };

  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = dogBreeds.slice(indexOfFirstDog, indexOfLastDog);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h2>Listado de Razas de Perros</h2>
      <SearchBar onSearch={handleSearch} />
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
