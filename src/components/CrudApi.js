import React, { useEffect, useState } from "react";
import { helpHttp } from "../helpers/helpHttp";
import { useModal } from "../hooks/useModal";
import { CrudForm } from "./CrudForm";
import { CrudTable } from "./CrudTable";
import { Loader } from "./Loader";
import { Message } from "./Message";
import Modal from "./Modal";

export const CrudApi = () => {
  const [db, setDb] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, openModal, closeModal] = useModal(false);

  let api = helpHttp();
  let url = "http://localhost:5000/pokemons";

  useEffect(() => {
    let api = helpHttp();
    let url = "http://localhost:5000/pokemons";
    setLoading(true);

    api.get(url).then((res) => {
      // console.log(res);
      if (!res.err) {
        setDb(res);
        setError(null);
      } else {
        setDb(null);
        setError(res);
      }

      setLoading(false);
    });
  }, []);

  const createData = (data) => {
    data.id = Date.now();
    // console.log(data);

    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    api.post(url, options).then((res) => {
      // console.log(res);
      if (!res.err) {
        setDb([...db, res]);
      } else {
        setError(res);
      }
    });
  };

  const updateData = (data) => {
    let endpoint = `${url}/${data.id}`;
    // console.log(endpoint);

    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    api.put(endpoint, options).then((res) => {
      // console.log(res);
      if (!res.err) {
        let newData = db.map((el) => (el.id === data.id ? data : el));
        setDb(newData);
      } else {
        setError(res);
      }
    });
  };

  const deleteData = (id) => {
    let isDelete = window.confirm(`Delete Data with id '${id}'?`);

    if (isDelete) {
      let endpoint = `${url}/${id}`;
      let options = {
        headers: { "content-type": "application/json" },
      };

      api.del(endpoint, options).then((res) => {
        // console.log(res);
        if (!res.err) {
          let newData = db.filter((el) => el.id !== id);
          setDb(newData);
        } else {
          setError(res);
        }
      });
    } else {
      return;
    }
  };

  return (
    <div>
      <h2>CRUD API</h2>

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
        {loading && <Loader />}
        {error && (
          <Message
            msg={`Error ${error.status}: ${error.statusText}`}
            bgColor="#dc3545"
          />
        )}
        {db && (
          <CrudTable
            data={db}
            deleteData={deleteData}
            setDataToEdit={setDataToEdit}
          />
        )}
      </article>
    </div>
  );
};
