import React from "react";

import { DataItem, Categories } from "../../dataUtilities";
import Identity from "./Identity";

import { useState, useRef, useEffect } from 'react';
import styles from "./index.module.scss";

interface Props {
  data: Array<DataItem>;
  categories: Array<Categories>;
  isIdentity: boolean;
}

const Table = (props: Props) => {
  const maxRows = 50;
  // regular table
  const headers = props.categories.map((category, index) => (
    <th key={index} className={styles.headerField}>
      {category.title}
    </th>
  ));

  const rows = props.data
    .map((item: DataItem | any, index) => (
      <tr key={index} className={styles.dataRows}>
        {props.categories.map((category: Categories, index) => (
          <td key={index} className={styles.dataField}>
            {item[category.field]}
          </td>
        ))}
      </tr>
    ))
    .slice(0, maxRows);

  return props.isIdentity ? (
    <Identity data={props.data} categories={props.categories} />
  ) : (
    <table className={styles.dataTable}>
      <thead className={styles.header}>
        <tr className={styles.headerRow}>{headers}</tr>
      </thead>
      <tbody className={styles.body}>{rows}</tbody>
    </table>
  );
};

Table.displayName = "Table";

interface TransactionsDataItem {
  amount: string;
  date: string;
  name: string;
  total: number;
}

interface Crops {
  data: Array<TransactionsDataItem>;
  categories: Array<Categories>;
  isIdentity: boolean;
}

const DropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target instanceof HTMLButtonElement)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    // Only run this effect when dropdown is open
    if (!isOpen) return;
    
    // Use setTimeout to ensure the DOM has updated
    setTimeout(() => {
      const element = document.querySelector('#changeCategory') as HTMLElement;
      
      // Check if element exists before adding event listener
      if (element) {
        const handleMouseOver = () => {
          element.style.backgroundColor = 'lightblue';
        };
        
        const handleMouseOut = () => {
          element.style.backgroundColor = '';
        };
        
        element.addEventListener('mouseover', handleMouseOver);
        element.addEventListener('mouseout', handleMouseOut);
        
        // Clean up function
        return () => {
          element.removeEventListener('mouseover', handleMouseOver);
          element.removeEventListener('mouseout', handleMouseOut);
        };
      }
    }, 0);
  }, [isOpen]);
  return(
    <div className={styles.dropdownContainer}>
    <img src="/vertical_ellipsis.png" alt="" 
            style={{ width: '24px', height: '24px' }} 
            onClick={toggleDropdown}></img>
            {isOpen && (
              <div className={styles.dropdownMenu}>
                <button className={styles.dropDownButton} id="changeCategory">Change Category</button>
              </div>
            )}
    </div>
  )
}

const CategoryTable = (props: Crops) => {
  const maxRows = 100;
  // regular table
  const headers = props.categories.map((category, index) => (
    <th key={index} className={styles.headerField}>
      {category.title}
    </th>
  ));
  const rows = props.data
    .map((item: TransactionsDataItem | any, index) => (
      <tr key={index} className={styles.dataRows}>
        {props.categories.map((category: Categories, index) => (
          <td key={index} className={styles.dataField}>
            {item[category.field]}
          </td>
        ))}
        <td key={index} className={styles.dataField}>
            <DropDown></DropDown>
          </td>
      </tr>
    ))
    .slice(0, maxRows);

  return props.isIdentity ? (
    <Identity data={props.data} categories={props.categories} />
  ) : (
    <table className={styles.dataTable}>
      <thead className={styles.header}>
        <tr className={styles.headerRow}>{headers}</tr>
      </thead>
      <tbody className={styles.body}>
        {rows}
        </tbody>
      <tbody className={styles.largerText}><strong>Category Total: {props.data[0]["total"].toFixed(2)}</strong></tbody>
    </table>
  );
};
CategoryTable.displayName = "CategoryTable";

export { Table, CategoryTable };
export default Table;