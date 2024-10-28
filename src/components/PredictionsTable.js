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
import { useTranslation } from 'react-i18next';

export default function PredictionsTable() {
  const { t } = useTranslation(); // Importación de traducción
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
      console.error(t('predictionsTable.errorFetching'), error);
    }
  }, [viewType, user, t]);

  useEffect(() => {
    fetchPredictions();
  }, [fetchPredictions]);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text(t('predictionsTable.pdfTitle'), 20, 10);
    doc.autoTable({
      head: [[
        t('predictionsTable.columns.pregnancies'),
        t('predictionsTable.columns.glucose'),
        t('predictionsTable.columns.bloodPressure'),
        t('predictionsTable.columns.skinThickness'),
        t('predictionsTable.columns.insulin'),
        t('predictionsTable.columns.bmi'),
        t('predictionsTable.columns.pedigree'),
        t('predictionsTable.columns.age'),
        t('predictionsTable.columns.diabetes')
      ]],
      body: predictions.map(pred => [
        pred.pregnancies,
        pred.glucose,
        pred.bloodPressure,
        pred.skinThickness,
        pred.insulin,
        pred.bmi,
        pred.diabetesPedigreeFunction,
        pred.age,
        pred.diabetes ? t('predictionsTable.yes') : t('predictionsTable.no')
      ]),
    });
    doc.save('predictions.pdf');
  };

  return (
    <Container component="main">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
        <Typography component="h1" variant="h5">{t('predictionsTable.title')}</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 3 }}>
          {user && (
            <Select value={viewType} onChange={(e) => setViewType(e.target.value)}>
              <MenuItem value="own">{t('predictionsTable.myPredictions')}</MenuItem>
              <MenuItem value="public">{t('predictionsTable.publicPredictions')}</MenuItem>
            </Select>
          )}
          <Button variant="contained" onClick={fetchPredictions}>{t('predictionsTable.refresh')}</Button>
          <Button variant="contained" onClick={handleDownloadPDF}>{t('predictionsTable.downloadPDF')}</Button>
          <Button variant="contained">
            <CSVLink data={predictions} filename="predictions.csv" style={{ textDecoration: 'none', color: 'inherit' }}>
              {t('predictionsTable.downloadCSV')}
            </CSVLink>
          </Button>
        </Box>
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t('predictionsTable.columns.pregnancies')}</TableCell>
                <TableCell>{t('predictionsTable.columns.glucose')}</TableCell>
                <TableCell>{t('predictionsTable.columns.bloodPressure')}</TableCell>
                <TableCell>{t('predictionsTable.columns.skinThickness')}</TableCell>
                <TableCell>{t('predictionsTable.columns.insulin')}</TableCell>
                <TableCell>{t('predictionsTable.columns.bmi')}</TableCell>
                <TableCell>{t('predictionsTable.columns.pedigree')}</TableCell>
                <TableCell>{t('predictionsTable.columns.age')}</TableCell>
                <TableCell>{t('predictionsTable.columns.diabetes')}</TableCell>
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
                  <TableCell>{pred.diabetes ? t('predictionsTable.yes') : t('predictionsTable.no')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}
