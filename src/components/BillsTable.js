import React from "react";
import Moment from "react-moment";

export default props => {
  const triggerShowAddBill = () => {
    props.showAddBill();
  };
  const removeBill = index => {
    props.removeBill(index);
  };

  return (
    <table className="table">
      <thead className="bg-blue text-white">
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Amount</th>
          <th scope="col">Category</th>
          <th scope="col" />
        </tr>
      </thead>
      <tbody>
        <tr className="p-4 bg-blue-lighter text-center">
          <td colSpan="4">
            <button className="underline" onClick={triggerShowAddBill}>
              Add new
            </button>
          </td>
        </tr>
        {props.bills.map((value, index) => {
          return (
            <tr className="p4" key={index}>
              <td>
                <Moment format="MMM D YYYY">{value.date}</Moment>
              </td>
              <td>${value.amount}</td>
              <td>{value.category}</td>
              <td>
                <button onClick={() => removeBill(index)}>𝗫</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
