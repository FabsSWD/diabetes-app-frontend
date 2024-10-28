import React, { useState, useContext } from 'react';
import { TextField, Button, Box, Container, Typography, Switch, FormControlLabel } from '@mui/material';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Prediction() {
  const { t } = useTranslation(); // Importación de traducción
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

    const parsedValue = parseFloat(value);
    const isValidValue = (field, val) => {
      switch (field) {
        case 'pregnancies':
        case 'age':
          return val >= 0;
        case 'glucose':
          return val >= 0 && val <= 500;
        case 'bloodPressure':
          return val >= 0 && val <= 300;
        case 'skinThickness':
          return val >= 0 && val <= 99;
        case 'insulin':
          return val >= 0 && val <= 900;
        case 'bmi':
          return val >= 0 && val <= 100;
        case 'diabetesPedigreeFunction':
          return val >= 0 && val <= 2.5;
        default:
          return true;
      }
    };

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
      console.error(t('prediction.errorOccurred'), error);
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
          {t('prediction.title')}
        </Typography>
        <Box component="form" onSubmit={(e) => e.preventDefault()} sx={{ mt: 1 }}>
          {[
            { name: 'pregnancies', label: t('prediction.pregnancies'), min: 0 },
            { name: 'glucose', label: t('prediction.glucose'), min: 0, max: 500 },
            { name: 'bloodPressure', label: t('prediction.bloodPressure'), min: 0, max: 300 },
            { name: 'skinThickness', label: t('prediction.skinThickness'), min: 0, max: 99 },
            { name: 'insulin', label: t('prediction.insulin'), min: 0, max: 900 },
            { name: 'bmi', label: t('prediction.bmi'), min: 0, max: 100 },
            { name: 'diabetesPedigreeFunction', label: t('prediction.diabetesPedigreeFunction'), min: 0, max: 2.5 },
            { name: 'age', label: t('prediction.age'), min: 0 },
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
            label={t('prediction.isPublic')}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            {t('prediction.predictButton')}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
