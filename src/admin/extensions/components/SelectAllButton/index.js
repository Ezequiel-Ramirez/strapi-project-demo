import React, { useState } from "react";
import { Button } from "@strapi/design-system";
import { Boolean } from "@strapi/icons";
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

      // Extraer los IDs de todas las entradas
      const allEntryIds = allEntries.map(entry => entry.id);

      // Actualizar el estado local con los IDs seleccionados
      setSelectedEntries(allEntryIds);

      // Simular la selección en el Content Manager
      simulateSelection(allEntryIds);

      console.log('Todas las entradas seleccionadas:', allEntryIds);
    } catch (error) {
      console.error('Error al obtener las entradas:', error);
    }
  };

  const simulateSelection = (entryIds) => {
    // seleccionar checkboxes en la tabla del Content Manager
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    // Simular la selección de todas las entradas
    checkboxes.forEach(checkbox => {
      if (checkbox instanceof HTMLInputElement) {
        checkbox.checked = true;
      }
    });
  };

  return (
    <Button
      variant="secondary"
      startIcon={<Boolean />}
      onClick={handleSelectAll}
      style={{ marginLeft: '10px' }}
    >
      Seleccionar Todas
    </Button>
  );
};

export default SelectAllButton;