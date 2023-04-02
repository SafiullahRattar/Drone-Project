import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TableColumn } from "../../component/Table";
import { RootState } from "../../store";
import { useAppSelector } from "../../utils/hooks";
// import '../../sass/Form.scss'
import "./AdminEditForm.scss";

interface EditFormProps {
  data: {
    [key: string]: string | number;
  };
  fields: {
    label: string;
    name: string;
    type: "text" | "number" | "select";
    options?: Array<{ value: string | number; label: string }>;
  }[];
}

const AdminEditForm = () => {
  const { data, columns, apiForUpdate } = useAppSelector(
    (state: RootState) => state.adminEditFormReducer
  );
  const [formData, setFormData] = useState<{ [key: string]: string }>(data);

  // Prefill the form data with the current data
  // columns.forEach((field: TableColumn) => {
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [field.accessor]: data[field.accessor]?.toString() ?? "",
  //   }));
  // });

  const navigate = useNavigate();
  const { state } = useLocation();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  console.log(state);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(formData, "formData", apiForUpdate, "apiForUpdate");
      }}
    >
      {columns.map((field: TableColumn) => (
        <div key={field.accessor} className="form-field">
          <label htmlFor={field.accessor}>{field.label}</label>
          {/* {field.type === "select" ? (
              <select
                name={field.accessor}
                id={field.accessor}
                value={formData[field.accessor]}
                onChange={handleChange}
              >
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : ( */}
          <input
            type={field.type}
            name={field.accessor}
            id={field.accessor}
            value={formData[field.accessor]}
            onChange={handleChange}
          />
          {/* // )} */}
        </div>
      ))}
      <button type="submit" className="submit">
        Save Changes
      </button>
    </form>
  );
};

export default AdminEditForm;
