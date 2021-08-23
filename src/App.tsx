import React from "react";
import "./App.css";
import Products from "views/Products";

function App() {
  return (
    <div className="container mt-4">
      <Products namespace="products" />
    </div>
  );
}

export default App;
