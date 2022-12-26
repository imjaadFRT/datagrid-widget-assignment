import React from "react";
import { DataGrid } from "./components";
import { BASE_URL } from "./constants";

function App() {
  const columnData = [
    { label: "Name", key: "name", type: "string" },
    { label: "Date", key: "date", type: "date" },
    { label: "Category", key: "category", type: "string" },
    { label: "Amount", key: "amount", type: "number" },
    { label: "Created At", key: "created_at", type: "date" },
  ];

  return (
    <div className={"parent"}>
      <div className="widget-container">
        <DataGrid
          columns={columnData}
          apiUrl={BASE_URL}
          title={"name"}
          subtitle={"amount"}
        />
      </div>
    </div>
  );
}

export default App;
