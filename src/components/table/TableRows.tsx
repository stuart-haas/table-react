import React from "react";
import TableRow, { TableRowModel } from "./TableRow";

const TableRows = (model: TableRowModel) => {
  return model.data?.map((data: TableRowModel, index: number) => (
    <TableRow
      key={index}
      index={index}
      columns={model.columns}
      data={data}
      attributes={model.rows?.attributes}
    />
  ));
};

export default TableRows;
