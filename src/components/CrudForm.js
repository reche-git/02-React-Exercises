import React, { useEffect, useState } from "react";

const initialForm = {
  name: "",
  type: "",
  id: null,
};

export const CrudForm = ({
  createData,
  updateData,
  dataToEdit,
  setDataToEdit,
}) => {
  const [form, setForm] = useState({ initialForm });

  useEffect(() => {
    if(dataToEdit) {
      setForm(dataToEdit);
    } else {
      setForm(initialForm)
    }
  }, [dataToEdit])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.type) {
      alert("Data Incomplete");
      return;
    }

    if (form.id === null) {
      createData(form);
    } else {
      updateData(form);
    }
    handleReset();
  };

  const handleReset = (e) => {
    setForm(initialForm);
    setDataToEdit(null);
  };

  return (
    <div>
      <h3>{dataToEdit ? "Edit" : "Add a Pokemon"}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={form.name || ""}
        />
        <input
          type="text"
          name="type"
          placeholder="Type"
          onChange={handleChange}
          value={form.type || ""}
        />
        <input type="submit" value="Send" />
        <input type="reset" value="Clean" onClick={handleReset} />
      </form>
    </div>
  );
};
