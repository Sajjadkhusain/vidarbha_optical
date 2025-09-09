// import React, { useState } from "react";
// import Select from "react-select";
// import ProductCard from "../components/ProductCard";
// import OfferBanner from "../components/OfferBanner";
// import ImageCarousel from "../components/ImageCarousel";
// import { products as productData } from "../data/products";
// import "../style/SortBar.css";

// const sortOptions = [
//   { value: "default", label: "Default" },
//   { value: "low-to-high", label: "LOW TO HIGH" },
//   { value: "high-to-low", label: "HIGH TO LOW" },
// ];

// const genderOptions = [
//   { value: "all", label: "All" },
//   { value: "men", label: "MEN" },
//   { value: "women", label: "WOMEN" },
//   { value: "child", label: "CHILD" },
// ];

// const HomePage = () => {
//   const [sortOrder, setSortOrder] = useState("default");
//   const [selectedGender, setSelectedGender] = useState("all");

//   const filteredProducts = productData.filter((product) => {
//     return selectedGender === "all" || product.gender === selectedGender;
//   });

//   const sortedProducts = [...filteredProducts].sort((a, b) => {
//     if (sortOrder === "low-to-high") return a.price - b.price;
//     if (sortOrder === "high-to-low") return b.price - a.price;
//     return 0;
//   });

//   return (
//     <div className="container">
//       <ImageCarousel />
//       <OfferBanner />

//       <div className="sort-bar">
//         <div className="sort-group" style={{ flex: 1, minWidth: 200 }}>
//           <label htmlFor="filter">Filter by Category:</label>
//           <Select
//             options={genderOptions}
//             defaultValue={genderOptions[0]}
//             onChange={(option) => setSelectedGender(option.value)}
//             isSearchable
//           />
//         </div>

//         <div className="sort-group" style={{ flex: 1, minWidth: 200 }}>
//           <label htmlFor="sort">Sort by Price:</label>
//           <Select
//             options={sortOptions}
//             defaultValue={sortOptions[0]}
//             onChange={(option) => setSortOrder(option.value)}
//             isSearchable
//           />
//         </div>
//       </div>

//       <div className="grid">
//         {sortedProducts.map((product) => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HomePage;

import React, { useState } from "react";
import Select from "react-select";
import ProductCard from "../components/ProductCard";
import OfferBanner from "../components/OfferBanner";
import ImageCarousel from "../components/ImageCarousel";
import { products as productData } from "../data/products";
import "../style/SortBar.css";

const sortOptions = [
  { value: "default", label: "Default" },
  { value: "low-to-high", label: "LOW TO HIGH" },
  { value: "high-to-low", label: "HIGH TO LOW" },
];

const genderOptions = [
  { value: "all", label: "All" },
  { value: "men", label: "MEN" },
  { value: "women", label: "WOMEN" },
  { value: "child", label: "CHILD" },
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

      {sortedProducts.length === 0 ? (
        <div className="no-products-container">
          <div className="no-products-card">
            <div className="no-products-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
            </div>
            <h3>No Products Found</h3>
            <p>
              Sorry, we couldn't find any products matching the "
              {selectedGender}" category.
            </p>
            {/* <button
              className="reset-filter-btn"
              onClick={() => setSelectedGender("all")}
            >
              Show All Products
            </button> */}
          </div>
        </div>
      ) : (
        <div className="grid">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
