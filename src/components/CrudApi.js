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
        About Crud API
      </button>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <div className="ExplinationModal">
          <h3>About CRUD API</h3>
          <p>
            This project is a copy of the last exercise with the addition of
            asynchronous calls to an api thanks to a custom fetch hook.
          </p>
          <hr />
          <p>The special about this is the use of:</p>
          <ul>
            <li>
              A personalized hook made entirely on JavaScript{" "}
              <a href="https://github.com/reche-git/02-React-Exercises/tree/master/src/hooks" rel="noreferrer" target="_blank">
                "hookFetch"
              </a>
              . Witch means the compatibility with allo JS Frameworks (Vue,
              Angular, Ruby, etc.).
            </li>
            <li>
              The reuse of the previous Components to make the project more
              dynamic and less resource consuming.
            </li>
            <li>
              The management of the fetch response as an object with three
              properties, the data, the error and an state variable that will
              manage the state of our loader.
            </li>
          </ul>
          <hr />
          <p>
            Unfortunely I was unable to find a way to create a server to storage
            the data to fetch. But in the next section (Song Search) I use the
            same hook with two free APIs.
          </p>
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
