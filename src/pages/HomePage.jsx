import React, { useState } from "react";
import Select from "react-select"; // <-- import this
import ProductCard from "../components/ProductCard";
import OfferBanner from "../components/OfferBanner";
import ImageCarousel from "../components/ImageCarousel";
import { products as productData } from "../data/products";
import "../style/SortBar.css";

const sortOptions = [
  { value: "default", label: "Default" },
  { value: "low-to-high", label: "Low to High" },
  { value: "high-to-low", label: "High to Low" },
];

const genderOptions = [
  { value: "all", label: "All" },
  { value: "men", label: "Men" },
  { value: "women", label: "Women" },
  { value: "child", label: "Child" },
];

const HomePage = () => {
  const [sortOrder, setSortOrder] = useState("default");
  const [selectedGender, setSelectedGender] = useState("all");

  const filteredProducts = productData.filter((product) => {
    return selectedGender === "all" || product.gender === selectedGender;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "low-to-high") return a.price - b.price;
    if (sortOrder === "high-to-low") return b.price - a.price;
    return 0;
  });

  return (
    <div className="container">
      <ImageCarousel />
      <OfferBanner />

      <div className="sort-bar">
        <div className="sort-group" style={{ flex: 1, minWidth: 200 }}>
          <label htmlFor="filter">Filter by Category:</label>
          <Select
            options={genderOptions}
            defaultValue={genderOptions[0]}
            onChange={(option) => setSelectedGender(option.value)}
            isSearchable
          />
        </div>

        <div className="sort-group" style={{ flex: 1, minWidth: 200 }}>
          <label htmlFor="sort">Sort by Price:</label>
          <Select
            options={sortOptions}
            defaultValue={sortOptions[0]}
            onChange={(option) => setSortOrder(option.value)}
            isSearchable
          />
        </div>
      </div>

      <div className="grid">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
