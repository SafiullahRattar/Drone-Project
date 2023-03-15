import React from "react";
// import "../sass/Table.scss";
import "../sass/Table.scss"

export type TableColumn = {
  label: string;
  accessor: string;
  type?: "string" | "number" | "select";
};

type TableProps = {
  columns: TableColumn[];
  data: any[];
  numColumns?: number;
  lastColumnEdit?: boolean;
  onEditClick?: (row: any) => void;
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
                {column.type === "select" ? (
                  <select>
                    {row[column.accessor].map((option: string) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                ) : (
                  row[column.accessor]
                )}
              </td>
            ))}
            {lastColumnEdit && (
              <td>
                <button onClick={() => onEditClick && onEditClick(row)}>
                  Edit
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
