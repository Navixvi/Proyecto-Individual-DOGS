import React, { useState, useEffect } from 'react';
import axios from 'axios';



const CreateForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    alturaMinima: '',
    alturaMaxima: '',
    pesoMinimo: '',
    pesoMaximo: '',
    anosDeVida: '',
    temperamentos: '',
  });

  const [errors, setErrors] = useState({});
  const [temperamentosOptions, setTemperamentosOptions] = useState([]);

  useEffect(() => {
    // Llamada al backend para obtener los temperamentos
    axios.get('http://localhost:3001/temperaments')
      .then(response => {
        setTemperamentosOptions(response.data.temperaments);
      })
      .catch(error => {
        console.error('Error al obtener los temperamentos:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Limpiar error al cambiar el valor
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Ejemplo de validación: Nombre no puede contener números
    if (!/^[a-zA-Z\s]*$/.test(formData.nombre)) {
      newErrors.nombre = 'El nombre no puede contener números';
      isValid = false;
    }

    // Agregar más validaciones según tus requisitos

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Aquí puedes realizar la llamada al backend para crear el perro
      console.log('Formulario válido. Enviar datos al backend:', formData);
    } else {
      console.log('Formulario inválido. No enviar datos al backend.');
    }
  };

  return (
    <div className="createFormContainer">
      <h2>Formulario de Creación</h2>
      <form onSubmit={handleSubmit} className="createForm">
        {/* Nombre */}
        <div className="formGroup">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
          {errors.nombre && <span className="errorText">{errors.nombre}</span>}
        </div>

        {/* Altura */}
        <div className="formGroup">
          <label htmlFor="alturaMinima">Altura Mínima:</label>
          <input
            type="text"
            id="alturaMinima"
            name="alturaMinima"
            value={formData.alturaMinima}
            onChange={handleChange}
          />
          {/* Agregar campo de Altura Máxima y validaciones según necesites */}
        </div>

        {/* Peso */}
        <div className="formGroup">
          <label htmlFor="pesoMinimo">Peso Mínimo:</label>
          <input
            type="text"
            id="pesoMinimo"
            name="pesoMinimo"
            value={formData.pesoMinimo}
            onChange={handleChange}
          />
          {/* Agregar campo de Peso Máximo y validaciones según necesites */}
        </div>

        {/* Años de vida */}
        <div className="formGroup">
          <label htmlFor="anosDeVida">Años de Vida:</label>
          <input
            type="text"
            id="anosDeVida"
            name="anosDeVida"
            value={formData.anosDeVida}
            onChange={handleChange}
          />
          {/* Agregar validaciones según necesites */}
        </div>

        {/* Temperamentos */}
        <div className="formGroup">
          <label htmlFor="temperamentos">Temperamentos:</label>
          <select
            id="temperamentos"
            name="temperamentos"
            value={formData.temperamentos}
            onChange={handleChange}
          >
            <option value="">Seleccione un temperamento</option>
            {temperamentosOptions.map((temperamento, index) => (
              <option key={index} value={temperamento}>{temperamento}</option>
            ))}
          </select>
          {errors.temperamentos && <span className="errorText">{errors.temperamentos}</span>}
        </div>

        {/* Botón de envío */}
        <button type="submit" className="submitButton">Crear Raza</button>
      </form>
    </div>
  );
};

export default CreateForm;
