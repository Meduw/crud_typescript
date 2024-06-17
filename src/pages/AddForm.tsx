import {
  Box,
  Button,
  TextField,
  Typography,
  useColorScheme,
} from "@mui/material";
import React, { ChangeEvent, useContext, useState } from "react";
import { ProductContext } from "./contexts/ProductsContext";
import { useNavigate } from "react-router-dom";

export default function AddForm() {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error(
      "ProductForm must be used within a ProductsContextProvider"
    );
  }

  const { createProduct } = context;
  interface State {
    url: string;
    title: string;
    info: string;
    price: string;
  }

  const [inputs, setInputs] = useState<State>({
    url: "",
    title: "",
    info: "",
    price: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    inputName: string
  ) {
    setInputs((prev) => ({
      ...prev,
      [inputName]: e.target.value,
    }));
  }

  const navigate = useNavigate();

  function handleClick(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    createProduct({ ...inputs, price: inputs.price });
    navigate("/");
  }

  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          maxWidth: "400px",
          padding: "20px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          marginTop: "25px",
        }}
        onSubmit={handleClick}
        component={"form"}
      >
        <Typography
          sx={{ marginBottom: "10px", marginTop: "20px" }}
          variant="h4"
        >
          Форма добавления
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          required
          onChange={(e) => handleChange(e, "url")}
          value={inputs.url}
          placeholder="Для ссылки изображения"
        />
        <TextField
          fullWidth
          variant="outlined"
          required
          onChange={(e) => handleChange(e, "title")}
          value={inputs.title}
          placeholder="Для названия"
        />
        <TextField
          fullWidth
          variant="outlined"
          required
          onChange={(e) => handleChange(e, "info")}
          value={inputs.info}
          placeholder="Для подробной информации"
        />
        <TextField
          fullWidth
          variant="outlined"
          required
          onChange={(e) => handleChange(e, "price")}
          value={inputs.price}
          placeholder="Для цены"
        />
        <Button sx={{ padding: "10px 20px" }} type="submit" variant="contained">
          Добавить продукт
        </Button>
      </Box>
    </Box>
  );
}
