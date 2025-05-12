import React, { useState, useEffect } from "react";
import Button from "plaid-threads/Button";
import Note from "plaid-threads/Note";

import {Table, CategoryTable} from "../Table";
import Error from "../Error";
import { DataItem, Categories, ErrorDataItem, Data } from "../../dataUtilities";
import ProductTypesContainer from "../ProductTypes/ProductTypesContainer";

import styles from "./index.module.scss";

interface Props {
  endpoint: string;
  name?: string;
  categories: Array<Categories>;
  schema: string;
  description: string;
  transformData: (arg: any) => Array<DataItem>;
}

const SummaryEndpoint = (props: Props) => {
  const [showTable, setShowTable] = useState(false);
  const [transformedData, setTransformedData] = useState<Data>([]);
  const [error, setError] = useState<ErrorDataItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [transactions, setTransactions] = useState<any>([]);
  const [bankFees, setBankFees] = useState<any>([]);
  const [cashAdvance, setCashAdvance] = useState<any>([]);
  const [community, setCommunity] = useState<any>([]);
  const [foodAndDrink, setFoodAndDrink] = useState<any>([]);
  const [healthcare, setHealthcare] = useState<any>([]);
  const [interest, setInterest] = useState<any>([]);
  const [payment, setPayment] = useState<any>([]);
  const [recreation, setRecreation] = useState<any>([]);
  const [service, setService] = useState<any>([]);
  const [shops, setShops] = useState<any>([]);
  const [tax, setTax] = useState<any>([]);
  const [transfer, setTransfer] = useState<any>([]);
  const [travel, setTravel] = useState<any>([]);
  const [other, setOther] = useState<any>([]);
  const [totalSpent, setTotalSpent] = useState<number>(0)
  const [totalGained, setTotalGained] = useState<number>(0)



  // const getData = async () => {
  //   setIsLoading(true);
  //   const response = await fetch(`/api/${props.endpoint}`, { method: "GET" });
  //   const data = await response.json();
  //   if (data.error != null) {
  //     setError(data.error);
  //     setIsLoading(false);
  //     return;
  //   }
  //   setTransformedData(props.transformData(data)); // transform data into proper format for each individual product
  //   setShowTable(true);
  //   setIsLoading(false);
  // };
  interface TransactionsDataItem {
    amount: string;
    date: string;
    name: string;
    total: number;
  }

  const transformData = (data: any[]): TransactionsDataItem[] => {
    // Map the input data to the expected format
    if(!data){
      return []
    }
    let total = 0;
    for(let i = 0; i < data.length; i++){
      total += data[i]["amount"];
    }
    return data.map(item => ({
      amount: item["amount"] || '',
      date: item["date"] || '',
      name: item["name"] || '',
      total: total || 0,
    }));
  };
  useEffect(() => {
    if (transactions?.latest_transactions) {
      setTotalSpent(transactions.total_spent);
      setTotalGained(transactions.total_gained);
      console.log(transactions.latest_transactions)
      //set all categories to false
      {
      setBankFees(transformData(transactions.latest_transactions["bank_fees"]));
      setCashAdvance(transformData(transactions.latest_transactions["cash_advance"]));
      setCommunity(transformData(transactions.latest_transactions["community"]));
      setFoodAndDrink(transformData(transactions.latest_transactions["food_and_drink"]));
      setHealthcare(transformData(transactions.latest_transactions["healthcare"]));
      setInterest(transformData(transactions.latest_transactions["interest"]));
      setPayment(transformData(transactions.latest_transactions["payment"]));
      setRecreation(transformData(transactions.latest_transactions["recreation"]));
      setService(transformData(transactions.latest_transactions["service"]));
      setShops(transformData(transactions.latest_transactions["shops"]));
      setTax(transformData(transactions.latest_transactions["tax"]));
      setTransfer(transformData(transactions.latest_transactions["transfer"]));
      setTravel(transformData(transactions.latest_transactions["travel"]));
      }
      // setTransformedData(props.transformData(transactions));
    }
  }, [transactions]); // This will run whenever transactions changes

  //TODO: have date that posts to backend so it can retrieve the data for the given date
  const setDate = async () => {
    setIsLoading(true);
    const response = await fetch(`/api/${props.endpoint}/?month=${selectedMonth}&year=${selectedYear}`, { method: "GET" });
    const data = await response.json();
    if (data.error != null) {
      setError(data.error);
      setIsLoading(false);
      return;
    }
    const transactions = data
    setTransactions(transactions)
    setIsLoading(false);
  }

  // Define your categories and their corresponding data arrays
const categoryData = [
  { type: "Bank Fees", data: bankFees },
  { type: "Cash Advance", data: cashAdvance },
  { type: "Community", data: community },
  { type: "Food and Drink", data: foodAndDrink },
  { type: "Healthcare", data: healthcare },
  { type: "Interest", data: interest },
  { type: "Payment", data: payment },
  { type: "Recreation", data: recreation },
  { type: "Service", data: service },
  { type: "Shops", data: shops },
  { type: "Tax", data: tax },
  { type: "Transfer", data: transfer },
  { type: "Travel", data: travel }
];

  return (
    <>
    {/* Month and Year dropdowns */}

    <div className={styles.dateFilters}>
      {/* Month dropdown */}
      <select 
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
        className={styles.dropdown}
      >
        <option value="">Select Month</option>
        <option value="01">January</option>
        <option value="02">February</option>
        <option value="03">March</option>
        <option value="04">April</option>
        <option value="05">May</option>
        <option value="06">June</option>
        <option value="07">July</option>
        <option value="08">August</option>
        <option value="09">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>
      
      {/* Year dropdown */}
      <select
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
        className={styles.dropdown}
      >
        <option value="">Select Year</option>
        {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map(year => (
          <option key={year} value={year.toString()}>
            {year}
          </option>
        ))}
      </select>
      </div>
      <Button
            small
            centered
            secondary
            className={styles.sendRequest}
            onClick={setDate}
          >
            {isLoading ? "Loading..." : `Submit`}
          </Button>
      {totalSpent != 0 && <div>Total spent this month: {totalSpent}</div>}
      {totalGained != 0 && <div>Total gained this month: {totalGained}</div>}
      
      {categoryData.map(category => 
        category.data.length > 0 && (
          <ProductTypesContainer key={category.type} productType={category.type}>
            <CategoryTable
              categories={props.categories}
              data={category.data}
              isIdentity={props.endpoint === "identity"}
            />
          </ProductTypesContainer>
        )
      )}

      
      {/* <ProductTypesContainer productType="yamama">
      {showTable && (
        <Table
          categories={props.categories}
          data={transformedData}
          isIdentity={props.endpoint === "identity"}
        />
      )}
      </ProductTypesContainer> */}
      {error != null && <Error error={error} />}
    </>
  );
};


SummaryEndpoint.displayName = "SummaryEndpoint";

export default SummaryEndpoint;
//categories: "Bank Fees", "Cash Advance", "Community", "Food and Drink", "Healthcare", "Interest", Payment, Recreation, Service, 
// Shops, Tax, Transfer, Travel
