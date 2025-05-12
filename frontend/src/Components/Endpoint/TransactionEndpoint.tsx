import React, { useState } from "react";
import Button from "plaid-threads/Button";
import Note from "plaid-threads/Note";

import Table from "../Table";
import Error from "../Error";
import { DataItem, Categories, ErrorDataItem, Data } from "../../dataUtilities";

import styles from "./index.module.scss";

interface Props {
  endpoint: string;
  name?: string;
  categories: Array<Categories>;
  schema: string;
  description: string;
  transformData: (arg: any) => Array<DataItem>;
}

const TransactionEndpoint = (props: Props) => {
  const [showTable, setShowTable] = useState(false);
  const [transformedData, setTransformedData] = useState<Data>([]);
  const [error, setError] = useState<ErrorDataItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');

  const getData = async () => {
    setIsLoading(true);
    const response = await fetch(`/api/${props.endpoint}`, { method: "GET" });
    // const data = await response.json();
    // // if (data.error != null) {
    // //   setError(data.error);
    // //   setIsLoading(false);
    // //   return;
    // // }
    // // setTransformedData(props.transformData(data)); // transform data into proper format for each individual product
    // // setShowTable(true);
    setIsLoading(false);
  };

  //TODO: have date that posts to backend so it can retrieve the data for the given date
  const setDate = async () => {

  }

  return (
    <>
          <Button
            small
            centered
            wide
            secondary
            className={styles.sendRequest}
            onClick={getData}
          >
            {isLoading ? "Loading..." : `Refresh Data From Bank`}
          </Button>

          


        

      {/* {showTable && (
        <Table
          categories={props.categories}
          data={transformedData}
          isIdentity={props.endpoint === "identity"}
        />
      )} */}
      {error != null && <Error error={error} />}
    </>
  );
};


TransactionEndpoint.displayName = "TransactionEndpoint";

export default TransactionEndpoint;
