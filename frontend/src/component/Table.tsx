import React from "react";
import "../sass/Table.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

export type TableColumn = {
  label: string;
  accessor: string;
  type?: "string" | "number" | "select" | "date" | "id";
  options?: { value: any; label: any }[];
  isList?: boolean;
};

type TableProps = {
  columns: TableColumn[];
  data: any[];
  numColumns?: number;
  lastColumnEdit?: boolean;
  onEditClick?: (row: any) => void;
  isList?: boolean;
};

const renderCellValue = (column: TableColumn, row: any) => {
  const cellValue = row[column.accessor];

  if (column.type === "date") {
    // show date (dd/mm/yyyy)
    return new Date(cellValue).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: 'short',
      year: "numeric",
    });
  }

  if (column.type === "id") {
    return (
      <span
        style={{ cursor: "pointer" }}
        onClick={() => {
          // copy to clipboard
          navigator.clipboard.writeText(cellValue);
        }}
      >
        {cellValue.substring(0, 5)}...
      </span>
    );
  }

  return cellValue;
};

const Table: React.FC<TableProps> = ({
  columns,
  data,
  numColumns = 2,
  lastColumnEdit = false,
  onEditClick,
}) => {
  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.accessor}>{column.label}</th>
          ))}
          {lastColumnEdit && <th>Edit</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row._id}>
            {columns.map((column) => (
              <td key={column.accessor}>
                {/* {column.type === "select" ? (
                  <select value={row[column.accessor]}>
                    {column.options?.map((option: string) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                ) : ( */}
                {column.isList
                  ? // ? row[column.accessor].map((item: any) => (
                    //     <div key={item._id}>
                    //       {typeof item === "number" ? item.toFixed(2) : item}
                    //     </div>
                    //   ))
                    row[column.accessor]
                      .map((item: any) => item.toFixed(2))
                      .join(", ")
                  : renderCellValue(column, row)}
                {/* )} */}
              </td>
            ))}
            {lastColumnEdit && (
              <td>
                <FontAwesomeIcon
                  cursor={"pointer"}
                  icon={faEdit}
                  onClick={() => onEditClick && onEditClick(row)}
                />
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
