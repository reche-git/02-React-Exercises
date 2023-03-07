import React from "react";
import { useModal } from "../hooks/useModal";
import Modal from "./Modal";
import ContactForm from "./ContactForm";
import { SongSearch } from "./SongSearch";
import ModalPortal from "./ModalPortal";

const Modals = () => {
  const [isOpenModal1, openModal1, closeModal1] = useModal(false);
  const [isOpenModal2, openModal2, closeModal2] = useModal(false);
  const [isOpenContact, openContact, closeContact] = useModal(false);
  const [isOpenSong, openModalSong, closeModalSong] = useModal(false);
  const [isOpenPortal, openModalPortal, closeModalPortal] = useModal(false);

  return (
    <div>
      <h2>Modals</h2>
      <button onClick={openModal1}>Modal 1</button>
      <Modal isOpen={isOpenModal1} closeModal={closeModal1}>
        <h3>Modal 1</h3>
        <p>Hola, este es el contenido de mi modal 1</p>
        <img src="https://placeimg.com/400/400/animals" alt="animals" />
      </Modal>
      <button onClick={openModal2}>Modal 2</button>
      <Modal isOpen={isOpenModal2} closeModal={closeModal2}>
        <h3>Otro Modal</h3>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque
          reiciendis exercitationem magnam fuga fugiat doloremque perspiciatis
          cumque sed optio odio provident, placeat est ipsa porro at totam
          maiores nihil rerum!
        </p>
        <img src="https://placeimg.com/400/400/nature" alt="nature" />
      </Modal>
      <button onClick={openContact}>Modal Contact</button>
      <Modal isOpen={isOpenContact} closeModal={closeContact}>
        <ContactForm />
      </Modal>
      <button onClick={openModalSong}>Modal Song</button>
      <Modal isOpen={isOpenSong} closeModal={closeModalSong}>
        <SongSearch />
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
