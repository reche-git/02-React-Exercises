import "./Modal.css";

const Modal = ({ children, isOpen, closeModal }) => {
  const handleModalContainerClick = (e) => e.stopPropagation();
  return (
    <article className={`modal ${isOpen && "is-open"}`} onClick={closeModal}>
      <div className="modal-container" onClick={handleModalContainerClick}>
        {children}
        <button className="ExplinationModalBtn" onClick={closeModal}>
          <span>Got it,thanks!</span>
          <svg
            viewBox="-5 -5 110 110"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M0,0 C0,0 100,0 100,0 C100,0 100,100 100,100 C100,100 0,100 0,100 C0,100 0,0 0,0" />
          </svg>
        </button>
      </div>
    </article>
  );
};

export default Modal;
