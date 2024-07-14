import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [saplingsMaster, setSaplingsMaster] = useState([]);
  const [saplingStockData, setSaplingStockData] = useState([]);
  const [allStockBySaplings, setAllStockBySaplings] = useState({});


  useEffect(() => {
    // Fetch JSON data
    const fetchData = async () => {
      try {
        // Fetch saplings master data
        const saplingsMasterResponse = await fetch('/saplings_master.json');
        if (!saplingsMasterResponse.ok) {
          throw new Error(`HTTP error! status: ${saplingsMasterResponse.status}`);
        }
        const saplingsMasterData = await saplingsMasterResponse.json();
        setSaplingsMaster(saplingsMasterData);
  
        // Fetch sapling stock data
        const saplingStockDataResponse = await fetch('/saplinginwardoutward.json');
        if (!saplingStockDataResponse.ok) {
          throw new Error(`HTTP error! status: ${saplingStockDataResponse.status}`);
        }
        const saplingStockData = await saplingStockDataResponse.json();
        setSaplingStockData(saplingStockData.sapling_stock_res_by_warehouse);
  
        // Initialize data structure for all stock by saplings
        const allStockBySaplingsData = saplingStockData.sapling_stock_res_by_sapling.reduce((acc, item) => {
          acc[item.sapling_item_code] = {
            sum_sapling_inward: 0,
            sum_sapling_outward: 0,
            sapling_balance_stock: 0,
          };
          return acc;
        }, {});

  
        // Calculate sums and update allStockBySaplingsData
        saplingStockData.sapling_stock_res_by_warehouse.forEach(item => {
          const itemCode = item.sapling_item_code;
          if (allStockBySaplingsData[itemCode]) {
            allStockBySaplingsData[itemCode].sum_sapling_inward += parseInt(item.sum_sapling_inward, 10);
            allStockBySaplingsData[itemCode].sum_sapling_outward += parseInt(item.sum_sapling_outward, 10);
            allStockBySaplingsData[itemCode].sapling_balance_stock += parseInt(item.sapling_balance_stock, 10);
          }
        });
  

        
        setAllStockBySaplings(allStockBySaplingsData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
  
    fetchData();
  }, []);


  // Group data by warehouse
  const warehouseData = {};
  saplingStockData.forEach(item => {
    if (!warehouseData[item.warehouse_name]) {
      warehouseData[item.warehouse_name] = {};
    }
    warehouseData[item.warehouse_name][item.sapling_item_code] = item;
  });

  return (
    <div className="table-container">
    <h3>Sapling stock by warehouse</h3>
      <table>
        <thead>
          <tr>
            <th className="warehouse-header">WAREHOUSE NAME</th>
            {saplingsMaster.map(sapling => (
              <th className="subHeading" key={sapling.saplings_code}>{sapling.saplings_name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="first-column">
              All Stock By Saplings
              <div className="total-item " >Total Stock</div>
              <div className="total-item">Total Distribute</div>
              <div className="total-item sapling-balance"><span className="Balance">Balance Stock</span></div>
            </td>
            {saplingsMaster.map(sapling => {
              const item = allStockBySaplings[sapling.saplings_code];
              return (
                <td key={sapling.saplings_code}>
                  <div className="item bordered-box">{item ? item.sum_sapling_inward : 0}</div>
                  <div className="item bordered-box">{item ? item.sum_sapling_outward : 0}</div>
                  <div className="item all bordered-box">{item ? item.sapling_balance_stock : 0}</div>
                </td>
              );
            })}
          </tr>
          {Object.keys(warehouseData).map(warehouse => (
            <tr key={warehouse}>
              <td className="first-column">
                {warehouse}
                <div className="total-item upper">Total Stock</div>
                <div className="total-item">Total Distribute</div>
                <div className="total-item sapling-balance"><span>Balance Stock</span></div>
              </td>
              {saplingsMaster.map(sapling => {
                const item = warehouseData[warehouse][sapling.saplings_code];
                return (
                  <td key={sapling.saplings_code}>
                    <div className="item bordered-box">{item ? item.sum_sapling_inward : 0}</div>
                    <div className="item bordered-box">{item ? item.sum_sapling_outward : 0}</div>
                    <div className="item balance-stock bordered-box">{item ? item.sapling_balance_stock : 0}</div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
