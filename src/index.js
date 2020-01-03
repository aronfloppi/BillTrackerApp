import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import AddCategory from "./components/AddCategory.js";
import AddBill from "./components/AddBill.js";
import NavBar from "./components/NavBar.js";
import Chart from "./components/Chart.js";
import BillsTable from "./components/BillsTable.js";

function App() {
  const [shouldShowAddCategory, setShouldShowAddCategory] = useState(false);
  const [categories, setCategories] = useState([]);

  const addCategory = category => {
    const updatedCategories = [...(categories || []), category];
    setCategories(updatedCategories);
    setShouldShowAddCategory(false);
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
    console.log("addCategory " + category);
    console.log("categories " + categories);
  };

  useEffect(() => {
    let categoriesInLocalStorage = JSON.parse(
      localStorage.key("categories") ? localStorage.getItem("categories") : []
    );

    console.log("categoriesInLocalStorage " + categoriesInLocalStorage);
    if (!categoriesInLocalStorage) {
      setShouldShowAddCategory(true);
    } else {
      setCategories(categoriesInLocalStorage);
      setShouldShowAddCategory(false);
    }
  }, []);

  const showAddCategory = () => {
    setShouldShowAddCategory(true);
  };

  return (
    <div className="App">
      {shouldShowAddCategory ? (
        <AddCategory onSubmit={addCategory} />
      ) : (
        <div>
          <NavBar categories={categories} showAddCategory={showAddCategory} />
          <div className="container flex">
            <div className="w-1/2">
              <BillsTable />
            </div>
            <div className="w-1/2">
              <Chart />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
