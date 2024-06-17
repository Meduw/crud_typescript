import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "./contexts/ProductsContext";
import { Box, Button } from "@mui/material";

export default function Details() {
  const context = useContext(ProductContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error("Ошибка из useContext HomePage");
  }

  const { getOneProduct, oneProduct, deleteProduct } = context;
  const { id } = useParams();

  useEffect(() => {
    getOneProduct(id);
  }, []);
  if (!oneProduct) {
    return <h1>Загрузка</h1>;
  }

  function handleDelete() {
    deleteProduct(id);
    navigate("/");
  }

  return (
    <Box sx={{ padding: "20px" }}>
      <img
        style={{ width: "100%", height: "50vh", objectFit: "contain" }}
        src={oneProduct.url}
        alt={oneProduct.title}
      />
      <h2>{oneProduct.title}</h2>
      <p>{oneProduct.info}</p>
      <p>{oneProduct.price}</p>
      <Box sx={{ display: "flex", gap: "10px" }}>
        <Button onClick={handleDelete} variant="contained">
          Delete product
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate(`/edit-form/${id}`)}
        >
          Edit Product
        </Button>
        //!хорошо
      </Box>
    </Box>
  );
}
