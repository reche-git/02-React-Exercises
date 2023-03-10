import React from "react";
import { useModal } from "../hooks/useModal";
import Modal from "./Modal";
import ContactForm from "./ContactForm";
import { SongSearch } from "./SongSearch";
import ModalPortal from "./ModalPortal";

const Modals = () => {
  const [isOpenModal1, openModal1, closeModal1] = useModal(false);
  const [isOpenContact, openContact, closeContact] = useModal(false);
  const [isOpenSong, openModalSong, closeModalSong] = useModal(false);
  const [isOpenPortal, openModalPortal, closeModalPortal] = useModal(false);

  return (
    <div>
      <h2>Modals</h2>
      <button onClick={openModal1}>Modal 1</button>
      <Modal isOpen={isOpenModal1} closeModal={closeModal1}>
        <div className="ExplinationModal">
          <h3>
            Well Well Well... if it isn't a Modal made with a personal hook!
          </h3>
          <p>
            This Modal was made as part of a class to explain the use of hooks
            and personalised hooks.
          </p>
          <p>In this first section you will find:</p>
          <ul>
            <li>A simple use of hooks to create a Modal</li>
            <li>
              How simple is to pass components inside Modals. Modal Contact and
              Modal Song do that!
            </li>
            <li>
              The use of Portals. Before Fluix, Reflux and Redux, you could pass
              properties and logic through Portals! Since React reads in
              sequence from father to child, passing a prop from a gran gran
              gran gran gran father to a gran gran gran gran gran child would be
              to verbose without portals.
            </li>
          </ul>
          <p>Be sure to check all sections and modals!</p>
          <p>
            By the way, I made it so you can scroll on big modals but the scroll
            bar will be hidden. I'm very proud of myself about that :)
          </p>
        </div>
      </Modal>
      <button onClick={openContact}>Modal Contact</button>
      <Modal isOpen={isOpenContact} closeModal={closeContact}>
        <ContactForm />
        <p>
          <b>psst! The last section is about this form. Go there.</b>
        </p>
      </Modal>
      <button onClick={openModalSong}>Modal Song</button>
      <Modal isOpen={isOpenSong} closeModal={closeModalSong}>
        <SongSearch />
        (forth section) <br /> <br />
      </Modal>
      <button onClick={openModalPortal}>Modal in Portal</button>
      <ModalPortal isOpen={isOpenPortal} closeModal={closeModalPortal}>
        <h3>Portal Modal</h3>
        <p>
          This is the content of a modal that load in another node of the DOM
          thanks to a React Portal
        </p>
        <img src="https://placeimg.com/400/400/tech" alt="Tech" />
      </ModalPortal>
    </div>
  );
};

export default Modals;
