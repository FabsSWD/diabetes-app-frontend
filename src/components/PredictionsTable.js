import React, { useEffect, useState, useContext, useCallback } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Select
} from '@mui/material';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { CSVLink } from 'react-csv';

export default function PredictionsTable() {
  const { user } = useContext(UserContext);
  const [predictions, setPredictions] = useState([]);
  const [viewType, setViewType] = useState(user ? 'own' : 'public'); // Mostrar 'public' si no está loggeado

  const fetchPredictions = useCallback(async () => {
    const endpoint = viewType === 'own' && user
      ? `http://localhost:8085/prediction/user?username=${user.username}`
      : 'http://localhost:8085/prediction/public';

    try {
      const response = await axios.get(endpoint);
      setPredictions(response.data);
    } catch (error) {
      console.error('Error al obtener las predicciones', error);
    }
  }, [viewType, user]);

  useEffect(() => {
    fetchPredictions();
  }, [fetchPredictions]);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Predicciones de Diabetes', 20, 10);
    doc.autoTable({
      head: [['Pregnancies', 'Glucose', 'Blood Pressure', 'Skin Thickness', 'Insulin', 'BMI', 'Pedigree', 'Age', 'Diabetes']],
      body: predictions.map(pred => [
        pred.pregnancies,
        pred.glucose,
        pred.bloodPressure,
        pred.skinThickness,
        pred.insulin,
        pred.bmi,
        pred.diabetesPedigreeFunction,
        pred.age,
        pred.diabetes ? 'Yes' : 'No'
      ]),
    });
    doc.save('predictions.pdf');
  };

  return (
    <Container component="main">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
        <Typography component="h1" variant="h5">Ver Predicciones</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 3 }}>
          {user && (
            <Select value={viewType} onChange={(e) => setViewType(e.target.value)}>
              <MenuItem value="own">Mis Predicciones</MenuItem>
              <MenuItem value="public">Predicciones Públicas</MenuItem>
            </Select>
          )}
          <Button variant="contained" onClick={fetchPredictions}>Refrescar</Button>
          <Button variant="contained" onClick={handleDownloadPDF}>Descargar PDF</Button>
          <Button variant="contained">
            <CSVLink data={predictions} filename="predictions.csv" style={{ textDecoration: 'none', color: 'inherit' }}>
              Descargar CSV
            </CSVLink>
          </Button>
        </Box>
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Pregnancies</TableCell>
                <TableCell>Glucose</TableCell>
                <TableCell>Blood Pressure</TableCell>
                <TableCell>Skin Thickness</TableCell>
                <TableCell>Insulin</TableCell>
                <TableCell>BMI</TableCell>
                <TableCell>Pedigree</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Diabetes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {predictions.map((pred, index) => (
                <TableRow key={index}>
                  <TableCell>{pred.pregnancies}</TableCell>
                  <TableCell>{pred.glucose}</TableCell>
                  <TableCell>{pred.bloodPressure}</TableCell>
                  <TableCell>{pred.skinThickness}</TableCell>
                  <TableCell>{pred.insulin}</TableCell>
                  <TableCell>{pred.bmi}</TableCell>
                  <TableCell>{pred.diabetesPedigreeFunction}</TableCell>
                  <TableCell>{pred.age}</TableCell>
                  <TableCell>{pred.diabetes ? 'Yes' : 'No'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}
