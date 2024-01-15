import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchAllDogs, searchDogsByName } from '../redux/actions';
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';
import { useNavigate } from 'react-router-dom';

const Home = ({ dogBreeds, fetchAllDogs, searchDogsByName }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const dogsPerPage = 8;
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllDogs();
  }, [fetchAllDogs]);

  const handleCardClick = (id) => {
    navigate(`/detail/${id}`);
  };

  const handleSearch = async (searchTerm) => {
    searchDogsByName(searchTerm);
    setCurrentPage(1);
  };

  // Verifica si dogBreeds está definido y tiene una propiedad length
  const totalDogs = dogBreeds ? dogBreeds.length : 0;

  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = dogBreeds ? dogBreeds.slice(indexOfFirstDog, indexOfLastDog) : [];

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
        {Array.from({ length: Math.ceil(totalDogs / dogsPerPage) }).map((_, index) => (
          <li key={index} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>
            {index + 1}
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  dogBreeds: state.dogBreeds,
});

const mapDispatchToProps = {
  fetchAllDogs,
  searchDogsByName,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
