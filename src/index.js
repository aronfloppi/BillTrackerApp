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
  const [shouldShowAddBill, setShouldShowAddBill] = useState(true);
  const [categories, setCategories] = useState([]);
  const [bills, setBills] = useState([]);

  const addCategory = category => {
    const updatedCategories = [...(categories || []), category];
    setCategories(updatedCategories);
    setShouldShowAddCategory(false);
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
    console.log("addCategory " + category);
    console.log("categories " + categories);
  };

  const addBill = (amount, category, date) => {
    const bill = { amount, category, date };
    const updatedBills = [...(bills || []), bill];
    setBills(updatedBills);
    setShouldShowAddBill(false);
    localStorage.setItem("bills", JSON.stringify(updatedBills));
  };

  useEffect(() => {
    let categoriesInLocalStorage = JSON.parse(
      localStorage.key("categories") ? localStorage.getItem("categories") : []
    );
    console.log("categoriesInLocalStorage " + categoriesInLocalStorage);

    const billsInLocalStorage = JSON.parse(localStorage.getItem("bills"));
    setBills(billsInLocalStorage);

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
      ) : shouldShowAddBill ? (
        <AddBill onSubmit={addBill} categories={categories} />
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
