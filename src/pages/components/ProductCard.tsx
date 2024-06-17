import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Product } from "../contexts/ProductsContext";
import { useNavigate } from "react-router-dom";

interface CardProduct {
  product: Product;
}

export default function ProductCard({ product }: CardProduct) {
  const navigate = useNavigate();
  return (
    <Card sx={{ width: 300 }} onClick={() => navigate(`details/${product.id}`)}>
      <CardActionArea>
        <CardMedia
          sx={{ height: 300 }}
          component="img"
          height="140"
          image={product.url}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.price}cом
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
