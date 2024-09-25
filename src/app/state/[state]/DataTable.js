"use client";

import React from 'react';
import styles from './state.module.css'; // Import the CSS module

const DataTable = ({ data }) => {
  return (
    <div className={styles.tableContainer}>
      <h1>Market Prices Data</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Variety</th>
            <th>Min Price</th>
            <th>Max Price</th>
            <th>Modal Price</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.Variety}</td>
              <td>{row.Min_Price}</td>
              <td>{row.Max_Price}</td>
              <td>{row.Modal_Price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
