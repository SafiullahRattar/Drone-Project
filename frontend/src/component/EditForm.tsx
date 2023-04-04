import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

const EditForm: React.FC<EditFormProps> = ({ data, fields }) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  // Prefill the form data with the current data
  fields.forEach((field) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field.name]: data[field.name]?.toString() ?? "",
    }));
  });

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('handleSubmit')
    // handle form submission here
    // you can access the form data using the formData state variable
    console.log(formData);
    // Redirect back to the table page after submission
    // navigate("/table");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name} className="form-field">
          <label htmlFor={field.name}>{field.label}</label>
          {field.type === "select" ? (
            <select name={field.name} id={field.name} value={formData[field.name]} onChange={handleChange}>
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              name={field.name}
              id={field.name}
              value={formData[field.name]}
              onChange={handleChange}
            />
          )}
        </div>
      ))}
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditForm;
