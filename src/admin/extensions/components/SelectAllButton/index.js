import React, { useState } from "react";
import { Button } from "@strapi/design-system";
import { Boolean, PaperPlane } from "@strapi/icons";
import { useLocation } from "react-router-dom";
import axios from 'axios';

const SelectAllButton = () => {
  const location = useLocation();
  const isEnvioView = /\/content-manager\/collection-types\/api::envio\.envio/.test(location.pathname);
  const [selectedEntries, setSelectedEntries] = useState([]);

  if (!isEnvioView) {
    return null;
  }

  const handleSelectAll = async () => {
    try {
      // Hacer una llamada a la API para obtener todas las entradas
      const response = await axios.get('/api/envios');
      const allEntries = response.data.data;

      // Actualizar el estado local con los IDs seleccionados
      setSelectedEntries(allEntries);

      // Simular la selección en el Content Manager
      simulateSelection();

      console.log('Todas las entradas seleccionadas:', allEntries);
    } catch (error) {
      console.error('Error al obtener las entradas:', error);
    }
  };

  const simulateSelection = () => {
    // seleccionar checkboxes en la tabla del Content Manager
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    // Simular la selección de todas las entradas
    checkboxes.forEach(checkbox => {
      if (checkbox instanceof HTMLInputElement) {
        checkbox.checked = true;
      }
    });
  };
  
  const handleEnviarADespacho = async () => {
    if (selectedEntries.length === 0) {
      alert('No hay entradas seleccionadas.');
      return;
    }

    try {
      // Enviar cada entrada seleccionada a la API de despacho
      for (const entry of selectedEntries) {
        const response = await axios.post('/api/dispatches', { data: entry }); 
        console.log('response', response);
        console.log(`Entrada ${entry.id} enviada a despacho.`);
      }

      alert('Entradas enviadas a despacho correctamente.');
    } catch (error) {
      console.error('Error al enviar a despacho:', error);
      alert('Hubo un error al enviar las entradas a despacho.');
    }
  };

  return (
    <div style={{ display: 'flex', gap: '10px', marginLeft: '10px' }}>
      <Button
        variant="secondary"
        startIcon={<Boolean />}
        onClick={handleSelectAll}
      >
        Seleccionar Todas
      </Button>
      <Button
        variant="primary"
        startIcon={<PaperPlane />}
        onClick={handleEnviarADespacho}
      >
        Enviar a Despacho
      </Button>
    </div>
  );

};

export default SelectAllButton;