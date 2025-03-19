import React from "react";
import { Button } from "@strapi/design-system";
import { ArrowUp } from "@strapi/icons";
import { useLocation } from "react-router-dom";

const SelectAllButton = () => {
  const location = useLocation();
  console.log('location', location);
  const isEnvioView = location.pathname.includes('/content-manager/collection-types/api::envio.envio');

  if (!isEnvioView) {
    return null;
  }

  return (
    <Button
      variant="secondary"
      startIcon={<ArrowUp />}
      onClick={() => alert("Hello World")}
    >
      Hello World
    </Button>
  );
};

export default SelectAllButton;