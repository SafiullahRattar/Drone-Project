import React from "react";
import "../sass/Table.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

export type TableColumn = {
  label: string;
  accessor: string;
  type?: "string" | "number" | "select";
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

const Table: React.FC<TableProps> = ({
  columns,
  data,
  numColumns = 2,
  lastColumnEdit = false,
  onEditClick,
}) => {
  console.log({
    columns,
    data,
  });
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
                  ? row[column.accessor].map((item: any) => <div>{item}</div>)
                  : row[column.accessor]}
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
