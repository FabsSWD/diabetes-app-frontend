import React, { useState, useContext } from 'react';
import { TextField, Button, Box, Container, Typography, Switch, FormControlLabel } from '@mui/material';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function Prediction() {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    pregnancies: '',
    glucose: '',
    bloodPressure: '',
    skinThickness: '',
    insulin: '',
    bmi: '',
    diabetesPedigreeFunction: '',
    age: '',
    isPublic: true,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validar rangos de valores específicos
    const parsedValue = parseFloat(value);
    const isValidValue = (field, val) => {
      switch (field) {
        case 'pregnancies':
        case 'age':
          return val >= 0; // No permitir negativos
        case 'glucose':
          return val >= 0 && val <= 500; // Ejemplo de rango para glucosa
        case 'bloodPressure':
          return val >= 0 && val <= 300; // Ejemplo de rango para presión sanguínea
        case 'skinThickness':
          return val >= 0 && val <= 99; // Grosor de piel en un rango razonable
        case 'insulin':
          return val >= 0 && val <= 900; // Ejemplo de rango para insulina
        case 'bmi':
          return val >= 0 && val <= 100; // BMI hasta 100
        case 'diabetesPedigreeFunction':
          return val >= 0 && val <= 2.5; // Ejemplo de función de pedigree de diabetes
        default:
          return true;
      }
    };

    // Actualizar el estado solo si el valor es válido
    if (isValidValue(name, parsedValue) || value === '') {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:8085/prediction/add', {
        ...formData,
        postedBy: user.username,
      });
      navigate('/predictions');
    } catch (error) {
      console.error('Error al realizar la predicción', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 4,
        }}
      >
        <Typography component="h1" variant="h5">
          Realizar Predicción
        </Typography>
        <Box component="form" onSubmit={(e) => e.preventDefault()} sx={{ mt: 1 }}>
          {[
            { name: 'pregnancies', label: 'Pregnancies', min: 0 },
            { name: 'glucose', label: 'Glucose', min: 0, max: 500 },
            { name: 'bloodPressure', label: 'Blood Pressure', min: 0, max: 300 },
            { name: 'skinThickness', label: 'Skin Thickness', min: 0, max: 99 },
            { name: 'insulin', label: 'Insulin', min: 0, max: 900 },
            { name: 'bmi', label: 'BMI', min: 0, max: 100 },
            { name: 'diabetesPedigreeFunction', label: 'Diabetes Pedigree Function', min: 0, max: 2.5 },
            { name: 'age', label: 'Age', min: 0 },
          ].map((field) => (
            <TextField
              key={field.name}
              margin="normal"
              required
              fullWidth
              name={field.name}
              label={field.label}
              type="number"
              inputProps={{
                min: field.min,
                max: field.max,
                step: 'any',
              }}
              value={formData[field.name]}
              onChange={handleChange}
            />
          ))}
          <FormControlLabel
            control={
              <Switch
                checked={formData.isPublic}
                onChange={() => setFormData({ ...formData, isPublic: !formData.isPublic })}
                color="primary"
              />
            }
            label="Hacer predicción pública"
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Realizar Predicción
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
