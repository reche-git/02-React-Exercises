import { useState } from "react";
import { useModal } from "../hooks/useModal";
import Modal from "./Modal";
import { SelectList } from "./SelectList";

export const SelectsAnidados = () => {
  const [state, setState] = useState("");
  const [town, setTown] = useState("");
  const [suburb, setSuburb] = useState("");
  const [isOpen, openModal, closeModal] = useModal(false);

  return (
    <div>
      <h2>Nested Selects</h2>

      <button className="btn btn-primary btn-lg" onClick={openModal}>
        About Crud API
      </button>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <div className="ExplinationModal">
          <h3>About Nested Selects</h3>
          <p>This section is why the hookFetch was made!</p>
          <hr />
          <p>
            Thanks to{" "}
            <a
              href="https://api.copomex.com/documentacion/inicio"
              rel="noreferrer"
              target="_blank"
            >
              COPOMEX API
            </a>
            , you can search for states in mexico, the towns in said state and
            the suburb in said town.
          </p>
          <hr />
          <p>
            Thanks to the use of hooks, we can do three API calls with one piece
            of code. No need to write three fetch functions slightly different.
          </p>
          <p>
            As free service, they provide a dummy server with different
            responses for every state, town and suburb. Every search will throw
            different responses!
          </p>
        </div>
      </Modal>
      <h3>Search!</h3>
      <label>State:</label>
      <SelectList
        title="estado"
        url="https://api.copomex.com/query/get_estados?token=pruebas"
        handleChange={(e) => {
          setState(e.target.value);
        }}
      />
      {state && (
        <>
          <label>Towns</label>
          <SelectList
            title="municipios"
            url={`https://api.copomex.com/query/get_municipio_por_estado/${state}?token=pruebas`}
            handleChange={(e) => {
              setTown(e.target.value);
            }}
          />
        </>
      )}
      {town && (
        <>
          <label>Suburbs</label>
          <SelectList
            title="colonia"
            url={`https://api.copomex.com/query/get_colonia_por_municipio/${town}?token=pruebas`}
            handleChange={(e) => {
              setSuburb(e.target.value);
            }}
          />
        </>
      )}
      <br />
      <pre>
        <code>
          Path: {state} - {town} - {suburb}
        </code>
      </pre>
    </div>
  );
};
