import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TableColumn } from "../../component/Table";
import { RootState } from "../../store";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
// import '../../sass/Form.scss'
import "./AdminEditForm.scss";
import { updateDroneAdminAction } from "../../actions/droneAction";
import { adminUpdateDeliveryAction } from "../../actions/deliveryAction";
import { adminUpdateUserAction } from "../../actions/userAction";

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
  const { data, columns, apiForUpdate, loading, error } = useAppSelector(
    (state: RootState) => state.adminEditFormReducer
  );
  const [formData, setFormData] = useState<{ [key: string]: string }>(data);
  const [shouldGoBack, setShouldGoBack] = useState(false);

  // Prefill the form data with the current data
  // columns.forEach((field: TableColumn) => {
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [field.accessor]: data[field.accessor]?.toString() ?? "",
  //   }));
  // });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };


  useEffect(() => {
    if (!loading && !error && shouldGoBack) {
      navigate(-1);
      
    }
  }, [loading, error, navigate]);

  console.log({
    columns,
    data,
    formData,
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (apiForUpdate == "DRONE") {
          console.log("should update drone");
          dispatch(updateDroneAdminAction(formData));
        } else if (apiForUpdate === "DELIVERY") {
          console.log("should update delivery");
          dispatch(adminUpdateDeliveryAction(formData));
        } else if (apiForUpdate === "USER") {
          console.log("should update user", formData);
          dispatch(adminUpdateUserAction(formData));
        }
        setShouldGoBack(true);
      }}
    >
      {columns.map((field: TableColumn) => {
        return (
          <div key={field.accessor} className="form-field">
            <label htmlFor={field.accessor}>{field.label}</label>
            {field.type === "select" ? (
              <select
                name={field.accessor}
                id={field.accessor}
                value={formData[field.accessor]}
                onChange={handleChange}
              >
                {field.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                name={field.accessor}
                id={field.accessor}
                value={formData[field.accessor]}
                onChange={handleChange}
              />
            )}
          </div>
        );
      })}
      <button type="submit" className="submit">
        Save Changes
      </button>
    </form>
  );
};

export default AdminEditForm;
