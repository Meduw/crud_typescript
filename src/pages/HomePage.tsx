import React, { useContext, useEffect } from "react";
import { ProductContext } from "./contexts/ProductsContext";
import { Box } from "@mui/material";
import ProductCard from "./components/ProductCard";

export default function HomePage() {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error(
      "ProductForm must be used within a ProductsContextProvider"
    );
  }
  const { getProducts, products } = context;

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          marginTop: "50px",
          gap: "20px",
          padding: "0 20px",
        }}
      >
        {products.map((item) => (
          <ProductCard product={item} key={item.id} />
        ))}
      </Box>
    </Box>
  );
}
