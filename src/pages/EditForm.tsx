import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "./contexts/ProductsContext";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import { url } from "inspector";
import { title } from "process";
import { info } from "console";

export default function EditForm() {
  const context = useContext(ProductContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error("Ошибка из useContext HomePage");
  }

  const { getOneProduct, oneProduct } = context;
  const { id } = useParams();

  const [url, SetUrl] = useState("");
  const [title, setTitle] = useState("");
  const [info, setInfo] = useState("");
  const [price, setPrice] = useState("");

  const { editProduct } = context;
  interface State {
    url: string;
    title: string;
    info: string;
    price: string;
  }
  useEffect(() => {
    if (oneProduct) {
      SetUrl(oneProduct.url);
      setTitle(oneProduct.title);
      setInfo(oneProduct.info);
      setPrice(oneProduct.price);
    }
  }, [oneProduct]);

  useEffect(() => {
    getOneProduct(id);
  }, []);
  if (!oneProduct) {
    return <h1>Загрузка</h1>;
  }

  function handleChange(e: React.ChangeEvent<HTMLFormElement>) {
    const newProduct = {
      url,
      title,
      info,
      price: price,
    };
    if (url.trim() && title.trim() && info.trim() && price.toString().trim()) {
      alert("Данные добавились");
      editProduct(newProduct, id);
      navigate("/");
    } else {
      alert("Добавить данные");
    }
  }

  return (
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
      onSubmit={handleChange}
      component="form"
    >
      <Typography variant="h4" sx={{ marginBottom: "10px", marginTop: "20px" }}>
        Изменение продукта
      </Typography>

      <TextField
        required
        value={url}
        placeholder="Вставьте ссылку для изображения"
        onChange={(e) => SetUrl(e.target.value)}
        fullWidth
        variant="outlined"
      />
      <TextField
        required
        value={title}
        placeholder="Вставьте название продукта"
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        variant="outlined"
      />
      <TextField
        required
        value={info}
        placeholder="Для описания"
        onChange={(e) => setInfo(e.target.value)}
        fullWidth
        variant="outlined"
      />
      <TextField
        required
        value={price}
        placeholder="Введите цену товара"
        onChange={(e) => setPrice(e.target.value)}
        fullWidth
        variant="outlined"
        type="number"
      />
      <Button variant="contained" type="submit" sx={{ padding: "10px 20px" }}>
        Изменить продукт
      </Button>
    </Box>
  );
}
