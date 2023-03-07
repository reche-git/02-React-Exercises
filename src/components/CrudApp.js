import React, { useState } from "react";
import { CrudForm } from "./CrudForm";
import { CrudTable } from "./CrudTable";
import { useModal } from "../hooks/useModal";
import Modal from "./Modal";

const initialDb = [
  {
    id: 1,
    name: "Bulbasaur",
    type: "Grass",
  },
  {
    id: 2,
    name: "Charmander",
    type: "Fire",
  },
  {
    id: 3,
    name: "Squirtle",
    type: "Water",
  },
  {
    id: 4,
    name: "Rattata",
    type: "Normal",
  },
  {
    id: 5,
    name: "Pikachu",
    type: "Electric",
  },
];

export const CrudApp = () => {
  const [db, setDb] = useState(initialDb);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [isOpen, openModal, closeModal] = useModal(false);

  const createData = (data) => {
    data.id = Date.now();
    // console.log(data);
    setDb([...db, data]);
  };

  const updateData = (data) => {
    let newData = db.map((el) => (el.id === data.id ? data : el));
    setDb(newData);
  };

  const deleteData = (id) => {
    let isDelete = window.confirm(`Delete Data with id '${id}'?`);

    if (isDelete) {
      let newData = db.filter((el) => el.id !== id);
      setDb(newData);
    } else {
      return;
    }
  };

  return (
    <div>
      <h2>CRUD App</h2>
      <button className="btn btn-primary btn-lg" onClick={openModal}>
        About Crud App
      </button>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <div className="ExplinationModal">
          <h3>About CRUD App</h3>
          <p>This is a project that applies the 4 operations in a CRUD:</p>
          <p style={{ textAlign: "center" }}>
            <b>Create - Read - Update - Delete</b>
          </p>
          <p>
            The data is not stored and is going to be reseted to an initial
            state after a page reload, so feel free to add whatever you want.
          </p>
          <hr />
          <p>
            This project has a total of three components, all with "CRUD" as a
            prefix to make it ease for others to undertand the source code.
          </p>
          <ul>
            <li>
              CrudApp: This component holds 3 arrow functions that holds the
              CRUD logic with 3 states to control the data, the edition of data
              and the Modal.
            </li>
            <li>
              CrudForm: A form from witch you are able to add the name and type
              of the pokemon. You can find here the logic to send the
              information to the parent component and the reset of the entire
              form.
            </li>
            <li>
              CrudTable: It's a simple table made to display the data and two
              buttons that will edit or delete the row.
            </li>
          </ul>
        </div>
      </Modal>
      <article className="grid-1-2">
        <CrudForm
          createData={createData}
          updateData={updateData}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />
        <CrudTable
          data={db}
          deleteData={deleteData}
          setDataToEdit={setDataToEdit}
        />
      </article>
    </div>
  );
};
