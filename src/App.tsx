import React from "react";
import "./App.css";
import Products from "views/Products";
import { Order } from "components/table/context/OrderContext";

function App() {
  return (
    <div className="container mt-4">
      <Products namespace="products" sort="name" order={Order.Asc} />
    </div>
  );
}

export default App;
