import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
  display: flex;
  padding: 20px;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ category, filter, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await axios.get(
        category
          ? `http://localhost:5000/api/products?category=${category}`
          : "http://localhost:5000/api/products"
      );
      setProducts(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, [category]);

  useEffect(() => {
    category &&
      setFilteredProducts(
        products.filter((product) =>
          Object.entries(filter).every(([key, value]) => {
            product[key].includes(value);
          })
        )
      );
  }, [products, category, filter]);

  return (
    <Container>
      {filteredProducts.map((product) => (
        <Product product={product} key={product._id} />
      ))}
    </Container>
  );
};

export default Products;
