import React, { useEffect, useState } from "react";
import axios from "axios";
import csvToJson from "csvtojson";

import LineChart from "../components/LineChart";
import Select from "../components/Select";
import Loader from "../components/Loader";

const dataUrl =
  "https://raw.githubusercontent.com/nychealth/coronavirus-data/master/trends/data-by-day.csv";

export default function App(_) {
  const [data, setData] = useState(null);
  const [selectedField, setSelectedField] = useState("CASE_COUNT");
  const [fieldOptions, setFieldOptions] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios
      .get(dataUrl)
      .then((r) => {
        csvToJson()
          .fromString(r.data)
          .then((jsonObj) => {
            setData(jsonObj);
            setFieldOptions(Object.keys(jsonObj[0]));
          });
      })
      .catch((e) => setErrorMessage(e));
  }, []);

  if (!data) {
    return <Loader />;
  }

  const chartData = data.map((d) => ({
    x: d.date_of_interest,
    y: d[selectedField],
  }));

  return (
    <main className="break-to-full">
      <h1 className="title">NYC Covid Data</h1>
      <div className="flex centered-items wrap">
        <div className="two-thirds break-to-full">
          <h3>
            {selectedField} for last {data.length} days in NYC
          </h3>
          <h4>
            Data sourced from <a href={dataUrl}>NYC Dept. of Health</a>
          </h4>
        </div>
        <div className="third break-to-full">
          <Select
            options={fieldOptions}
            onChange={(d) => setSelectedField(d.value)}
            defaultValue={selectedField}
          />
        </div>
      </div>
      <div className="chart">
        <LineChart
          data={[
            {
              data: chartData,
              id: "CASE_COUNT",
              color: "#fff000",
            },
          ]}
        />
      </div>
      <footer className="flex between centered-items wrap">
        <span>Created by HG King</span>
        <span>Built in Astoria</span>
      </footer>
    </main>
  );
}
